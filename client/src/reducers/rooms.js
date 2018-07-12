import * as types from '../constants/ActionTypes'

/**
 * rooms is all the rooms available on the server.
 * 
 * @param {Object[]} state 
 * @param {Object} action 
 */
const rooms = (state = [], action) => {
    switch (action.type) {
        case types.ROOMS_LIST:
            return parse(action.rooms);
        default:
            return state
    }
}

/**
 * An array of all the rooms from the server. We only really need
 * the id, so we make an [] of just those (and pass them into state above)
 *  
 * @param {Object[]} rooms 
 */
const parse = (rooms) => {
    var roomArray = [];
    rooms.forEach(room => {
        roomArray.push(room.roomId)
    });
    return roomArray;
}

export default rooms