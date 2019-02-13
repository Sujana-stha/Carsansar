import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangePasswordForm from '../../components/login/change-password'

class ChangePasswordContainer extends Component {
    onSubmit(values) {
        console.log('val', values)
    }
    render() {
        return (
            <div className="cyan wr-auth-container">
                <ChangePasswordForm onSubmit={this.onSubmit.bind(this)}/> 
            </div>
        );
    }
}

export default ChangePasswordContainer;