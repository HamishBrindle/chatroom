import { connect } from 'react-redux'
import MessagesListComponent from '../components/MessagesList'

// export const MessagesList = connect(state => ({
//   messages: state.messages, // All the messages existing in a room
//   isConnected: state.connection.isConnected
// }), {})(MessagesListComponent)

const mapStateToProps = (state = [], props) => {
  
  return {
    messages: state.messages, // All the messages existing in a room
    isConnected: (state.connection[0] !== undefined) ? state.connection[0].isConnected : false
  }
};

export const MessagesList = connect(mapStateToProps)(MessagesListComponent);