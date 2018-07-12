import { connect } from 'react-redux'
import RoomListComponent from '../components/RoomList'
import { populateRoomsList } from '../actions'

const mapStateToProps = (state = [], props) => {
    return {
        rooms: state.rooms // All the rooms existing on the server
    }
};

const mapDispatchToProps = (dispatch) => ({

    /**
     * We want to store all the rooms on the server so we can access them
     * for checking against new rooms (prevent naming conflicts).
     * 
     * TODO: I'm not sure it's that good an idea to make the API call from
     * inside the component like I'm doing (../components/RoomList) but
     * it'll do for now.
     */
    populateRoomsList: (rooms) => {
        dispatch(populateRoomsList(rooms));
    }
})

export const RoomList = connect(mapStateToProps, mapDispatchToProps)(RoomListComponent);