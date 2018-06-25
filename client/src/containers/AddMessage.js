import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../actions'

const mapStateToProps = (state = [], props) => {
  return {
    socket: props.socket
  }
};

const mapDispatchToProps = dispatch => ({
  dispatch: (message, room, author) => {
    dispatch(addMessage(message, room, author))
  }
})

export const AddMessage = connect(mapStateToProps, mapDispatchToProps)(AddMessageComponent)