var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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
app.use('/users', usersRouter);

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

const rp = require('request-promise');
const shortid = require('shortid');
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 8989
})

const ENDPOINT = 'https://fhstdaxozf.execute-api.us-east-1.amazonaws.com/dev/messages';
const ROOM = 'all'; // TODO: Need dynamic room setting

const users = []

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', (ws) => {
  let index
  ws.on('message', (message) => {
    const data = JSON.parse(message)
    switch (data.type) {
      case 'ADD_USER':
        {
          index = users.length
          users.push({
            name: data.name,
            id: index + 1
          })
          ws.send(JSON.stringify({
            type: 'USERS_LIST',
            users
          }))
          broadcast({
            type: 'USERS_LIST',
            users
          }, ws)
          // TODO: Get messages from the Room and update
          rp(`${ENDPOINT}/room/${ROOM}`)
            .then((data) => {
              ws.send(JSON.stringify({
                type: 'ROOM_MESSAGES',
                data
              }))
            })
            .catch((err) => {
              // Crawling failed...
            });
          break;
        }
      case 'ADD_MESSAGE':
        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author
        }, ws)

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
            url: ENDPOINT,
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
  })

  ws.on('close', () => {
    users.splice(index, 1)
    broadcast({
      type: 'USERS_LIST',
      users
    }, ws)
  })
})

module.exports = app;