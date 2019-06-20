// User Profile
import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import loadjs from 'loadjs'
import { Field, reduxForm } from 'redux-form';

import * as api from '../../api/users-api';


class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            userDetails: []
        }
    }
    componentDidMount() {
        const id =  this.props.editId;
        api.getSingleUserDetail(id).then(response => {
            console.log('re', response)
            const data =response.data
            this.props.initialize(data)
            loadjs('/js/materialize-admin/custom/custom-script.js');

        })
    }
    renderInputField ({ input, label,id, type, meta: { touched, error } }) {
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
    renderDisabledField({ input, label,id,type, meta: { touched, error }}) {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <input disabled id={id} type={type} {...input}/>     
                    <label className="active" htmlFor={id}>{label}</label>
                </div>
                <div className="error">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                <h4 className="header2">User Profile</h4>
                <section id="content">
                    <div className="container">
                        <div id="profile-page" className="section">
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
                                    <Field
                                    label="Company ID/Dealership ID"
                                    name="company_id.company_cd"
                                    type="text"
                                    id="company_cd"
                                    component={this.renderDisabledField}
                                    />
                                </div>
                                <div className="form-field col s6">
                                    <Field
                                    label="Company/Dealership Name"
                                    name="company_id.name"
                                    type="text"
                                    id="company_name"
                                    component={this.renderInputField}
                                    />
                                </div>
                                <div className="form-field col s12">
                                    <Field
                                    label="Username cannot be changed"
                                    name="username"
                                    type="text"
                                    component={this.renderDisabledField}
                                    id="username"
                                    />
                                </div>
                                {/* <button className='btn waves-effect waves-light'>Change Password</button> */}
                                <div className="form-field col s12">
                                    <Field
                                    label="Password"
                                    name="password"
                                    type="password"
                                    id="password"
                                    component={this.renderInputField}
                                    />
                                </div>
                                {/* <div className="form-field col s12">
                                    <Field
                                    label="New Password"
                                    name="new_password"
                                    type="password"
                                    id="new_password"
                                    component={this.renderInputField}
                                    />
                                </div>
                                <div className="form-field col s12">
                                    <Field
                                    label="Retype New Password"
                                    name="c_new_password"
                                    type="password"
                                    id="c_new_password"
                                    component={this.renderInputField}
                                    />
                                </div> */}

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
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
function validate(values){
    console.log(values);
}

export default reduxForm({
    validate,
    form: 'UpdateUserProfile'
})(UserProfile);