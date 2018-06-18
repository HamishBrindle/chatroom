var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const rp = require('request-promise');
const shortid = require('shortid');
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 8989
})
const RoomCollection = require('./models/RoomCollection');

const ENDPOINT = 'https://fhstdaxozf.execute-api.us-east-1.amazonaws.com/dev';
const ROOM = 'all'; // TODO: Need dynamic room setting

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
Web-socket --------------------------------------------------
*/

const roomCollection = new RoomCollection();
// TODO: use RoomCollection's fetchRooms to get all the open rooms available.
roomCollection.fetchRooms(ENDPOINT);

roomCollection.addRoom(ROOM); // TODO: Adding a default 'all' room for now

console.log(roomCollection);

const users = [];

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', (ws) => { // When a socket has been opened... TODO: store users somewhere else?

  let index;
  let user;

  ws.on('message', (message) => {

    const data = JSON.parse(message);
    const room = roomCollection.getRoom(ROOM); // TODO: Get this from client? Is it included in this message?

    switch (data.type) {
      case 'ADD_USER':
        {
          user = data.name;
          index = room.users.indexOf(user);

          room.users.push({
            name: data.name,
            id: index + 1
          });

          ws.send(JSON.stringify({
            type: 'USERS_LIST',
            users: room.users
          }));

          broadcast({
            type: 'USERS_LIST',
            users: room.users
          }, ws);
          
          rp(`${ENDPOINT}/messages/room/${ROOM}`)
          .then((data) => {
            ws.send(JSON.stringify({
              type: 'ROOM_MESSAGES',
              data
            }))
          })
          .catch((err) => {
            // Crawling failed...
          });

          roomCollection.updateRoom(room);

          break;

        }

      case 'ADD_MESSAGE':

        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author
        }, ws);

        var formData = {
          messageId: shortid.generate(),
          datePosted: Date.now(),
          room: ROOM,
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

    console.log(`Removing: ${user}\n`);

    const room = roomCollection.getRoom(ROOM); // TODO: Get this from client? Is it included in this message?

    room.users.splice(index, 1);

    broadcast({
      type: 'USERS_LIST',
      users: room.users
    }, ws);

    roomCollection.updateRoom(room);
    console.log(roomCollection);
    console.log(roomCollection.getRoom('all').getUsers());    

  });

});

module.exports = app;