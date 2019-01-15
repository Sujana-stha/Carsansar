import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import OptionsList from '../../components/options/options';
import store from '../../store';
import { requestOptions, requestDeleteOptions, requestSubmitOptions, requestOptionsPages,requestUpdateOptions, requestOptionsStatus } from  '../../actions/options-actions';
import {requestOptionCategories} from '../../actions/option_cat-action';

//COMPONENT
import EditOptions from '../../components/options/options-edit';
import OptionsForm from '../../components/options/options-form';
import Loading from '../../components/loading';


class OptionsListContainer extends Component {
    constructor() {
        super();
        this.state= {
           
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
        this.props.requestOptionCategories();
    }

    // submit function for new data
    submitOption(values) {
        this.props.requestSubmitOptions(values); 
    }

    // submit function to update data
    submitEditOption(values) {
        const page = this.props.activePage;
        this.props.requestUpdateOptions(values, page);
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
        this.props.requestOptionsPages(pageNumber)
        
    }
    
    toggleStatus (optionId, status) {
        const page = this.props.activePage;
        const newOptionsStatus = {
            status: !status
        }
        this.props.requestOptionsStatus(optionId, newOptionsStatus, page)
    }
    // renderList() {
    //     if(this.props.fetching) {
    //         return (
    //             <tbody>
    //                 <tr><td></td></tr>
    //             </tbody>
    //         )
    //     } else {
    //         if(this.props.options.length) {
    //             return (
    //                 <OptionsList options= {this.props.options} onEditOptions = {this.editOptions} deleteOption = {this.props.requestDeleteOptions} OptionStatus = {this.toggleStatus}/>
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
                            <EditOptions onSubmit = {this.submitEditOption.bind(this)} editId = {this.state.isEditing} optionLists = {this.props.optionCategories}/>
                        ): (
                            <OptionsForm onSubmit = { this.submitOption.bind(this) } optionLists = {this.props.optionCategories}/>
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
                                    <th>Categories</th>
                                    <th>Added by</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {this.props.options.length ? (
                                <OptionsList options= {this.props.options} onEditOptions = {this.editOptions} deleteOption = {this.props.requestDeleteOptions} optionStatus = {this.toggleStatus}/>

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
        fetching: store.optionState.fetching,
        activePage: store.optionState.activePage,
        itemsCountPerPage: store.optionState.itemsCountPerPage,
        totalItemsCount: store.optionState.totalItemsCount,
        pageRangeDisplayed: store.optionState.pageRangeDisplayed,
        optionCategories: store.OptCatState.optionCategories
    }
}

export default connect(mapStateToProps, {requestOptions,requestOptionCategories, requestDeleteOptions, requestSubmitOptions, requestOptionsPages,requestUpdateOptions, requestOptionsStatus})(OptionsListContainer);