import React from "react"
import PropTypes from "prop-types"
import Message from "./Message"

class MessagesList extends React.Component {

  constructor(props) {
    super(props);
  }

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

// const MessagesList = ({ messages }) =>
//   <div>
//     <section id="messages-list">
//       <ul onLoad={(e) => scrollBottom(e)}>
//       {messages.map(message => (
//         <Message
//         key={message.id}
//         {...message}
//         />
//       ))}
//       </ul>
//     </section>
//   </div>;

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

const scrollBottom = (event) => {
  console.log(event);
}


export default MessagesList