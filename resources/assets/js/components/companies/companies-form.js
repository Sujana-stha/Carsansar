import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField=({input, label, type, meta: {touched, error}})=> {
    return (
            <div className="row">
                <div className="input-field col s12">
                    <input type={type} {...input}/>
                    <label>{label}</label>
                    <div className="error">
                        {touched ? error: ''}
                    </div>
                </div>
            </div>
    )
}
const CompanyForm=props=> {
        const { handleSubmit } = props;
        return (
            <div>
                <h4 className="wr-header2">Add Company</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <div className="col s12 m4 l4">
                                <Field 
                                    label="Enter Company Code"
                                    name="company_cd"
                                    type="text"
                                    component={renderInputField} 
                                />
                            </div>
                            <div className="col s12 m4 l4">
                                <Field 
                                    label="Enter Company Name"
                                    name="name"
                                    type="text"
                                    component={renderInputField} 
                                />
                            </div>
                            <div className="col s12 m4 l4">
                                <Field 
                                    label="Contact Number"
                                    name="contact_no"
                                    type="number"
                                    component={renderInputField} 
                                />
                            </div>
                            <div className="col s12 m6 l6">
                                <Field 
                                    label="Company Address"
                                    name="address"
                                    type="text"
                                    component={renderInputField} 
                                />
                            </div>
                            
                            <div className="col s12 m6 l6">
                                <Field 
                                    label="Company Email"
                                    name="email"
                                    type="email"
                                    component={renderInputField} 
                                />
                            </div>
                            
                            <div className="row">
                                <div className="col s12">
                                    <button className="btn cyan waves-effect waves-light" type="submit" name="action">Save
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

function validate(values) {
    const errors = {}
    if(!values.company_cd) {
        errors.company_cd = "The Field is empty"
    } else if(values.company_cd.length > 25) {
        errors.company_cd = "Must be 25 character or Less!"
    }

    if(!values.name) {
        errors.name = "This Fiels is empty"
    } else if(values.name.length > 50) {
        errors.name = "Must be 50 character or Less!"
    }

    if(!values.address) {
        errors.address = "This Fiels is empty"
    } else if (values.address.length > 100) {
        errors.address = "Must be 50 character or Less!"
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 50) {
        errors.email = "Must be 50 character or Less!"
    }
    if(!values.contact_no) {
        errors.contact_no = "This Fiels is empty"
    } else if(values.contact_no.length > 15) {
        errors.contact_no = "Must be 15 character or Less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'PostCompanies'
})(CompanyForm);