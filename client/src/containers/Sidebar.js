import { connect } from 'react-redux'
import SidebarComponent from '../components/Sidebar'

const mapStateToProps = (state) => {
    console.log(state);
    return {
        users: state.users
    }
}

export const Sidebar = connect(mapStateToProps)(SidebarComponent)