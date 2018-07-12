import { connect } from 'react-redux'
import RoomComponent from '../components/Room'
import { connectSocket, disconnectSocket } from '../actions'

const mapStateToProps = (state = [], props) => {
  return {
    room: props.match.params.id // Our room's name from our router
  }
};

const mapDispatchToProps = (dispatch, props) => ({

  /**
   * We connect to a socket if the user is logged in and we know their name.
   * We pass the room so the server knows where we're connecting to.
   */
  connectSocket: (user, room) => {
    dispatch(connectSocket(user, room, dispatch));
  },

  /**
   * To disconnect, all we really need to do is access our socket object inside
   * store and call it's close() method. The room param here isn't necasary right now.
   */
  disconnectSocket: (room) => {
    dispatch(disconnectSocket(room));
  },
  dispatch
})

export const Room = connect(mapStateToProps, mapDispatchToProps)(RoomComponent);
