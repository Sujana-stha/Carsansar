import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
// import { NavLink } from 'react-router-dom';
import CompaniesList from '../../components/companies/companies';
import store from '../../store';
import { requestCompanies, requestDeleteCompanies, requestSubmitCompanies, requestCompaniesPages,requestUpdateCompanies, requestCompaniesStatus } from  '../../actions/companies-action';


//COMPONENT
import CompanyForm from '../../components/companies/companies-form';
import EditCompany from '../../components/companies/companies-edit';

var globalId = null

class CompaniesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editCompanies = this.editCompanies.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }

    hideMessage (e) {
        e.preventDefault();
        this.setState ({
            hide: false
        })
    }

    componentDidMount() {
        // call action to run the relative saga
        this.props.requestCompanies();
    }

    // submit function for new data
    submitCompany(values) {
        this.props.requestSubmitCompanies(values);
        this.setState ({
            hide: true
        });
        $('.collapsible').collapsible('close', 0);

    }

    // submit function to update data
    submitEditCompany(values) {
        this.props.requestUpdateCompanies(values);
        this.setState({
            isEditing : false,
            hide: true
        });
        $('.collapsible').collapsible('close', 0);

    }

    //function to call form of edit
    editCompanies(values) {
        $('.collapsible').collapsible('open', 0);
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteCompanyAction(companyId) {
        this.props.requestDeleteCompanies(companyId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestCompaniesPages(pageNumber)
        
    }
    
    toggleStatus (companyId, status) {
        console.log('id', companyId)
        console.log('val', status)
        const newCompanyStatus = {
            status: !status
        }
        this.props.requestCompaniesStatus(companyId, newCompanyStatus)
    }

    render() {
        console.log('prop', this.props.companies)
        return (
            <div>
                <div className="row">
                    <ul className="collapsible collapsible-accordion" data-collapsible="accordion">
                        
                            {this.state.isEditing ? (
                                <li>
                                    <div className="collapsible-header">
                                        <a className="btn right"><i className="material-icons left">add</i><span> Update Color</span></a>
                                    </div>
                                    <div className="collapsible-body col s12 m12 l12">
                                        <EditCompany onSubmit = {this.submitEditCompany.bind(this)} editId = {globalId} />
                                    </div>
                                </li>

                            ) : (
                                <li>
                                    <div className="collapsible-header">
                                        <a className="btn right waves-effect waves-light"><i className="material-icons left">add</i><span> Add Company</span></a>
                                    </div>
                                    <div className="collapsible-body col s12 m12 l12">
                                        <CompanyForm onSubmit = { this.submitCompany.bind(this) }/>
                                    </div>
                                </li>
                            )}
                    </ul>
                    <div className="col s12 m12 l12 mt-2 mb-2">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Company Code</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Added by</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {this.props.companies.length ? (
                                <CompaniesList companies= {this.props.companies} onEditCompany = {this.editCompanies} deleteCompany = {this.props.requestDeleteCompanies} companyStatus = {this.toggleStatus}/>

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
        message: store.companyState.message,
        activePage: store.companyState.activePage,
        itemsCountPerPage: store.companyState.itemsCountPerPage,
        totalItemsCount: store.companyState.totalItemsCount,
        pageRangeDisplayed: store.companyState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestCompanies, requestDeleteCompanies, requestSubmitCompanies, requestCompaniesPages,requestUpdateCompanies, requestCompaniesStatus})(CompaniesListContainer);