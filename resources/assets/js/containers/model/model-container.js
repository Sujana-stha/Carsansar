import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import ModelList from '../../components/models/models';
import store from '../../store';
import { requestModel, requestDeleteModel, requestSubmitModel, requestUpdateModel, requestModelStatus } from  '../../actions/model-action';
import {requestLoggedUser} from '../../actions/users-action';

//COMPONENT
import ModelForm from '../../components/models/models-form';
import EditModel from '../../components/models/models-edit';
import Loading from '../../components/loading';

class ModelsListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc',
            current_page: 1
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editModels = this.editModels.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
    }
    
    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestModel(pageNumber, sorted_column, order);
        this.props.requestLoggedUser();
    }

    // submit function for new data
    submitModel(values) {
        let formValues = {
            model_desc: values.model_desc.toLowerCase()
        }
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitModel(formValues, pageNumber, sorted_column, order);
    }

    // submit function to update data
    submitEditModel(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUpdateModel(values, pageNumber, sorted_column, order);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editModels(values) {
        this.setState ({
            isEditing : values
        })
        
    }

    deleteModelAction(modelId) {
        this.props.requestDeleteModel(modelId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestModel(pageNumber, sorted_column, order)
        
    }
    // toggle status value
    toggleStatus(modelId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const newModelStatus = {
            status: !status
        }
        this.props.requestModelStatus(modelId, newModelStatus, pageNumber, sorted_column, order);
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
        if (column === this.state.sorted_column) {
           this.state.order === 'desc' ? this.setState({order: 'asc'}, ()=>{
               this.props.requestModel(this.state.current_page, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestModel(this.state.current_page, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc', current_page: 1}, ()=>{
                this.props.requestModel(this.state.current_page, this.state.sorted_column, this.state.order)
            })
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
                        {this.state.isEditing ? (
                            <EditModel onSubmit = {this.submitEditModel.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <ModelForm onSubmit = { this.submitModel.bind(this) }/>
                        )}
                       
                    </div>
                    <div className="col s12 m9 l9">
                        {this.props.fetching ? (
                            <Loading/>
                        ): (
                            <div className="wr-not-loading"></div>
                        )}
                        <table className="wr-master-table">
                            <thead>
                                <tr>
                                    <th>S.N </th>
                                    <th onClick={()=>this.sortByColumn('model_desc')}>Title
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
                            {this.props.models.length ? (
                                <ModelList 
                                models= {this.props.models} 
                                userRole ={ this.props.loggedUser}
                                onEditModel = {this.editModels} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv} 
                                deleteModel = {this.props.requestDeleteModel} 
                                modelStatus = {this.toggleStatus}
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
        models: store.modelState.models,
        fetching: store.modelState.fetching,
        activePage: store.modelState.activePage,
        itemsCountPerPage: store.modelState.itemsCountPerPage,
        totalItemsCount: store.modelState.totalItemsCount,
        pageRangeDisplayed: store.modelState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestLoggedUser, requestModel, requestDeleteModel, requestSubmitModel, requestUpdateModel, requestModelStatus })(ModelsListContainer);