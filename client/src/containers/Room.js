import { connect } from 'react-redux'
import RoomComponent from '../components/Room'

const mapStateToProps = (state = [], props) => {
  return {
    room: props.match.params.id // Current route
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  dispatch
})

export const Room = connect(mapStateToProps, mapDispatchToProps)(RoomComponent);
