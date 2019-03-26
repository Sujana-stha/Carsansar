import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import EnginesizesList from '../../components/enginesizes/enginesizes';
import store from '../../store';
import { requestEnginesizes, requestDeleteEnginesizes, requestSubmitEnginesizes,requestUpdateEnginesizes, requestEnginesizesStatus } from  '../../actions/enginesizes-action';


//COMPONENT
import EnginesizeForm from '../../components/enginesizes/enginesizes-form';
import EditEnginesize from '../../components/enginesizes/enginesizes-edit';
import Loading from '../../components/loading';



class EnginesizesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editEnginesizes = this.editEnginesizes.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }
    
    componentDidMount() {
        // call action to run the relative saga
        const page = this.props.activePage;
        this.props.requestEnginesizes(page);
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
        const page = this.props.activePage;
        this.props.requestUpdateEnginesizes(values, page);
        this.setState({
            isEditing : false,
           
        })
    }

    //function to call form of edit
    editEnginesizes(values) {
        
        this.setState ({
            isEditing : values
        })
        
    }

    deleteEnginesizeAction(enginesizeId) {
        this.props.requestDeleteDrives(enginesizeId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestEnginesizes(pageNumber)
        
    }
    
    toggleStatus (enginesizeId, status) {
        const page = this.props.activePage;       
        const newEnginesizesStatus = {
            status: !status
        }
        this.props.requestEnginesizesStatus(enginesizeId, newEnginesizesStatus, page)
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
                        {this.state.isEditing ? (
                            <EditEnginesize onSubmit = {this.submitEditEnginesize.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <EnginesizeForm onSubmit = { this.submitEnginesize.bind(this) }/>
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
        fetching: store.enginesizeState.fetching,
        activePage: store.enginesizeState.activePage,
        itemsCountPerPage: store.enginesizeState.itemsCountPerPage,
        totalItemsCount: store.enginesizeState.totalItemsCount,
        pageRangeDisplayed: store.enginesizeState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestEnginesizes, requestDeleteEnginesizes, requestSubmitEnginesizes,requestUpdateEnginesizes, requestEnginesizesStatus })(EnginesizesListContainer);