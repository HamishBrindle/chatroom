import { combineReducers } from "redux"
import messages from "./messages"
import users from "./users"
import connection from "./connection"
import rooms from "./rooms"

const chat = combineReducers({
  messages,
  users,
  connection,
  rooms
});

export default chat