import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import store from '../../store';
import { NavLink } from 'react-router-dom';

import { requestUsers, registerUsersRequest } from '../../actions/users-action';
import UsersList from '../../components/users/users'
import Loading from '../../components/loading';
import EditUser from '../../components/users/edit-user';
import InsertUsersForm from '../../components/users/insert-user'
import * as api from '../../api/users-api'


class UsersListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted_column: 'id',
            order: 'desc',
            confirmText: null,
            isEditing: false,
            companies :{}
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
        this.editUser = this.editUser.bind(this)
    }
    componentDidMount() {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUsers(pageNumber, sorted_column, order);

        api.getCompaniesList().then(response=> {
            this.setState({companies: response.data})
        })
    }

    //submit function
    onSubmit(values) {
        this.props.registerUsersRequest(values);
    }

    // edit functions
    editUser(values) {
        console.log('user-id', values)
        this.setState ({
            isEditing : values
        })
    }

    //confirm box for delete function
    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUsers(pageNumber, sorted_column, order)
    }

    //sorting function
    sortByColumn(column) {
        const pageNumber = this.props.activePage
        if (column === this.state.sorted_column) {
            this.state.order === 'desc' ? this.setState({ order: 'asc' }, () => {
                this.props.requestUsers(pageNumber, this.state.sorted_column, this.state.order)
            }) : this.setState({ order: 'desc' }, () => {
                this.props.requestUsers(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({ sorted_column: column, order: 'desc' }, () => {
                this.props.requestUsers(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }

    render() {
        if (this.props.match.path === "/dashboard/edit-user") {
            return (
                <EditUser editId= {this.state.isEditing}/>
            )
        } else if(this.props.match.path === "/dashboard/insert-user") {
            return (
                <InsertUsersForm companyList={this.state.companies} onSubmit={this.onSubmit.bind(this)}/>
            );
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="col s12 mt-2 mb-2 right-align">
                            <NavLink to="/dashboard/insert-user" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add User</span></NavLink>
                        </div>
                    </div>
                    {this.props.fetching ? (
                        <Loading />
                    ) : (
                            <div className="wr-not-loading"></div>
                        )}
                    <table>
                        <thead>
                            <tr>
                                <th data-field="id">#</th>
                                <th data-field="name" onClick={() => this.sortByColumn('first_name')}>First name
                                {this.state.order === 'desc' ?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th data-field="name" onClick={() => this.sortByColumn('last_name')}>Last name
                                {this.state.order === 'desc' ?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th data-field="email" onClick={() => this.sortByColumn('email')}>Email
                                {this.state.order === 'desc' ?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th data-field="role" onClick={() => this.sortByColumn('role')}>Role
                                {this.state.order === 'desc' ?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th data-field="company" onClick={() => this.sortByColumn('company_id')}>Company Name
                                {this.state.order === 'desc' ?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th data-field="action">Action</th>
                            </tr>
                        </thead>
                        {this.props.users.length ? (
                            <UsersList
                                users={this.props.users}
                                onEdit = {this.editUser} 
                                activePage={this.props.activePage}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                confirmText={this.state.confirmText}
                                showConfirmBox={this.deleteItem}
                                hideConfirmBox={this.hideDiv}
                            // deleteUsers = {this.props.requestDeleteUser}
                            />
                        ) : (
                                <tbody>
                                    <tr>
                                        <td >No Results Found !</td>
                                    </tr>
                                </tbody>
                            )}
                    </table>
                    <div className="col s12 mt-2 mb-2 left-align">
                        <Pagination
                            activePage={this.props.activePage}
                            itemsCountPerPage={this.props.itemsCountPerPage}
                            totalItemsCount={this.props.totalItemsCount}
                            pageRangeDisplayed={this.props.pageRangeDisplayed}
                            onChange={this.handlePageChange}
                            firstPageText='First'
                            lastPageText='Last'
                        />
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(store) {
    return {
        // loggedUser: store.userState.loggedUser,
        users: store.userState.users,
        fetching: store.userState.fetching,
        activePage: store.userState.activePage,
        itemsCountPerPage: store.userState.itemsCountPerPage,
        totalItemsCount: store.userState.totalItemsCount,
        pageRangeDisplayed: store.userState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestUsers, registerUsersRequest })(UsersListContainer);