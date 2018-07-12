import * as types from '../constants/ActionTypes'

/**
 * users is all the users in a room
 * 
 * @param {Object[]} state 
 * @param {Object} action 
 */
const users = (state = [], action) => {
    switch (action.type) {
        case types.ADD_USER:
            return state.concat([{
                name: action.name,
                id: action.id
            }]);
        case types.USERS_LIST:
            return action.users
        default:
            return state
    }
}

export default users