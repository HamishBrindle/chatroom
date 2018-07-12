import * as types from '../constants/ActionTypes'

/**
 * messages contains all the messages for a room, but we need to
 * delete the old ones when a user disconnects, so thats why we
 * have a DISCONNECT_SOCKET action-type that just clears all the
 * messages.
 * 
 * @param {Object[]} state 
 * @param {Object} action 
 */
const messages = (state = [], action) => {
    switch (action.type) {
        case types.ADD_MESSAGE:
        case types.MESSAGE_RECEIVED:
            return state.concat([{
                message: action.message,
                author: action.author,
                id: action.id
            }])
        case types.ROOM_MESSAGES:
            return state.concat(parseRoomMessages(action));
        case types.DISCONNECT_SOCKET:
            // Because we only store one room's messages at a time,
            // we clear it out here by returning an empty array
            return [];
        default:
            return state
    }
}

const parseRoomMessages = (action) => {
    var all = [];
    action.messages.forEach(msg => {
        all.push({
            message: msg.message,
            author: msg.userId,
            datePosted: msg.datePosted,
            id: msg.messageId
        });
    });
    all.sort(sortByDatePosted)
    return all;
}

function sortByDatePosted(a, b) {
    let comparison = 0;

    const msg1 = a.datePosted;
    const msg2 = b.datePosted;

    if (msg1 > msg2) {
        comparison = 1;
    } else if (msg2 > msg1) {
        comparison = -1;
    }

    return comparison;
}

export default messages