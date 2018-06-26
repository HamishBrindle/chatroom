import * as types from '../constants/ActionTypes'
import setupSocket from '../sockets'

const connection = (state = [], action) => {
    switch (action.type) {
        case types.CONNECT_SOCKET:
            const socket = setupSocket(action.dispatch, action.name, action.room)
            const user = action.name;
            return state.concat({
                socket,
                user
            });
        default:
            return state;
    }
}

export default connection
