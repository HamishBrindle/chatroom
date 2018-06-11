import React from "react"
import PropTypes from "prop-types"
import Message from "./Message"

const MessagesList = ({ messages }) => (
  <div>
    <section id="messages-list">
      <ul>
      {messages.map(message => (
        <Message
        key={message.id}
        {...message}
        />
      ))}
      </ul>
    </section>
    <div style={{ float:"left", clear: "both" }}
      ref={(el) => { this.messagesEnd = el; }}>
    </div>
  </div>
)

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      datePosted: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
}

export default MessagesList