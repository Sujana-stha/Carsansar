// Insert User
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import asyncValidate from './asyncvalidate';

const renderInputField=({input, label, type, meta: {asyncValidating, touched, error}})=> {
    return(
        <div className="input-field">
            <input type={type} {...input}/>
            <label>{label}</label>
            {asyncValidating ? (
                <div className="preloader-wrapper small active right wr-input-loader">
                    <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
              </div>
            ): null}
            <div className="error">
                {touched ? error: ''}
            </div>
        </div>
    )
}

const renderSelectField=({input, label, children, meta: {touched, error}})=> {
    return (
        <div className="">
            <label>{label}</label>
            <select {...input} className="browser-default">
                {children}
            </select>
            <div className="error">
                {touched ? error: ''}
            </div>
        </div>
    )
}
const InsertUser =props=> {
    const {handleSubmit} = props
    return(
        <div className="wr-users-form">
            <div className="row">
                <div className="col s12 mt-2 mb-2 right-align">
                    <NavLink to="/users" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> All Users</span></NavLink>
                </div>
            </div>

            <h4 className="header2">Add New User</h4>
            
            <form className="col s12" onSubmit={ handleSubmit}>
                <div className="card-panel">
                    <div className="row">
                        <div className="col s6">
                            <Field name="first_name" type="text" label="First Name" component={renderInputField}/>
                        </div>
                        <div className="col s6">
                            <Field name="last_name" type="text" label="Last Name" component={renderInputField}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <Field name="username" type="text" label="Username" component={renderInputField}/>
                        </div>
                        <div className="col s6">
                            <Field name="email" type="text" label="Email" component={renderInputField}/>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <Field name="password" type="password" label="Password" component={renderInputField}/>
                        </div>
                        <div className="col s6">
                            <Field name="password_confirmation" type="password" label="Confirm Password" component={renderInputField}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <Field name="role" label="Role" component={renderSelectField}>
                                <option value="" disabled>Choose one</option>
                                <option value="Manager">Manager</option>
                                <option value="Editor">Editor</option>
                            </Field>
                        </div>
                        <div className="col s6">
                            <Field name="company_id" label="Company" component={renderSelectField}>
                                <option value="" disabled>Choose one</option>
                                {Object.keys(props.companyList).map((company, i)=> {
                                    return (
                                        <option key={i} value={company}>{props.companyList[company]}</option>
                                    )
                                })}
                            </Field>
                        </div>
                    
                        <div className="col s12 mt-2">
                            <button type="submit" className="waves-effect waves-light  btn">Add New User</button>
                        </div>
                    </div>
                
                </div>
            </form>
        </div>
    )
}

function validate(values) {
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
    if(!values.username) {
        errors.username = "This Fiels is empty"
    } else if(values.username.length > 191) {
        errors.username = "Must be 191 character or Less!"
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 191) {
        errors.email = "Must be 191 character or less!"
    }

    if(!values.password) {
        errors.password = 'You must havepPassword'
    } else if(values.password.length > 191) {
        errors.password = "Must be 191 character or less!"
    }
    if (!values.password_confirmation) {
        errors.password_confirmation = "You must confirm your password!"
    } else if(values.password_confirmation != values.password) {
        errors.password_confirmation = "Password Mismatched!"
    }
    if(!values.role) {
        errors.role = "This field is empty!"
    }
    if(!values.company_id) {
        errors.company_id ="This field is empty!"
    }
    return errors;
}

export default reduxForm({
    validate,
    asyncValidate,
    asyncBlurFields: ['username'],
    form: 'RegisterForm'
})(InsertUser);