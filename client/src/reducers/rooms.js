import * as types from '../constants/ActionTypes'

const rooms = (state = [], action) => {
    switch (action.type) {
        case types.ROOMS_LIST:
            return parse(action.rooms);
        default:
            return state
    }
}

const parse = (rooms) => {
    var roomArray = [];
    rooms.forEach(room => {
        roomArray.push(room.roomId)
    });
    return roomArray;
}

export default rooms