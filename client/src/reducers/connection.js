import * as types from '../constants/ActionTypes'
import setupSocket from '../sockets'

/**
 * connection is where we want our socket and user's name for
 * referencing in our saga events.
 * 
 * @param {Object[]} state
 * @param {Object} action 
 */
const connection = (state = [], action) => {
    switch (action.type) {
        case types.CONNECT_SOCKET:
            const socket = setupSocket(action.dispatch, action.name, action.room)
            const user = action.name;
            const isConnected = true;
            return state.concat({
                socket,
                user,
                isConnected
            });
        case types.DISCONNECT_SOCKET:
            const s = state[0].socket;
            if (s) { 
                s.close();
            }
            return [];
        default:
            return state;
    }
}

export default connection
