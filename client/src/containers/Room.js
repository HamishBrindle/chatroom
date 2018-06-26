import { connect } from 'react-redux'
import RoomComponent from '../components/Room'
import { connectSocket } from '../actions'

const mapStateToProps = (state = [], props) => {
  return {
    room: props.match.params.id // Current route
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  connectSocket: (user, room) => {
    dispatch(connectSocket(user, room, dispatch));
  },
  dispatch
})

export const Room = connect(mapStateToProps, mapDispatchToProps)(RoomComponent);
