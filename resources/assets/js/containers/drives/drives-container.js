import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import MakesList from '../../components/drives/drives';
import store from '../../store';
import { requestDrives, requestDeleteDrives, requestSubmitDrives, requestDrivesPages,requestUpdateDrives, requestDrivesStatus } from  '../../actions/drives-action';


//COMPONENT
import DriveForm from '../../components/drives/drives-form';
import EditDrive from '../../components/drives/drives-edit';

var globalId = null

class DrivesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editDrives = this.editDrives.bind(this)
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
        this.props.requestDrives();
    }

    // submit function for new data
    submitDrive(values) {
        this.props.requestSubmitDrives(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditDrive(values) {
        this.props.requestUpdateDrives(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editDrives(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteDriveAction(driveId) {
        this.props.requestDeleteDrives(driveId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestDrivesPages(pageNumber)
        
    }
    
    toggleStatus (driveId, status) {
        console.log('id', driveId)
        console.log('val', status)
        const newDrivesStatus = {
            status: !status
        }
        this.props.requestDrivesStatus(driveId, newDrivesStatus)
    }

    render() {
        console.log('prop', this.props.drives)
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditDrive onSubmit = {this.submitEditDrive.bind(this)} editId = {globalId} />
                        ): (
                            <DriveForm onSubmit = { this.submitDrive.bind(this) }/>
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
                            {this.props.drives.length ? (
                                <MakesList drives= {this.props.drives} onEditDrive = {this.editDrives} deleteDrive = {this.props.requestDeleteDrives} driveStatus = {this.toggleStatus}/>

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
        drives: store.driveState.drives,
        message: store.driveState.message,
        activePage: store.driveState.activePage,
        itemsCountPerPage: store.driveState.itemsCountPerPage,
        totalItemsCount: store.driveState.totalItemsCount,
        pageRangeDisplayed: store.driveState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestDrives, requestDeleteDrives, requestSubmitDrives, requestDrivesPages,requestUpdateDrives, requestDrivesStatus})(DrivesListContainer);