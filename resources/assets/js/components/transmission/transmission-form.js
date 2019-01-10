import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import store from '../../store';


class TransmissionForm extends Component {
    renderInputField({input, label, type, meta: {touched, error}}) {
        return (
            <div>
                <div className="row">
					<div className="input-field col s12">
                        <input type={type} {...input}/>
                        <label>{label}</label>
                        <div className="error">
                            {touched ? error: ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h4 className="header2">Add New Transmission</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Transmission Desciption"
                                name="transmission_desc"
                                type="text"
                                component={this.renderInputField} 
                            />
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Save
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {}
    if(!values.transmission_desc) {
        errors.transmission_desc = "The Field is empty"
    } else if (values.transmission_desc.length > 30) {
        errors.transmission_desc ="Must be 30 character or Less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'PostTransmissions'
})(TransmissionForm);