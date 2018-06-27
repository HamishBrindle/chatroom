import * as types from '../constants/ActionTypes'

let nextMessageId = 0
var nextUserId = 0

export const addMessage = (message, room, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  room,
  author
})

export const addUser = (name, room) => ({
  type: types.ADD_USER,
  id: nextUserId++,
  name,
  room
})

export const messageReceived = (message, room, author) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author
})

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users
})

export const populateRoomsList = rooms => ({
  type: types.ROOMS_LIST,
  rooms
})

export const refreshRoom = messages => ({
  type: types.ROOM_MESSAGES,
  messages
})

export const connectSocket = (name, room, dispatch) => ({
  type: types.CONNECT_SOCKET,
  name,
  room,
  dispatch
})
