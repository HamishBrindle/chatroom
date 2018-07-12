import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

/**
 * handleNewMessage basically is in charge of sending off
 * any new message via socket. Because of the way we display
 * a user's own message differently than the rest (i.e. author is 'Me'
 * and the bubble color is blue), we redefine the author of the message
 * before sending it off to the server, and ultimately, the database.
 * 
 * @param {Object} params contains our entire store... lol
 */
const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    const state = params.store.getState()
    const [ connection ] = state.connection;
    action.author = connection.user
    connection.socket.send(JSON.stringify(action));
  })
}

export default handleNewMessage