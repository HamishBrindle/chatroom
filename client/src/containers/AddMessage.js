import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../actions'

const mapStateToProps = (state = [], props) => {
  return {
    // We need this because of how we handle new messages.
    // Probably not the best way to go, kind of anti-pattern
    socket: props.socket 
  }
};

const mapDispatchToProps = dispatch => ({
  dispatch: (message, room, author) => {
    dispatch(addMessage(message, room, author))
  }
})

export const AddMessage = connect(mapStateToProps, mapDispatchToProps)(AddMessageComponent)