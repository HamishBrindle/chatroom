import React, { Component } from 'react'
import FieldEditor from './FieldEditor'
import '../../style/FormEditor.css'
import iceCream from '../../assets/icecream_red.svg'

const SWEAR_JAR = require('swearjar');

const STYLES = {
    ol: {
        margin: '0px',
    },
    li: {
        display: 'flex',
        paddingBottom: '3px'
    },
    p: {
        margin: '0px'
    },
    bullet: {
        width: '20px',
        height: '24px',
        display: 'block',
        marginRight: '5px',
        opacity: '0.7'
    }
}

class Error extends Component {

    render() {
        const errors = this.props.errors || [];

        return(
        
            <div>
                {/* Don't display alert if there are no errors */}
                {errors.length > 0 &&
                <div className="alert alert-danger" role="alert">
                    <ol style={STYLES.ol}>
                        {errors.map((error, i) => 
                            <li style={STYLES.li} key={i}>
                                <img src={iceCream} alt='Bullet' style={STYLES.bullet} />
                                <p style={STYLES.p}>{error}</p>
                            </li>
                        )}
                    </ol>
                </div>
                }
            </div>
           
        );
    }

}

export class FormEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleFieldChange(fieldId, value) {
        this.setState({ [fieldId]: value });
    }

    validateForm() {
        
        const pattern = new RegExp('^([A-Za-z]|[0-9]|_)+$')
        const rn = this.state.roomName;

        var roomExists = false;
        for (let i = 0; i < this.props.rooms.length; i++) {
            if (rn === this.props.rooms[i]) { 
                roomExists = true;
                break;
            }
        }

        var allErrors = []

        if (SWEAR_JAR.profane(rn))   allErrors.push('Room name contains profanity. Clean it up!')
        if (rn.length < 4)          allErrors.push('Too short.');
        if (!pattern.test(rn))      allErrors.push('Invalid characters.');
        if (roomExists)             allErrors.push('Room with that name exists already.');

        this.setState({ errors: allErrors })
        
        return allErrors.length < 1;
    }

    submitForm(event) {
        this.setState({ errors: [] })
        if (this.validateForm()) {
            this.props.onSubmit(this.state);
        }
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
                <Error errors={this.state.errors} />
                {fields}
                <button className="btn btn-success" onClick={this.submitForm}>Submit</button>
            </div>
        )
    }
}

export default FormEditor
