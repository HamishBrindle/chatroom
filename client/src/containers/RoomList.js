import { connect } from 'react-redux'
import RoomListComponent from '../components/RoomList'
import { populateRoomsList } from '../actions'

const mapStateToProps = (state = [], props) => {
    return {
        rooms: state.rooms // Current route
    }
};

const mapDispatchToProps = (dispatch) => ({
    populateRoomsList: (rooms) => {
        dispatch(populateRoomsList(rooms));
    }
})

export const RoomList = connect(mapStateToProps, mapDispatchToProps)(RoomListComponent);