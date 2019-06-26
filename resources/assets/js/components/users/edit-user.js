// User Profile
import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import loadjs from 'loadjs'
import { Field, reduxForm } from 'redux-form';

import * as api from '../../api/users-api';


class EditUser extends Component {
    constructor() {
        super();
        this.state = {
            userDetails: []
        }
    }
    componentDidMount() {
        const id = this.props.editId;
        api.getSingleUserDetail(id).then(response => {
            const data = response.data
            this.props.initialize(data)
            loadjs('/js/materialize-admin/custom/custom-script.js');
        })
    }
    renderInputField({ input, label, id, type, meta: { touched, error } }) {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <input id={id} type={type} {...input} />
                    <label className="active" htmlFor={id}>{label}</label>
                    <div className="error">
                        {touched ? error : ''}
                    </div>
                </div>
            </div>
        )
    }
    renderSelectField({ input, label, children, meta: { touched, error } }) {
        return (
            <div className="">
                <label>{label}</label>
                <select {...input} className="browser-default">
                    {children}
                </select>
                <div className="error">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    renderDisabledField({ input, label, id, type, meta: { touched, error } }) {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <input disabled id={id} type={type} {...input} />
                    <label className="active" htmlFor={id}>{label}</label>
                </div>
                <div className="error">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h4 className="header2">User Profile</h4>
                <section id="content">
                    <div className="container">
                        <div id="profile-page" className="section">
                            <form onSubmit= { handleSubmit }>
                            <div className="row">
                                <div className="col s6">
                                    <Field
                                        label="First Name"
                                        name="first_name"
                                        type="text"
                                        id="first_name"
                                        component={this.renderInputField}
                                    />
                                </div>
                                <div className="col s6">
                                    <Field
                                        label="Last Name"
                                        name="last_name"
                                        type="text"
                                        id="last_name"
                                        component={this.renderInputField}
                                    />
                                </div>
                                
                                <div className="form-field col s6">
                                    
                                    <Field name="company_id" label="Company" component={this.renderSelectField}>
                                        <option value="" disabled>Choose one</option>
                                        {Object.keys(this.props.companyList).map((company, i) => {
                                            return (
                                                <option key={i} value={company}>{this.props.companyList[company]}</option>
                                            )
                                        })}
                                    </Field>
                                </div>
                                <div className="form-field col s6">
                                    <Field
                                        label="Username cannot be changed"
                                        name="username"
                                        type="text"
                                        component={this.renderDisabledField}
                                        id="username"
                                    />
                                </div>
                                <div className="form-field col s12">
                                    <Field
                                        label="Password"
                                        name="password"
                                        type="password"
                                        id="password"
                                        component={this.renderInputField}
                                    />
                                </div>

                                <div className="clearfix"></div>
                                <div className="form-field col s12">
                                    <Field
                                        name="email"
                                        label="Email"
                                        type="text"
                                        id="email"
                                        component={this.renderInputField}
                                    />
                                </div>
                                <button className='btn waves-effect waves-light'>Update User</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
function validate(values) {
    console.log(values);
    const errors = {}
    if(!values.first_name) {
        errors.first_name = "This Fiels is empty"
    } else if(values.first_name.length > 191) {
        errors.first_name = "Must be 191 character or Less!"
    }
    if(!values.last_name) {
        errors.last_name = "This Fiels is empty"
    } else if(values.last_name.length > 191) {
        errors.last_name = "Must be 191 character or Less!"
    }
    
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 191) {
        errors.email = "Must be 191 character or less!"
    }
    
    if(!values.company_id) {
        errors.company_id ="This field is empty!"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'UpdateUser'
})(EditUser);