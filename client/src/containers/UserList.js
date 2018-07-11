import { connect } from 'react-redux'
import UserListComponent from '../components/UserList'

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export const UserList = connect(mapStateToProps)(UserListComponent)