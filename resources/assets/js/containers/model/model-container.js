import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import ModelList from '../../components/models/models';
import store from '../../store';
import { requestModel, requestModelPages, requestDeleteModel, requestSubmitModel, requestUpdateModel, requestModelStatus } from  '../../actions/model-action';


//COMPONENT
import ModelForm from '../../components/models/models-form';
import EditModel from '../../components/models/models-edit';
import Loading from '../../components/loading';


var globalId = null

class ModelsListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editModels = this.editModels.bind(this)
    }

    hideMessage (e) {
        e.preventDefault();
        this.setState ({
            hide: false
        })
    }

    componentDidMount() {
        // call action to run the relative saga
        this.props.requestModel();
    }

    // submit function for new data
    submitModel(values) {
        this.props.requestSubmitModel(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditModel(values) {
        this.props.requestUpdateModel(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editModels(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteModelAction(modelId) {
        this.props.requestDeleteModel(modelId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestModelPages(pageNumber)
        
    }
    // toggle status value
    toggleStatus(modelId, status) {
        const newModelStatus = {
            status: !status
        }
        this.props.requestModelStatus(modelId, newModelStatus)
    }
    // renderList() {
    //     if(this.props.fetching) {
    //         return (
    //             <tbody>
    //                 <tr><td></td></tr>
    //             </tbody>
    //         )
    //     } else {
    //         if(this.props.models.length) {
    //             return (
    //                 <ModelList models= {this.props.models} onEditModel = {this.editModels} deleteModel = {this.props.requestDeleteModel} modelStatus = {this.toggleStatus}/>
    //             )
    //         } else {
    //             return (
    //                 <tbody>
    //                     <tr><td>No Results Found !</td></tr>
    //                 </tbody>
    //             )
    //         }
    //     }
    // }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditModel onSubmit = {this.submitEditModel.bind(this)} editId = {globalId} />
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
                        <table>
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Title</th>
                                    <th>Added by</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {/* {this.renderList()} */}
                            {this.props.models.length ? (
                                <ModelList models= {this.props.models} onEditModel = {this.editModels} deleteModel = {this.props.requestDeleteModel} modelStatus = {this.toggleStatus}/>

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
        models: store.modelState.models,
        fetching: store.modelState.fetching,
        activePage: store.modelState.activePage,
        itemsCountPerPage: store.modelState.itemsCountPerPage,
        totalItemsCount: store.modelState.totalItemsCount,
        pageRangeDisplayed: store.modelState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestModel, requestModelPages, requestDeleteModel, requestSubmitModel, requestUpdateModel })(ModelsListContainer);