import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/login/login-form';
import {loginRequest} from '../../actions/login-action';
import Notifications from 'react-notify-toast';

class LoginFormContainer extends Component {
    
    onSubmit(values) {
        console.log('val', values);
        this.props.loginRequest(values);
    }
    render() {
        
        return (
            <div className="cyan wr-auth-container">
                <Notifications options={{top: '20px', right: '0px', width: '100%', margin:0, left: 'none'}}/>
                <LoginForm onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}

export default connect(null,{loginRequest})(LoginFormContainer);