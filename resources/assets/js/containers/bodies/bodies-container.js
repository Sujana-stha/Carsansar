import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import BodiesList from '../../components/bodies/bodies';
import store from '../../store';
import { requestBodies, requestDeleteBodies, requestSubmitBodies,requestUpdateBodies, requestBodiesStatus } from  '../../actions/bodies-action';


//COMPONENT
import BodyForm from '../../components/bodies/bodies-form';
import EditBody from '../../components/bodies/bodies-edit';
import Loading from '../../components/loading';

class BodiesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editBodies = this.editBodies.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const page = this.props.activePage;
        this.props.requestBodies(page);
    }

    // submit function for new data
    submitBody(values) {
        this.props.requestSubmitBodies(values);
    }

    // submit function to update data
    submitEditBody(values) {
        const page = this.props.activePage;
        this.props.requestUpdateBodies(values, page);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editBodies(values) {
        this.setState ({
            isEditing : values
        })
        
    }

    deleteBodyAction(bodyId) {
        this.props.requestDeleteBodies(bodyId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestBodies(pageNumber)
    }
    
    toggleStatus (bodyId, status) {
        const page = this.props.activePage;

        const newBodyStatus = {
            status: !status
        }
        this.props.requestBodiesStatus(bodyId, newBodyStatus, page)
    }
    
    render() {
        return (
            <div>
                
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
                        {this.state.isEditing ? (
                            <EditBody onSubmit = {this.submitEditBody.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <BodyForm onSubmit = { this.submitBody.bind(this) }/>
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
                            {this.props.bodies.length ? (
                                <BodiesList bodies= {this.props.bodies} onEditBody = {this.editBodies} deleteBody = {this.props.requestDeleteBodies} bodyStatus = {this.toggleStatus}/>

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
        bodies: store.bodyState.bodies,
        fetching: store.bodyState.fetching,
        activePage: store.bodyState.activePage,
        itemsCountPerPage: store.bodyState.itemsCountPerPage,
        totalItemsCount: store.bodyState.totalItemsCount,
        pageRangeDisplayed: store.bodyState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestBodies, requestDeleteBodies, requestSubmitBodies,requestUpdateBodies, requestBodiesStatus})(BodiesListContainer);