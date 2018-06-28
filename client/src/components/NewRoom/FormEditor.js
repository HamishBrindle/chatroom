import React, { Component } from 'react'
import FieldEditor from './FieldEditor'
import '../../style/FormEditor.css';

export class FormEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {}

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleFieldChange(fieldId, value) {
        this.setState({ [fieldId]: value });
    }

    submitForm(event) {
        console.log(this.state);
        this.props.onSubmit(this.state);
    }

    render() {

        const fields = this.props.fields.map(field => (
            <FieldEditor
              key={field}
              id={field}
              onChange={this.handleFieldChange}
              value={this.state[field]}
            />
          ));

        return (
            <div className="form-editor">
                {fields}
                <button className="btn btn-success" onClick={this.submitForm}>Submit</button>
            </div>
        )
    }
}

export default FormEditor
