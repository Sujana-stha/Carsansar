import React, { Component } from 'react';
import {connect} from 'react-redux'
import { registerUsersRequest } from '../../actions/users-action'
import InsertUsersForm from '../../components/users/insert-user'
import * as api from '../../api/users-api'

class AddUsersContainer extends Component {
    constructor() {
        super();
        this.state = {
            companies :{}
        }
    }
    componentDidMount() {
        api.getCompaniesList().then(response=> {
            this.setState({companies: response.data})
        })
    }
    onSubmit(values) {
        this.props.registerUsersRequest(values);
    }

    render() {
        return (
            <InsertUsersForm companyList={this.state.companies} onSubmit={this.onSubmit.bind(this)}/>
        );
    }
}

export default connect(null, {registerUsersRequest})(AddUsersContainer);