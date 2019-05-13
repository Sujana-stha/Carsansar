import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import OptionsList from '../../components/options/options';
import store from '../../store';
import { requestOptions, requestDeleteOptions, requestSubmitOptions,requestUpdateOptions, requestOptionsStatus } from  '../../actions/options-actions';
import {requestOptionCategories} from '../../actions/option_cat-action';
import {requestLoggedUser} from '../../actions/users-action';

//COMPONENT
import EditOptions from '../../components/options/options-edit';
import OptionsForm from '../../components/options/options-form';
import Loading from '../../components/loading';


class OptionsListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editOptions = this.editOptions.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const pageNumber = this.props.activePage;
        this.props.requestOptions(pageNumber, sorted_column, order);
        this.props.requestOptionCategories();
        this.props.requestLoggedUser();
    }

    // submit function for new data
    submitOption(values) {
        let formValues = {
            option_desc: values.option_desc.toLowerCase(),
            oc_id: values.oc_id
        } 
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitOptions(formValues, pageNumber, sorted_column, order); 
    }

    // submit function to update data
    submitEditOption(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUpdateOptions(values, pageNumber, sorted_column, order);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editOptions(values) {
        this.setState ({
            isEditing : values
        })
    }

    deleteOptionAction(optionId) {
        this.props.requestDeleteOptions(optionId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestOptions(pageNumber, sorted_column, order)
    }
    
    toggleStatus (optionId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const newOptionsStatus = {
            status: !status
        }
        this.props.requestOptionsStatus(optionId, newOptionsStatus, pageNumber, sorted_column, order)
    }
    deleteItem(id){
        this.setState ({
            confirmText: id
        })
    }
    
    hideDiv() {
        this.setState({confirmText: null})
    }
    sortByColumn(column) {
        const pageNumber = this.props.activePage
        if (column === this.state.sorted_column) {
           this.state.order === 'desc' ? this.setState({order: 'asc'}, ()=>{
               this.props.requestOptions(pageNumber, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestOptions(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc'}, ()=>{
                this.props.requestOptions(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m4 l4 mt-3">
                        {this.state.isEditing ? (
                            <EditOptions onSubmit = {this.submitEditOption.bind(this)} editId = {this.state.isEditing} optionLists = {this.props.optionCategories}/>
                        ): (
                            <OptionsForm onSubmit = { this.submitOption.bind(this) } optionLists = {this.props.optionCategories}/>
                        )}
                       
                    </div>
                    <div className="col s12 m8 l8">
                        {this.props.fetching ? (
                            <Loading/>
                        ): (
                            <div className="wr-not-loading"></div>
                        )}
                        <table className="wr-master-table">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th onClick={()=>this.sortByColumn('option_desc')}>Title
                                        {this.state.order==='desc'?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={()=>this.sortByColumn('oc_id')}>Categories 
                                        {this.state.order==='desc'?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={()=>this.sortByColumn('created_by')}>Added by
                                        {this.state.order==='desc'?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {this.props.options.length ? (
                                <OptionsList 
                                options= {this.props.options} 
                                userRole ={ this.props.loggedUser}
                                onEditOptions = {this.editOptions} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv} 
                                deleteOption = {this.props.requestDeleteOptions} 
                                optionStatus = {this.toggleStatus}
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
        loggedUser: store.userState.loggedUser,
        options: store.optionState.options,
        fetching: store.optionState.fetching,
        activePage: store.optionState.activePage,
        itemsCountPerPage: store.optionState.itemsCountPerPage,
        totalItemsCount: store.optionState.totalItemsCount,
        pageRangeDisplayed: store.optionState.pageRangeDisplayed,
        optionCategories: store.OptCatState.optionCategories
    }
}

export default connect(mapStateToProps, { requestLoggedUser, requestOptions,requestOptionCategories, requestDeleteOptions, requestSubmitOptions,requestUpdateOptions, requestOptionsStatus})(OptionsListContainer);