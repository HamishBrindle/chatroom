import React from 'react'
import PropTypes from 'prop-types'

const AddMessage = (props) => {
  let input;
  console.log(props)

  return (
    <section id="new-message" className="msger-inputarea">
      <input onKeyPress={(e) => {
        if (e.key === 'Enter') {
          props.dispatch(input.value, props.room, 'Me', this.socket)
          input.value = ''
        }
      }} type="text" ref={(node) => {
        input = node
      }} className="msger-input"
      /><button onClick={(e) => {
        props.dispatch(input.value, props.room, 'Me', this.socket)
        input.value = ''
      }} className="msger-send-btn">Send</button>
    </section>

  )
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessage