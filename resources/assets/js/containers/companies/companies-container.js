import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import store from '../../store';
import { requestCompanies, requestDeleteCompanies, requestSubmitCompanies, requestUpdateCompanies, requestCompaniesStatus } from '../../actions/companies-action';
import { requestLoggedUser } from '../../actions/users-action';
import loadjs from 'loadjs'

//COMPONENT
import CompanyForm from '../../components/companies/companies-form';
import EditCompany from '../../components/companies/companies-edit';
import CompaniesList from '../../components/companies/companies';
import Loading from '../../components/loading';


class CompaniesListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editCompanies = this.editCompanies.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }
    componentWillMount() {
        loadjs('/js/materialize-admin/plugins.js', function () {
            loadjs('/js/materialize-admin/custom/custom-script.js');
        });
    }
    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestCompanies(pageNumber, sorted_column, order);
        this.props.requestLoggedUser();
    }

    // submit function for new data
    submitCompany(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitCompanies(values, pageNumber, sorted_column, order);
        $('.collapsible').collapsible('close', 0);
    }

    // submit function to update data
    submitEditCompany(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUpdateCompanies(values, pageNumber, sorted_column, order);
        this.setState({
            isEditing: false
        });
        $('.collapsible').collapsible('close', 0);
    }

    //function to call form of edit
    editCompanies(values) {
        this.setState({
            isEditing: values
        })
        $('.collapsible').collapsible('open', 0);
    }

    deleteCompanyAction(companyId) {
        this.props.requestDeleteCompanies(companyId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestCompanies(pageNumber, sorted_column, order)
    }

    toggleStatus(companyId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const newCompanyStatus = {
            status: !status
        }
        this.props.requestCompaniesStatus(companyId, newCompanyStatus, pageNumber, sorted_column, order)
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }
    sortByColumn(column) {
        const pageNumber = this.props.activePage
        if (column === this.state.sorted_column) {
            this.state.order === 'desc' ? this.setState({ order: 'asc' }, () => {
                this.props.requestCompanies(pageNumber, this.state.sorted_column, this.state.order)
            }) : this.setState({ order: 'desc' }, () => {
                this.props.requestCompanies(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({ sorted_column: column, order: 'desc' }, () => {
                this.props.requestCompanies(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }
    render() {
        return (
            <div className="wr-company-container">
                <div className="row">
                    {this.props.fetching ? (
                        <Loading />
                    ) : (
                            <div className="wr-not-loading"></div>
                        )}
                    <div className="col s12 mt-2 mb-2">
                        <ul className="collapsible" data-collapsible="accordion">
                            {this.state.isEditing ? (
                                <li className="active">
                                    <div className="collapsible-header">
                                        <a className="btn cyan waves-effect waves-light right"><i className="material-icons left">add</i><span> Update Company</span></a>
                                    </div>
                                    <div className="collapsible-body col s12 m12 l12">
                                        <EditCompany onSubmit={this.submitEditCompany.bind(this)} editId={this.state.isEditing} />
                                    </div>
                                </li>

                            ) : (
                                    <li>
                                        <div className="collapsible-header">
                                            <a className="btn right waves-effect waves-light"><i className="material-icons left">add</i><span> Add Company</span></a>
                                        </div>
                                        <div className="collapsible-body col s12 m12 l12">
                                            <CompanyForm onSubmit={this.submitCompany.bind(this)} />
                                        </div>
                                    </li>
                                )}
                        </ul>
                    </div>
                    <div className="col s12 m12 l12 mt-2 mb-2">

                        <table className="wr-master-table">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th onClick={() => this.sortByColumn('company_cd')}>Company Code
                                        {this.state.order === 'desc' ?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                            : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={() => this.sortByColumn('name')}>Name
                                        {this.state.order === 'desc' ?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                            : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={() => this.sortByColumn('address')}>Address
                                        {this.state.order === 'desc' ?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                            : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th width="50px" onClick={() => this.sortByColumn('email')} className="wr-company-email">Email
                                        {this.state.order === 'desc' ?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                            : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={() => this.sortByColumn('contact_no')}>Contact
                                        {this.state.order === 'desc' ?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                            : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={() => this.sortByColumn('created_by')}>Added by
                                        {this.state.order === 'desc' ?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                            : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {this.props.companies.length ? (
                                <CompaniesList
                                    companies={this.props.companies}
                                    userRole={this.props.loggedUser}
                                    onEditCompany={this.editCompanies}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteCompany={this.props.requestDeleteCompanies}
                                    companyStatus={this.toggleStatus}
                                    activePage={this.props.activePage}
                                    itemsCountPerPage={this.props.itemsCountPerPage}
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
                </div>
            </div>
        );
    }
};

function mapStateToProps(store) {
    return {
        companies: store.companyState.companies,
        loggedUser: store.userState.loggedUser,
        fetching: store.companyState.fetching,
        activePage: store.companyState.activePage,
        itemsCountPerPage: store.companyState.itemsCountPerPage,
        totalItemsCount: store.companyState.totalItemsCount,
        pageRangeDisplayed: store.companyState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestLoggedUser, requestCompanies, requestDeleteCompanies, requestSubmitCompanies, requestUpdateCompanies, requestCompaniesStatus })(CompaniesListContainer);