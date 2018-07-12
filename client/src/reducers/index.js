import { combineReducers } from "redux"
import messages from "./messages"
import users from "./users"
import connection from "./connection"
import rooms from "./rooms"

/**
 * Reducers need to be combined into one for Redux to process them
 */
const chat = combineReducers({
  messages,
  users,
  connection,
  rooms
});

export default chat