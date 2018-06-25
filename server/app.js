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
const wss = new WebSocket.Server({ port: 8989 });

const RoomCollection = require('./models/RoomCollection');

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

// TODO: use RoomCollection's fetchRooms to get 
// all the open rooms available.
roomCollection.fetchRooms(ENDPOINT);

// this sends shit to everyone, but 'ws' only sends to client
const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', (ws) => {

  let _index;
  let _user;
  let _room; 

  ws.on('message', (message) => {

    const data = JSON.parse(message);

    // Also checks if room exists, if it does returns that room object.
    
    _room = roomCollection.addRoom(data.room);

    switch (data.type) {
      case 'ADD_USER':
        {
          _user = data.name;

          _room.users.push({
            name: _user,
            id: shortid.generate()
          });

          _index = _room.users.indexOf(_user);          

          ws.send(JSON.stringify({
            type: 'USERS_LIST',
            users: _room.users
          }));

          broadcast({
            type: 'USERS_LIST',
            users: _room.users
          }, ws);

          console.log(_room)
          
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

        broadcast({
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
          console.error('Couldn\'t upload m8: ' + err);
        }
        break;

      default:
        break;
    }
  });

  ws.on('close', (event) => {

    console.log(`Removing: ${_user}\n`);

    const room = roomCollection.getRoom(_room.id); // TODO: Get this from client? Is it included in this message?

    if (room) {

      room.users.splice(_index, 1);

      broadcast({
        type: 'USERS_LIST',
        users: room.users
      }, ws);
  
      roomCollection.updateRoom(room);

    }

  });

});

module.exports = app;