var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');

var app = express();

const rp = require('request-promise');
const shortid = require('shortid');
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 8989
});

const RoomCollection = require('./models/RoomCollection');
const User = require('./models/User');

const ENDPOINT = 'https://y6bzexjalj.execute-api.us-east-1.amazonaws.com/dev';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

/*
Web-socket --------------------------------------------------
*/

const roomCollection = new RoomCollection();

// this sends shit to everyone, but 'ws' only sends to client
const broadcast = (room, data, ws) => {
  const clients = Array.from(room.users.getUsers().values());
  clients.forEach((client) => {
    const connection = client.connection
    if (connection.readyState === WebSocket.OPEN && connection !== ws) {
      connection.send(JSON.stringify(data))
    }
  })
}

const setupSocketServer = () => {

  console.log('setupSocketServer');

  wss.on('connection', (ws) => {

    let _user;
    let _room;

    ws.on('message', (message) => {

      const data = JSON.parse(message);

      _room = roomCollection.addRoom(data.room);

      switch (data.type) {
        case 'ADD_USER':
          {
            _user = new User(data.name, ws);

            _room.users.addUser(_user);

            ws.send(JSON.stringify({ // THIS GOES TO OUR CLIENT
              type: 'USERS_LIST',
              users: _room.getUserList() // TODO: Change this on client side, it's now an array of objects, not strings
            }));

            broadcast(_room, { // THIS GOES TO EVERYONE ELSE
              type: 'USERS_LIST',
              users: _room.getUserList() // TODO: Change this on client side, it's now an array of objects, not strings
            }, ws);

            // For the client that just connected (this client), send the chat history from the room.
            rp(`${ENDPOINT}/messages/room/${_room.id}`)
            .then((data) => {
              ws.send(JSON.stringify({
                type: 'ROOM_MESSAGES',
                data
              }))
            })
            .catch((err) => {
              console.log(`Unable to retrieve messages from \'${_room.id}\': ${err}`);
            });

            roomCollection.updateRoom(_room);

            break;

          }

        case 'ADD_MESSAGE':

          broadcast(_room, {
            type: 'ADD_MESSAGE',
            message: data.message,
            room: data.room,
            author: data.author
          }, ws);

          var formData = {
            messageId: shortid.generate(),
            datePosted: Date.now(),
            roomId: data.room,
            userId: data.author,
            message: data.message
          };

          try {
            request.post({
              headers: {
                'content-type': 'application/json'
              },
              url: `${ENDPOINT}/messages`,
              body: JSON.stringify(formData)
            }, (err, httpResponse, body) => {
              if (err) {
                return console.error('upload failed:', err);
              }
              console.log('Server responded with:', body);
            });
          } catch (err) {
            console.error('Couldn\'t upload message: ' + err);
          }

          break;

        default:
          break;
      }
    });

    ws.on('close', (event) => {

      console.log(`Removing: ${_user.name}\n`);

      const room = roomCollection.getRoom(_room.id); // TODO: Get this from client? Is it included in this message?

      if (room) {
        // if (room.users.removeUser(_user.id)) console.log("User removed")
        broadcast(room, {
          type: 'USERS_LIST',
          users: room.getUserList()
        }, ws);
        roomCollection.updateRoom(room);
      }
    });

  });
} 

roomCollection.fetchRooms(ENDPOINT)
  .then((data) => {
    console.log("Fetching Rooms from DB...");
    console.log(data);
    setupSocketServer();
  })
  .catch((err) => {
    console.error(`Unable to fetchRooms: ${err}`);
  });

module.exports = app;