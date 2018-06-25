import * as types from '../constants/ActionTypes'
import {
  addUser,
  messageReceived,
  populateUsersList,
  refreshRoom
} from '../actions'
import { WEBSOCKET_URL } from '../config'

const setupSocket = (dispatch, username, room) => {
  const socket = new WebSocket(WEBSOCKET_URL)

  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username,
      room: room
    }))
  }
  socket.onmessage = (event) => { // THESE ARE ALL GOING TO REDUCERS FROM HERE
    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        console.log("GETTING MESSAGE");
        dispatch(messageReceived(data.message, data.room, data.author))
        break
      case types.ADD_USER:
        console.log("ADDING USER");
        dispatch(addUser(data.name, room))
        break
      case types.USERS_LIST:
        console.log("GETTING USER LIST");
        dispatch(populateUsersList(data.users))
        break
      case types.ROOM_MESSAGES:
        console.log("GETTING ROOM MESSAGES");
        dispatch(refreshRoom(JSON.parse(data.data)));
        break
      default:
        break
    }
  }

  return socket
}

export default setupSocket