import React, { Component } from 'react'

export default class FieldEditor extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: this.props.value,
            id: this.props.id
        }
    }

    handleChange(event) {
        const text = event.target.value;
        this.props.onChange(this.props.id, text);
      }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.state.id}>{this.state.id}</label>
                <input value={this.state.value} onChange={this.handleChange} type="text" className="form-control" id={this.state.id}/>
            </div>
        )
    }
}
