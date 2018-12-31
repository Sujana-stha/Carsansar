import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import BodiesList from '../../components/bodies/bodies';
import store from '../../store';
import { requestBodies, requestDeleteBodies, requestSubmitBodies, requestBodiesPages,requestUpdateBodies, requestBodiesStatus } from  '../../actions/bodies-action';


//COMPONENT
import BodyForm from '../../components/bodies/bodies-form';
import EditBody from '../../components/bodies/bodies-edit';

var globalId = null

class BodiesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editBodies = this.editBodies.bind(this)
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
        this.props.requestBodies();
    }

    // submit function for new data
    submitBody(values) {
        this.props.requestSubmitBodies(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditBody(values) {
        this.props.requestUpdateBodies(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editBodies(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteBodyAction(makeId) {
        this.props.requestDeleteBodies(bodyId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestBodiesPages(pageNumber)
        
    }
    
    toggleStatus (bodyId, status) {
        console.log('id', bodyId)
        console.log('val', status)
        const newBodyStatus = {
            status: !status
        }
        this.props.requestBodiesStatus(bodyId, newBodyStatus)
    }

    render() {
        console.log('prop', this.props.bodies)
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
                            <EditBody onSubmit = {this.submitEditBody.bind(this)} editId = {globalId} />
                        ): (
                            <BodyForm onSubmit = { this.submitBody.bind(this) }/>
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
        message: store.bodyState.message,
        activePage: store.bodyState.activePage,
        itemsCountPerPage: store.bodyState.itemsCountPerPage,
        totalItemsCount: store.bodyState.totalItemsCount,
        pageRangeDisplayed: store.bodyState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestBodies, requestDeleteBodies, requestSubmitBodies, requestBodiesPages,requestUpdateBodies, requestBodiesStatus})(BodiesListContainer);