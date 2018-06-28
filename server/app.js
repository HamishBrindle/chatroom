var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var app = express();

const rp = require('request-promise');
const shortid = require('shortid');
const RoomCollection = require('./models/RoomCollection');
const User = require('./models/User');
const WebSocket = require('ws');

require('dotenv').config();

const ENDPOINT = process.env.API_ENDPOINT;

const wss = new WebSocket.Server({
    port: 8989
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

/*
 * Our global chatroom structure containing active rooms
 * and their users. I wrote a few classes to help with
 * organizing, but what I ended up with was a bit
 * confusing as its written like OOP. Basically, it was
 * the first time I had tried to write classes in JS.
 * It'll do for now.
 */
const roomCollection = new RoomCollection(ENDPOINT);

/*
 * Fetch rooms from the DB and populate our RoomCollection before
 * we go any further. This is so there's always a list of rooms
 * for users to go into with previous chat history.
 * 
 * Once it's all fetched and assembled, we setup the WebSocket connection.
 */
roomCollection.fetchRooms(ENDPOINT)
    .then((data) => {
        setupSocketServer();
    })
    .catch((err) => {
        console.error(`app: ❌ Unable to fetchRooms: ${err}`);
    });

/**
 * Sends data to other members of a chatroom. We go through
 * the UserCollection inside the Room our sending user is in,
 * get each member, and send them our user's message.
 * 
 * Some things that will be broadcasted:
 *  - New messages
 *  - List of users in a chatroom
 * 
 * @param {Room} room the room to be broadcasted to
 * @param {Object} data the data we're sending
 * @param {WebSocket} ws the connection of our sending client
 */
const broadcast = (room, data, ws) => {

    // Our UserCollection is a map, we get it with 'getUsers()'
    // and then convert it to an array of User objects.
    const clients = Array.from(room.users.getUsers().values());
    clients.forEach((client) => {

        // Inside our User object, we store their WebSocket connection.
        // We need it here for every User in the room.
        const connection = client.connection

        // Check to make sure the client that sent the message
        // doesn't recieve it from the server.
        if (connection.readyState === WebSocket.OPEN && connection !== ws) {
            connection.send(JSON.stringify(data))
        }
    })
}

/**
 * Setting up the connection to the server and the chatroom structure.
 * 
 * 1. Open connection
 * 2. Instruct what to do with incoming actions from client-side 
 *    (ADD_USER, ADD_MESSAGE)
 * 3. Build the chatroom structure (RoomCollection, UserCollection, etc.)
 * 4. Instruct what to do when user disconnects.
 */
const setupSocketServer = () => {

    console.log('app: setupSocketServer: 🔥  Setting up Socket server');

    // When a user first connects to the server
    wss.on('connection', (ws) => {

        // These are the objects representing each user.
        // We'll later add these to our chatroom structure
        // with RoomCollection and UserCollection
        let _user;
        let _room;

        // When the server recieves a message from one of it's clients
        ws.on('message', (message) => {

            const data = JSON.parse(message);

            /* 
             * Add the room the message is coming from to our RoomCollection.
             * Within 'addRoom', if the room doesn't exist in the DB, we add it.
             * 
             * NOTE: at this point, we've already attempted to populate our
             * RoomCollection with rooms within the DB. If it exists in the DB,
             * it's now in our structure.
             */
            _room = roomCollection.addRoom(data.room);

            // Check what type of payload is coming in from the client
            switch (data.type) {
                case 'ADD_USER':
                    _user = addUser(data, _room, ws);
                    break;
                case 'ADD_MESSAGE':
                    addMessage(data, _room, ws);
                    break;
                default:
                    break;
            }
        });

        // When a user disconnects from a Room
        ws.on('close', (event) => {

            removeUser(_user, _room, ws);

        });

    });
}

/**
 * Add a message to the DB as well as broadcast it to others in the room.
 * 
 * @param {Object} data received from client
 * @param {Room} room user's chatroom
 * @param {WebSocket} ws user's connection
 */
const addMessage = (data, room, ws) => {

    // Send message to the others in the chatroom
    broadcast(room, {
        type: 'ADD_MESSAGE',
        message: data.message,
        room: data.room,
        author: data.author
    }, ws);

    // Building our payload for the DynamoDB item entry
    var formData = {
        messageId: shortid.generate(),
        datePosted: Date.now(),
        roomId: data.room,
        userId: data.author,
        message: data.message
    };

    // POST to messages endpoint,
    // Store our new message in the database so we can load our
    // chat history for each room.
    try {
        request.post({
            headers: {
                'content-type': 'application/json'
            },
            url: `${ENDPOINT}/messages`,
            body: JSON.stringify(formData)
        }, (err, httpResponse, body) => {

            // If we get {"message": "Internal server error"}, then
            // most likely it's already in the database. I should
            // handle this on the AWS more efficiently.
            if (!body.includes('Internal server error')) {
                console.log('app: addMessage: ✔️  Server responded with:', body);
            }
        });
    } catch (err) {
        console.error('app: addMessage: ❌  Couldn\'t upload message: ' + err);
    }
}

/**
 * Add a user to a room after creating a User object for
 * them, which stores their name, ID, and WebSocket connection.
 * 
 * @param {Object} data 
 * @param {Room} room the room we're adding the user to
 * @param {WebSocket} ws our user's WebSocket connection
 * 
 * @returns {User} the user we just added to the room
 */
const addUser = (data, room, ws) => {

    /**
     * Create the new user object. We only need
     * their name and WebSocket connection because
     * an ID is generated for them in the constructor.
     */
    const user = new User(data.name, ws);

    // Each room has a UserCollection, which is a map of
    // user objects. Here we add our user to that map.
    room.users.addUser(user);

    /* Once the new User is inside the UserCollection,
     * we make a user-list and send it back to the client.
     * This is only for the client that just joined so
     * we can display all the other users in the room for them.
     */
    ws.send(JSON.stringify({
        type: 'USERS_LIST',
        users: room.getUserList()
    }));

    /**
     * We do the same thing for the rest of the users
     * in the chat room, which is probably not the best idea.
     * 
     * TODO: Send user-list back to everyone all at once.
     */
    broadcast(room, {
        type: 'USERS_LIST',
        users: room.getUserList()
    }, ws);

    // For the client that just connected (this client), fetch and 
    // send the chat history from the active chatroom.
    rp(`${ENDPOINT}/messages/room/${room.id}`)
        .then((data) => {
            ws.send(JSON.stringify({
                type: 'ROOM_MESSAGES',
                data
            }))
        })
        .catch((err) => {
            console.log(`app: addUser: ❌  Unable to retrieve messages from \'${room.id}\': ${err}`);
        });

    // Now that we have a new user in our room, this room
    // needs to be updated in the RoomCollection.
    roomCollection.updateRoom(room);

    return user;
}

/**
 * Remove a user from a room (used mostly when disconnecting a socket)
 * 
 * @param {User} user user to be removed
 * @param {Room} room room from which to do so
 */
const removeUser = (user, room, ws) => {

    console.log(`app: removeUser: ➖  Removing user '${user.name}' from room '${room.id}'`);

    // Get the room the user just left
    const currentRoom = roomCollection.getRoom(room.id); // TODO: Get this from client? Is it included in this message?

    if (currentRoom) {

        // Remove the user from the room, report
        if (currentRoom.users.removeUser(user.id)) { 
            console.log(`app: removeUser: ✔️  '${user.name}' removed from room '${room.id}'`);
        } else {
            console.error(`app: removeUser: ❌  Couldn\'t remove user ${user.name}`);
        }

        // User has been removed, clients need updated user-list for their rooms
        broadcast(currentRoom, {
            type: 'USERS_LIST',
            users: currentRoom.getUserList()
        }, ws);

        roomCollection.updateRoom(currentRoom) 
    }
}

module.exports = app;