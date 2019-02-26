import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField=({input, label, id, type, iconName, meta: {touched, error}})=> {
    return(
        <div className="row margin">
            <div className="input-field col s12">
                <i className="material-icons prefix pt-2">{iconName}</i>
                <input id={id} type={type} {...input}/>
                <label htmlFor={id} className="center-align">{label}</label>
                <div className="error">
                    {touched ? error: ''}
                </div>
            </div>
        </div>
    )
}
const LoginForm = props => {
    const {handleSubmit} = props
    return (
        <div id="login-page" className="row">
            <div className="col s12 m6 l4 z-depth-4 card-panel border-radius-6 login-card bg-opacity-8">
                <form className="login-form" onSubmit={ handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <h5 className="ml-4">Sign in</h5>
                        </div>
                    </div>
                    <Field 
                        name="email"
                        type="text"
                        label="Email"
                        id="email"
                        iconName="email"
                        component={renderInputField}
                    />
                    <Field 
                        name="password"
                        type="password"
                        label="Password"
                        id="password"
                        iconName="lock_outline"
                        component={renderInputField}
                    />
                                
                    <div className="row">
                        <div className="input-field col s12">
                            <button type="submit" className="btn waves-effect waves-light col s12">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
function validate(values) {
    const errors = {}
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

}
export default reduxForm({
    validate,
    form: "LoginForm"
})(LoginForm);