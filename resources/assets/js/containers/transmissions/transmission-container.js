import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import TransmissionList from '../../components/transmission/transmissions';
import store from '../../store';
import { requestTransmissions, requestDeleteTransmission, requestSubmitTransmission, requestTransmissionPages,requestUpdateTransmission, requestTransmissionStatus } from  '../../actions/transmissons-actions';


//COMPONENT
import TransmissionForm from '../../components/transmission/transmission-form';
import EditTransmission from '../../components/transmission/transmission-edit';
import Loading from '../../components/loading';


class TransmissionsListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editTransmission = this.editTransmission.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        this.props.requestTransmissions();
    }

    // submit function for new data
    submitTransmission(values) {
        this.props.requestSubmitTransmission(values);
    }

    // submit function to update data
    submitEditTransmissions(values) {
        const page = this.props.activePage;
        this.props.requestUpdateTransmission(values, page);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editTransmission(values) {

        this.setState ({
            isEditing : values
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
        const page = this.props.activePage;
        const newTransmissionStatus = {
            status: !status
        }
        this.props.requestTransmissionStatus(transmissionId, newTransmissionStatus, page)
    }
    
    render() {
        return (
            <div>
                
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditTransmission onSubmit = {this.submitEditTransmissions.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <TransmissionForm onSubmit = { this.submitTransmission.bind(this) }/>
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
        fetching: store.transmissionState.fetching,
        activePage: store.transmissionState.activePage,
        itemsCountPerPage: store.transmissionState.itemsCountPerPage,
        totalItemsCount: store.transmissionState.totalItemsCount,
        pageRangeDisplayed: store.transmissionState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestTransmissions, requestDeleteTransmission, requestSubmitTransmission, requestTransmissionPages,requestUpdateTransmission, requestTransmissionStatus })(TransmissionsListContainer);