import React from 'react'
import PropTypes from 'prop-types'

/**
 * AddMessage is the input field at the bottom of the chat window for
 * sending new messages.
 * 
 * @param {Object} props 
 */
const AddMessage = (props) => {
  let input;

  return (
    <section id="new-message" className="msger-inputarea">
      <input onKeyPress={(e) => {
        if (e.key === 'Enter') {
          props.dispatch(input.value, props.room, 'Me')
          input.value = ''
        }
      }} type="text" ref={(node) => {
        input = node
      }} className="msger-input"
      /><button onClick={(e) => {
        props.dispatch(input.value, props.room, 'Me')
        input.value = ''
      }} className="msger-send-btn">Send</button>
    </section>

  )
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessage