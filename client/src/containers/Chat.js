import { connect } from 'react-redux'
import ChatComponent from '../components/Chat'

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export const Chat = connect(null, mapDispatchToProps)(ChatComponent);
