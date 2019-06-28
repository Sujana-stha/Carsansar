import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import DrivesList from '../../components/drives/drives';
import store from '../../store';
import { requestDrives, requestDeleteDrives, requestSubmitDrives,requestUpdateDrives, requestDrivesStatus } from  '../../actions/drives-action';
import {requestLoggedUser} from '../../actions/users-action';

//COMPONENT
import DriveForm from '../../components/drives/drives-form';
import EditDrive from '../../components/drives/drives-edit';
import Loading from '../../components/loading';


class DrivesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editDrives = this.editDrives.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative 
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestDrives(pageNumber, sorted_column, order);
        this.props.requestLoggedUser();
    }

    // submit function for new data
    submitDrive(values) {
        let formValues = {
            drive_desc: values.drive_desc.toLowerCase()
        }
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitDrives(formValues, pageNumber, sorted_column, order);
        
    }

    // submit function to update data
    submitEditDrive(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        values.drive_desc = values.drive_desc.toLowerCase()

        this.props.requestUpdateDrives(values, pageNumber, sorted_column, order);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editDrives(values) {
        this.setState ({
            isEditing : values
        })
    }

    deleteDriveAction(driveId) {
        this.props.requestDeleteDrives(driveId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestDrives(pageNumber, sorted_column, order)
    }
    
    toggleStatus (driveId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const newDrivesStatus = {
            status: !status
        }
        this.props.requestDrivesStatus(driveId, newDrivesStatus, pageNumber, sorted_column, order);
    }
    deleteItem(id){
        this.setState ({
            confirmText: id
        })
    }
    
    hideDiv() {
        this.setState({confirmText: null})
    }
    sortByColumn(column) {
        const pageNumber = this.props.activePage
        if (column === this.state.sorted_column) {
           this.state.order === 'desc' ? this.setState({order: 'asc'}, ()=>{
               this.props.requestDrives(pageNumber, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestDrives(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc'}, ()=>{
                this.props.requestDrives(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
                        {this.state.isEditing ? (
                            <EditDrive onSubmit = {this.submitEditDrive.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <DriveForm onSubmit = { this.submitDrive.bind(this) }/>
                        )}
                       
                    </div>
                    <div className="col s12 m9 l9">
                        {this.props.fetching ? (
                            <Loading/>
                        ): (
                            <div className="wr-not-loading"></div>
                        )}
                        <table className="wr-master-table">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th onClick={()=>this.sortByColumn('drive_desc')}>Title
                                        {this.state.order==='desc'?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={()=>this.sortByColumn('created_by')}>Added by
                                        {this.state.order==='desc'?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            
                            {this.props.drives.length ? (
                                <DrivesList 
                                drives= {this.props.drives} 
                                userRole ={ this.props.loggedUser}
                                onEditDrive = {this.editDrives} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv} 
                                deleteDrive = {this.props.requestDeleteDrives} 
                                driveStatus = {this.toggleStatus}
                                activePage={this.props.activePage}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                />

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
        loggedUser: store.userState.loggedUser,
        drives: store.driveState.drives,
        fetching: store.driveState.fetching,
        activePage: store.driveState.activePage,
        itemsCountPerPage: store.driveState.itemsCountPerPage,
        totalItemsCount: store.driveState.totalItemsCount,
        pageRangeDisplayed: store.driveState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestLoggedUser, requestDrives, requestDeleteDrives, requestSubmitDrives,requestUpdateDrives, requestDrivesStatus})(DrivesListContainer);