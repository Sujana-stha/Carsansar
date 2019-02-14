import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from 'react-materialize';
import { NavLink } from 'react-router-dom';

class LoginForm extends Component {
   
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
    renderCheckboxField({input, type, label}) {
        return(
            <div className="row">
                <div className="col s12 m12 l12 ml-2 mt-3">
                    <Input {...input} name={input.name} type={type} label={label} className='filled-in'/>
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
                                    <img src="images/logo/login-logo.png" alt="CarSansar logo" className="circle responsive-img valign profile-image-login"/>
                                    <p className="center login-form-text">whrepo</p>
                                </div>
                            </div>
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
                            <Field name="remember"
                                type="checkbox"
                                label="Remember me"
                                component={this.renderCheckboxField}
                            />
                            <div className="row">
                                <div className="input-field col s12">
                                    <button type="submit" className="btn waves-effect waves-light col s12">Login</button>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="input-field col s6 m6 l6">
                                    <p className="margin medium-small"><NavLink to="/register">Register Now!</NavLink></p>
                                </div>
                                <div className="input-field col s6 m6 l6">
                                    <p className="margin right-align medium-small"><NavLink to="/forgot-password">Forgot password ?</NavLink></p>
                                </div>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: "LoginForm"
})(LoginForm);