import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import TransmissionList from '../../components/transmission/transmissions';
import store from '../../store';
import { requestTransmissions, requestDeleteTransmission, requestSubmitTransmission, requestTransmissionPages,requestUpdateTransmission, requestTransmissionStatus } from  '../../actions/transmissons-actions';


//COMPONENT
import TransmissionForm from '../../components/transmission/transmission-form';
import EditTransmission from '../../components/transmission/transmission-edit';

var globalId = null

class TransmissionsListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editTransmission = this.editTransmission.bind(this)
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
        this.props.requestTransmissions();
    }

    // submit function for new data
    submitTransmission(values) {
        this.props.requestSubmitTransmission(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditTransmissions(values) {
        this.props.requestUpdateTransmission(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editTransmission(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteTransmissionAction(transmissionId) {
        this.props.requestDeleteTransmission(transmissionId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestTransmissionPages(pageNumber)
        
    }
    
    toggleStatus (transmissionId, status) {
        console.log('id', transmissionId)
        console.log('val', status)
        const newTransmissionStatus = {
            status: !status
        }
        this.props.requestTransmissionStatus(transmissionId, newTransmissionStatus)
    }

    render() {
        console.log('prop', this.props.transmissions)
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
                            <EditTransmission onSubmit = {this.submitEditTransmissions.bind(this)} editId = {globalId} />
                        ): (
                            <TransmissionForm onSubmit = { this.submitTransmission.bind(this) }/>
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
                            {this.props.transmissions.length ? (
                                <TransmissionList transmissions= {this.props.transmissions} onEditTransmission = {this.editTransmission} deleteTransmission = {this.props.requestDeleteTransmission} transmissionStatus = {this.toggleStatus}/>

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
        transmissions: store.transmissionState.transmissions,
        message: store.transmissionState.message,
        activePage: store.transmissionState.activePage,
        itemsCountPerPage: store.transmissionState.itemsCountPerPage,
        totalItemsCount: store.transmissionState.totalItemsCount,
        pageRangeDisplayed: store.transmissionState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestTransmissions, requestDeleteTransmission, requestSubmitTransmission, requestTransmissionPages,requestUpdateTransmission, requestTransmissionStatus })(TransmissionsListContainer);