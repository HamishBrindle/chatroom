import { combineReducers } from "redux"
import messages from "./messages"
import users from "./users"
import connection from "./connection"

const chat = combineReducers({
  messages,
  users,
  connection
});

export default chat