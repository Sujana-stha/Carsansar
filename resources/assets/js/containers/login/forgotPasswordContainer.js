import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForgotPasswordForm from '../../components/login/forgot-password'

class ForgotPasswordContainer extends Component {
    onSubmit(values) {
        console.log('val', values)
    }
    render() {
        return (
            <div className="cyan wr-auth-container">
               <ForgotPasswordForm onSubmit={this.onSubmit.bind(this)}/> 
            </div>
        );
    }
}

export default ForgotPasswordContainer;