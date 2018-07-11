import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    console.log("Sagas: handleNewMessage:")

    const state = params.store.getState()

    console.log(state);

    const [ connection ] = state.connection;

    console.log(connection);
    action.author = connection.user
    connection.socket.send(JSON.stringify(action));
  })
}

export default handleNewMessage