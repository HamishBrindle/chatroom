import React from "react"
import PropTypes from "prop-types"
import getColor from '../utils/color'
import Moment from 'moment'

Moment.locale('en');

const Message = ({ message, author, datePosted }) => (
  
  <div className={"msg " + (author === 'Me' ? "right-msg" : "left-msg")}>
      <div className="msg-img" style={{ backgroundColor: '#' + getColor(author)}}></div>
      <div className="msg-bubble">
          <div className="msg-info">
              <div className="msg-info-name">{author}</div>
              <div className="msg-info-time">{Moment(datePosted).format('h:mmA')}</div>
          </div>

          <div className="msg-text">
              {message}
          </div>
      </div>
  </div>

)

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  datePosted: PropTypes.number
}

export default Message