import React, { Component } from 'react';
import {connect} from 'react-redux'
import { registerUsersRequest } from '../../actions/users-action'
import InsertUsersForm from '../../components/users/insert-user'

class AddUsersContainer extends Component {

    onSubmit(values) {
        this.props.registerUsersRequest(values);
    }

    render() {
        return (
            <InsertUsersForm onSubmit={this.onSubmit.bind(this)}/>
        );
    }
}

export default connect(null, {registerUsersRequest})(AddUsersContainer);