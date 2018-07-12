import React from "react"
import PropTypes from "prop-types"
import Message from "./Message"

const CUSTOM_STYLES = {
  loading: {
      margin: 'auto',
      width: '100%',
      marginTop: '50px',
      textAlign: 'center',
      fontSize: '48px',
      color: '#e3e3e3'
  }
};

/**
 * MessagesList displays all the messages.
 */
class MessagesList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true// Whether messages have been fully loaded from server
    }

  }

  render() {
    return (
      <div>
        <section id="messages-list">
          <ul>
            {this.state.loading && <div><p style={CUSTOM_STYLES.loading}>Loading...</p></div>}
            {this.props.messages.map(message => (
              <Message
              key={message.id}
              {...message}
              userName={this.props.userName}
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

  /**
   * Check if there are actually any messages yet, which could indicate
   * whether or not the Socket was successful.
   */
  checkForMessages() {
    if (this.props.isConnected)
      this.setState({ loading: false });
  }

  /**
   * Pretty much scrolls to the bottom when we get a new message,
   * but when the height of the screen is less than that of the
   * messaging div, it scrolls everything to the bottom of
   * the div, so it's not ideal on small screens...
   */
  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() { 
    this.checkForMessages();
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    if (this.state.loading) {
      this.checkForMessages()
    }
    this.scrollToBottom();
  }

}

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      datePosted: PropTypes.number
    }).isRequired
  ).isRequired
}

export default MessagesList