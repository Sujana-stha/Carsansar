import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import TransmissionList from '../../components/transmission/transmissions';
import store from '../../store';
import { requestTransmissions, requestDeleteTransmission, requestSubmitTransmission,requestUpdateTransmission, requestTransmissionStatus } from  '../../actions/transmissons-actions';


//COMPONENT
import TransmissionForm from '../../components/transmission/transmission-form';
import EditTransmission from '../../components/transmission/transmission-edit';
import Loading from '../../components/loading';


class TransmissionsListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editTransmission = this.editTransmission.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestTransmissions(pageNumber, sorted_column, order);
    }

    // submit function for new data
    submitTransmission(values) {
        let formValues = { 
            transmission_desc : values.transmission_desc.toLowerCase()
        }
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitTransmission(formValues, pageNumber, sorted_column, order);
    }

    // submit function to update data
    submitEditTransmissions(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUpdateTransmission(values, pageNumber, sorted_column, order);
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
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestTransmissions(pageNumber, sorted_column, order)
    }
    
    toggleStatus (transmissionId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const newTransmissionStatus = {
            status: !status
        }
        this.props.requestTransmissionStatus(transmissionId, newTransmissionStatus, pageNumber, sorted_column, order)
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
               this.props.requestTransmissions(pageNumber, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestTransmissions(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc'}, ()=>{
                this.props.requestTransmissions(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }
    
    render() {
        return (
            <div>
                
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
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
                        <table className="wr-master-table">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th onClick={()=>this.sortByColumn('transmission_desc')}>Title
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
                            {this.props.transmissions.length ? (
                                <TransmissionList 
                                transmissions= {this.props.transmissions} 
                                onEditTransmission = {this.editTransmission} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv} 
                                deleteTransmission = {this.props.requestDeleteTransmission} 
                                transmissionStatus = {this.toggleStatus}
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
        transmissions: store.transmissionState.transmissions,
        fetching: store.transmissionState.fetching,
        activePage: store.transmissionState.activePage,
        itemsCountPerPage: store.transmissionState.itemsCountPerPage,
        totalItemsCount: store.transmissionState.totalItemsCount,
        pageRangeDisplayed: store.transmissionState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestTransmissions, requestDeleteTransmission, requestSubmitTransmission,requestUpdateTransmission, requestTransmissionStatus })(TransmissionsListContainer);