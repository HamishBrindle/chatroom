const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
        case 'MESSAGE_RECEIVED':
            return state.concat([{
                message: action.message,
                author: action.author,
                id: action.id
            }])
        case 'ROOM_MESSAGES':
            return state.concat(parseRoomMessages(action));
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