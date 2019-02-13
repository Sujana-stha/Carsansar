import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/login/login-form';
import {loginRequest} from '../../actions/login-action';
import Notifications from 'react-notify-toast';
// import {login} from '../../helpers/check-auth'
// import {Redirect} from 'react-router-dom'

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            redirectToReferrer: false
        }
    }
    onSubmit(values) {
        // document.body.classList.add('modal-open');
        console.log('val', values);
        this.props.loginRequest(values);
        // fakeAuth.authenticate(() => {
        //     this.setState({ redirectToReferrer: true });
        // });
        
    }
    render() {
        // const { from } = this.props.location.state || { from: { pathname: "/" } };
        // const { redirectToReferrer } = this.state;
        // if (redirectToReferrer) {
        //     return <Redirect to={from} />;
        // }
        return (
            <div className="cyan wr-auth-container">
                <Notifications options={{top: '20px', right: '0px', width: '100%', margin:0, left: 'none'}}/>
                <LoginForm onSubmit={this.onSubmit.bind(this)}/>
                {/* <button onClick={() => {
                    login().then(() => {
                        this.props.history.push('/dashboard')
                    })
                    }}>Submit</button> */}
            </div>
        );
    }
}

export default connect(null,{loginRequest})(LoginFormContainer);