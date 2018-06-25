import React from "react"
import PropTypes from "prop-types"
import Message from "./Message"

class MessagesList extends React.Component {


  render() {
    return (
      <div>
        <section id="messages-list">
          <ul>

            {this.props.messages.map(message => (
              <Message
              key={message.id}
              {...message}
              />
            ))}

            {/* This is just a reference for scrolling to bottom. */}
            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
            </div>

          </ul>
        </section>
      </div>
    )
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() { 
    this.scrollToBottom();
  }
  
  componentDidUpdate() {    
    this.scrollToBottom();    
  }

}

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