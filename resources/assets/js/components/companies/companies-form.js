import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import store from '../../store';


class CompanyForm extends Component {
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
                <h4 className="header2">Add New Company</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <div className="col s12 m4 l4">
                                <Field 
                                    label="Company Code"
                                    name="company_cd"
                                    type="text"
                                    component={this.renderInputField} 
                                />
                            </div>
                            <div className="col s12 m4 l4">
                                <Field 
                                    label="Company Name"
                                    name="name"
                                    type="text"
                                    component={this.renderInputField} 
                                />
                            </div>
                            <div className="col s12 m4 l4">
                                <Field 
                                    label="Contact Number"
                                    name="contact_no"
                                    type="number"
                                    component={this.renderInputField} 
                                />
                            </div>
                            <div className="col s12 m6 l6">
                                <Field 
                                    label="Company Address"
                                    name="address"
                                    type="text"
                                    component={this.renderInputField} 
                                />
                            </div>
                            
                            <div className="col s12 m6 l6">
                                <Field 
                                    label="Company Email"
                                    name="email"
                                    type="email"
                                    component={this.renderInputField} 
                                />
                            </div>
                            
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
    if(!values.company_cd) {
        errors.company_cd = "The Field is empty"
    }
    if(!values.name) {
        errors.name = "This Fiels is empty"
    }

    if(!values.address) {
        errors.address = "This Fiels is empty"
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(!values.contact_no) {
        errors.contact_no = "This Fiels is empty"
    } 
    return errors;
}


export default reduxForm({
    validate,
    form: 'PostCompanies'
})(CompanyForm);