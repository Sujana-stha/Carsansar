import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import OptionsList from '../../components/options/options';
import store from '../../store';
import { requestOptions, requestDeleteOptions, requestSubmitOptions, requestOptionsPages,requestUpdateOptions, requestOptionsStatus } from  '../../actions/options-actions';


//COMPONENT
import MakeOptions from '../../components/options/options-form';
import EditOptions from '../../components/options/options-edit';
import optionsForm from '../../components/options/options-form';

var globalId = null

class OptionsListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editOptions = this.editOptions.bind(this)
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
        this.props.requestOptions();
    }

    // submit function for new data
    submitOption(values) {
        this.props.requestSubmitOptions(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditOption(values) {
        this.props.requestUpdateOptions(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editOptions(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteOptionAction(optionId) {
        this.props.requestDeleteOptions(optionId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestMakesPages(pageNumber)
        
    }
    
    toggleStatus (optionId, status) {
        console.log('id', optionId)
        console.log('val', status)
        const newOptionsStatus = {
            status: !status
        }
        this.props.requestOptionsStatus(optionId, newOptionsStatus)
    }

    render() {
        console.log('prop', this.props.options)
        return (
            <div>
                {this.props.message.trim().length && this.state.hide ? (
                   
                    <div id="card-alert" className="card green">
                        <div className="card-content white-text">
                            <p>{this.props.message}</p>
                        </div>
                        <button type="button" className="close white-text" data-dismiss="alert" aria-label="Close">
                            <span onClick={this.hideMessage.bind(this)} aria-hidden="true">×</span>
                        </button>
                    </div>
                ): (
                    <div></div>
                )}
                
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditOptions onSubmit = {this.submitEditOption.bind(this)} editId = {globalId} />
                        ): (
                            <optionsForm onSubmit = { this.submitOption.bind(this) }/>
                        )}
                       
                    </div>
                    <div className="col s12 m9 l9">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Title</th>
                                    <th>Categories</th>
                                    <th>Added by</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {this.props.options.length ? (
                                <OptionsList options= {this.props.options} onEdit = {this.editOptions} deleteOption = {this.props.requestDeleteOptions} OptionStatus = {this.toggleStatus}/>

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
        options: store.optionState.options,
        message: store.optionState.message,
        activePage: store.optionState.activePage,
        itemsCountPerPage: store.optionState.itemsCountPerPage,
        totalItemsCount: store.optionState.totalItemsCount,
        pageRangeDisplayed: store.optionState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestOptions, requestDeleteOptions, requestSubmitOptions, requestOptionsPages,requestUpdateOptions, requestOptionsStatus})(OptionsListContainer);