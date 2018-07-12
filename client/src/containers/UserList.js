import { connect } from 'react-redux'
import UserListComponent from '../components/UserList'

const mapStateToProps = (state) => {
    return {
        users: state.users // All the users in the room
    }
}

export const UserList = connect(mapStateToProps)(UserListComponent)