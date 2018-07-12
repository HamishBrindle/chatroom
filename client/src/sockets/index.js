import * as types from '../constants/ActionTypes'
import {
  addUser,
  messageReceived,
  populateUsersList,
  refreshRoom
} from '../actions'
import { WEBSOCKET_URL } from '../config'

/**
 * This sets up our socket; contains user, the room they're in. The
 * Dispatch is for defining the socket's behavior.
 * 
 * @param {Dispatch} dispatch 
 * @param {String} username 
 * @param {String} room
 * 
 * @returns our socket object so we can fuck with it later
 */
const setupSocket = (dispatch, username, room) => {
  const socket = new WebSocket(WEBSOCKET_URL)

  // When we open, we send over the user and their room
  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username,
      room: room
    }));
  }

  socket.onmessage = (event) => { // THESE ARE ALL GOING TO REDUCERS FROM HERE
    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.room, data.author))
        break
      case types.ADD_USER:
        dispatch(addUser(data.name, room))
        break
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users))
        break
      case types.ROOM_MESSAGES:
        dispatch(refreshRoom(JSON.parse(data.data)));
        break
      default:
        break
    }
  }

  // For loggin purposes I suppose; this triggers when a user
  // exits a room (when Room component unmounts basically)
  socket.onclose = () => {
    // console.log("Closing Socket")
  }

  return socket
}

export default setupSocket