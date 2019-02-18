// Insert User
import React,{ Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Row } from 'react-materialize';
import { Field, reduxForm } from 'redux-form';


class InsertUser extends Component{
    renderInputField({input, label, type, meta: {touched, error}}) {
        return(
        <div className="input-field">
            <input type={type} {...input}/>
            <label>{label}</label>
            <div className="error">
                {touched ? error: ''}
            </div>
        </div>)
    }
    renderSelectField({input, label, children, meta: {touched, error}}) {
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
    render() {
        const {handleSubmit} = this.props
        return(
            <div>
                <Row>
                    <div className="col s12 mt-2 mb-2 right-align">
                        <NavLink to="/users" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> All Users</span></NavLink>
                    </div>
                </Row>
                <h4 className="header2">Add New User</h4>
                <form className="col s12" onSubmit={ handleSubmit}>
                    <div className="card-panel">
                        <Row>
                            {/* <Input s={6} label="First Name" /> */}
                            <div className="col s12">
                                <Field name="name" type="text" label="Full Name" component={this.renderInputField}/>
                            </div>
                            {/* <Input s={12} label="Username" defaultValue="" />
                            <Input type="password" label="Password" s={12} />
                            <Input type="email" label="Email" s={12} /> */}
                            <div className="col s6">
                                <Field name="role" label="Role" component={this.renderSelectField}>
                                    <option value="" disabled>Choose one</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Editor">Editor</option>
                                </Field>
                            </div>
                            <div className="col s6">
                                <Field name="email" type="text" label="Email" component={this.renderInputField}/>
                            </div>

                            <div className="col s6">
                                <Field name="password" type="password" label="Password" component={this.renderInputField}/>
                            </div>
                            <div className="col s6">
                                <Field name="c_password" type="password" label="Confirm Password" component={this.renderInputField}/>
                            </div>
                            <button type="submit" className="btn waves-effect waves-light">Add New User</button>
                        </Row>
                
                    </div>
                </form>
            </div>
        )
    }
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
    if (!values.c_password) {
        errors.c_password = "You must Confirm your password!"
    } else if(values.c_password != values.password) {
        errors.c_password = "Password Mismatched!"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'RegisterForm'
})(InsertUser);