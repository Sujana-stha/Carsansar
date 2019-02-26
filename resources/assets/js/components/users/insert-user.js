// Insert User
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const renderInputField=({input, label, type, meta: {touched, error}})=> {
    return(
        <div className="input-field">
            <input type={type} {...input}/>
            <label>{label}</label>
            <div className="error">
                {touched ? error: ''}
            </div>
        </div>
    )
}

const renderSelectField=({input, label, children, meta: {touched, error}})=> {
    return (
        <div>
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
        <div>
            <div className="row">
                <div className="col s12 mt-2 mb-2 right-align">
                    <NavLink to="/dashboard/users" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> All Users</span></NavLink>
                </div>
            </div>

            <h4 className="header2">Add New User</h4>
            
            <form className="col s12" onSubmit={ handleSubmit}>
                <div className="card-panel">
                    <div className="row">
                        <div className="col s12">
                            <Field name="name" type="text" label="Full Name" component={renderInputField}/>
                        </div>
                           
                        <div className="col s6">
                            <Field name="role" label="Role" component={renderSelectField}>
                                <option value="" disabled>Choose one</option>
                                <option value="Manager">Manager</option>
                                <option value="Editor">Editor</option>
                            </Field>
                        </div>
                        <div className="col s6">
                            <Field name="email" type="text" label="Email" component={renderInputField}/>
                        </div>

                        <div className="col s6">
                            <Field name="password" type="password" label="Password" component={renderInputField}/>
                        </div>
                        <div className="col s6">
                            <Field name="password_confirmation" type="password" label="Confirm Password" component={renderInputField}/>
                        </div>
                        <button type="submit" className="btn waves-effect waves-light">Add New User</button>
                    </div>
                
                </div>
            </form>
        </div>
    )
}

function validate(values) {
    const errors = {}
    if(!values.name) {
        errors.name = "This Fiels is empty"
    } else if(values.name.length > 191) {
        errors.name = "Must be 191 character or Less!"
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 191) {
        errors.email = "Must be 191 character or Less!"
    }

    if(!values.password) {
        errors.password = 'You must have Password'
    } else if(values.password.length > 191) {
        errors.password = "Must be 191 character or Less!"
    }
    if (!values.password_confirmation) {
        errors.password_confirmation = "You must Confirm your password!"
    } else if(values.password_confirmation != values.password) {
        errors.password_confirmation = "Password Mismatched!"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'RegisterForm'
})(InsertUser);