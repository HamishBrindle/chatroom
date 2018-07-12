import React, { Component } from 'react'

const styles = {
    alert: {
        marginTop: '20px'
    }
}

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
                <label htmlFor={this.state.id}>Room Name</label> {/* When more fields introduced, change back to {this.state.id} */}
                <input value={this.state.value} onChange={this.handleChange} type="text" className="form-control" id={this.state.id} required
                    minLength="4" maxLength="16" pattern="[a-z]{4,8}"/>
                <div style={styles.alert} className="alert alert-warning" role="alert">
                    Room names must be <strong>one word</strong> and <strong>4-16 characters</strong> in length.
                </div>
            </div>
        )
    }
}
