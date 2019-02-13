import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../../components/login/register-form'

class RegisterFormContainer extends Component {
    onSubmit(values) {
        console.log('val', values)
    }
    render() {
        return (
            <RegisterForm onSubmit={this.onSubmit.bind(this)}/>
        );
    }
}

export default RegisterFormContainer;