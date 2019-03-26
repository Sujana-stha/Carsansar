import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/login/login-form';
import {loginRequest} from '../../actions/login-action';

class LoginFormContainer extends Component {
    componentDidMount() {
        var col = document.body.dataset.dataCol;
        document.body.classList.add('1-column');
        document.body.classList.add('login-bg')
        document.body.classList.add('blank-page')
        document.body.classList.remove('2-columns');
        col = '1-column';
    }
    
    onSubmit(values) {
        this.props.loginRequest(values);
    }
    render() {
        
        return (
            <div className="row">
                
                <div className="col s12">
                    <div className="container">
                        <LoginForm onSubmit={this.onSubmit.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null,{loginRequest})(LoginFormContainer);