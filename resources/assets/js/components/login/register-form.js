import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';

class RegisterForm extends Component {
    renderInputField({input, label, id, type, iconName, meta: {touched, error}}) {
        return(
            <div className="row margin">
                <div className="input-field col s12">
                    <i className="material-icons prefix pt-5">{iconName}</i>
                    <input id={id} type={type} {...input}/>
                    <label htmlFor={id} className="center-align">{label}</label>
                    <div className="error">
                        {touched ? error: ''}
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const {handleSubmit} = this.props
        return (
                <div id="login-page" className="row">
                    <div className="col s12 z-depth-4 card-panel">
                        <form className="login-form" onSubmit={ handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12 center">
                                    <h4>Register</h4>
                                    <p className="center">Join to our community now !</p>
                                </div>
                            </div>
                            <Field
                                name="username"
                                type="text"
                                label="Username"
                                id="username"
                                iconName="person_outline"
                                component={this.renderInputField}
                            />
                            <Field
                                name="email"
                                type="text"
                                label="Email"
                                id="email"
                                iconName="email"
                                component={this.renderInputField}
                            />
                            <Field
                                name="password"
                                type="password"
                                label="Password"
                                id="password"
                                iconName="lock_outline"
                                component={this.renderInputField}
                            />
                            <Field
                                name="confirm_password"
                                type="password"
                                label="Confirm Password"
                                id="confirm_password"
                                iconName="lock_outline"
                                component={this.renderInputField}
                            />
                            <div className="row">
                                <div className="input-field col s12">
                                    <button type="submit" className="btn waves-effect waves-light col s12">Register Now</button>
                                </div>
                                <div className="input-field col s12">
                                    <p className="margin center medium-small sign-up">Already have an account? <NavLink to="/login">Login</NavLink></p>
                                </div>
                            </div>
                        </form>
                    </div>    
                </div>
            
        );
    }
}

export default reduxForm({
    form: "RegisterForm"    
})(RegisterForm);