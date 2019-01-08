import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import EnginesizesList from '../../components/enginesizes/enginesizes';
import store from '../../store';
import { requestEnginesizes, requestDeleteEnginesizes, requestSubmitEnginesizes, requestEnginesizesPages,requestUpdateEnginesizes, requestEnginesizesStatus } from  '../../actions/enginesizes-action';


//COMPONENT
import EnginesizeForm from '../../components/enginesizes/enginesizes-form';
import EditEnginesize from '../../components/enginesizes/enginesizes-edit';

var globalId = null

class EnginesizesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editEnginesizes = this.editEnginesizes.bind(this)
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
        this.props.requestEnginesizes();
    }

    // submit function for new data
    submitEnginesize(values) {
        this.props.requestSubmitEnginesizes(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditEnginesize(values) {
        this.props.requestUpdateEnginesizes(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editEnginesizes(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteEnginesizeAction(enginesizeId) {
        this.props.requestDeleteDrives(enginesizeId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestEnginesizesPages(pageNumber)
        
    }
    
    toggleStatus (enginesizeId, status) {
        console.log('id', enginesizeId)
        console.log('val', status)
        const newEnginesizesStatus = {
            status: !status
        }
        this.props.requestEnginesizesStatus(enginesizeId, newEnginesizesStatus)
    }

    render() {
        console.log('prop', this.props.enginesizes)
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditEnginesize onSubmit = {this.submitEditEnginesize.bind(this)} editId = {globalId} />
                        ): (
                            <EnginesizeForm onSubmit = { this.submitEnginesize.bind(this) }/>
                        )}
                       
                    </div>
                    <div className="col s12 m9 l9">
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
                            {this.props.enginesizes.length ? (
                                <EnginesizesList enginesizes= {this.props.enginesizes} onEditEnginesize = {this.editEnginesizes} deleteEnginesize = {this.props.requestDeleteEnginesizes} enginesizeStatus = {this.toggleStatus}/>

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
        enginesizes: store.enginesizeState.enginesizes,
        message: store.enginesizeState.message,
        activePage: store.enginesizeState.activePage,
        itemsCountPerPage: store.enginesizeState.itemsCountPerPage,
        totalItemsCount: store.enginesizeState.totalItemsCount,
        pageRangeDisplayed: store.enginesizeState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestEnginesizes, requestDeleteEnginesizes, requestSubmitEnginesizes, requestEnginesizesPages,requestUpdateEnginesizes, requestEnginesizesStatus })(EnginesizesListContainer);