import React from "react"
import PropTypes from "prop-types"
import getColor from '../utils/color'

const UserList = ({ users }) => (
  <aside id="sidebar" className="sidebar">
    <ul className="online-users">
      {users.map(user => (
        <li key={user.id}>
          <div className="online-user-avatar" style={{ backgroundColor: '#' + getColor(user.name)}}></div>
          <p className="online-user-name">{user.name}</p>
        </li>
      ))}
    </ul>
  </aside>
)

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}

export default UserList