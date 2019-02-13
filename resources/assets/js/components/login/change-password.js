import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';

class ChangePassword extends Component {
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
            <div className="wr-auth-form">
                <div id="login-page" className="row">
                    <div className="col s12 z-depth-4 card-panel">
                        <form className="login-form" onSubmit={ handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12 center">
                                    <h4>Change Your Password</h4>
                                    <p className="center">You can change your password</p>
                                </div>
                            </div>
                            <Field 
                                name="password"
                                type="text"
                                label="New Password"
                                id="new_password"
                                iconName="lock_outline"
                                component={this.renderInputField}
                            />
                            <Field 
                                name="confirm_password"
                                type="text"
                                label="Confirm Password"
                                id="confirm_password"
                                iconName="lock_outline"
                                component={this.renderInputField}
                            />
                            <div className="row">
                                <div className="input-field col s12">
                                    <button type="submit" className="btn waves-effect waves-light col s12">Change Password</button>
                                </div>
                                {/* <div className="input-field col s12">
                                    <p className="margin sign-up"><NavLink to="/login">Login</NavLink> <NavLink to="/register" className="right">Register</NavLink></p>
                                </div> */}
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: "LoginForm"
})(ChangePassword);