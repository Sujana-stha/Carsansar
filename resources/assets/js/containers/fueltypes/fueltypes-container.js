import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import FueltypesList from '../../components/fueltypes/fueltypes';
import store from '../../store';
import { requestFueltypes, requestDeleteFueltypes, requestSubmitFueltypes,requestUpdateFueltypes, requestFueltypesStatus } from  '../../actions/fueltypes-action';


//COMPONENT
import FueltypeForm from '../../components/fueltypes/fueltypes-form';
import EditFueltype from '../../components/fueltypes/fueltypes-edit';
import Loading from '../../components/loading';


class FueltypesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editFueltype = this.editFueltype.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestFueltypes(pageNumber, sorted_column, order);
    }

    // submit function for new data
    submitFueltype(values) {
        let formValues = {
            fueltype_desc: values.fueltype_desc.toLowerCase()
        }
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitFueltypes(formValues, pageNumber,sorted_column, order);
    }

    // submit function to update data
    submitEditFueltypes(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUpdateFueltypes(values, pageNumber, sorted_column, order);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editFueltype(values) {
        this.setState ({
            isEditing : values
        }) 
    }

    deleteFueltypeAction(fueltypeId) {
        this.props.requestDeleteFueltypes(fueltypeId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestFueltypes(pageNumber, sorted_column, order)
    }
    
    toggleStatus (fueltypeId, status) {
        const pageNumber = this.props.activePage; 
        let sorted_column = this.state.sorted_column
        let order = this.state.order      
        const newFueltypeStatus = {
            status: !status
        }
        this.props.requestFueltypesStatus(fueltypeId, newFueltypeStatus, pageNumber, sorted_column, order)
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
               this.props.requestFueltypes(pageNumber, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestFueltypes(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc'}, ()=>{
                this.props.requestFueltypes(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
                        {this.state.isEditing ? (
                            <EditFueltype onSubmit = {this.submitEditFueltypes.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <FueltypeForm onSubmit = { this.submitFueltype.bind(this) }/>
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
                                    <th onClick={()=>this.sortByColumn('fueltype_desc')}>Title
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
                            {this.props.fueltypes.length ? (
                                <FueltypesList 
                                fueltypes= {this.props.fueltypes} 
                                onEditFueltype = {this.editFueltype} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv} 
                                deleteFueltype = {this.props.requestDeleteFueltypes} 
                                fueltypeStatus = {this.toggleStatus}
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
        fueltypes: store.fueltypeState.fueltypes,
        fetching: store.fueltypeState.fetching,
        activePage: store.fueltypeState.activePage,
        itemsCountPerPage: store.fueltypeState.itemsCountPerPage,
        totalItemsCount: store.fueltypeState.totalItemsCount,
        pageRangeDisplayed: store.fueltypeState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestFueltypes, requestDeleteFueltypes, requestSubmitFueltypes,requestUpdateFueltypes, requestFueltypesStatus })(FueltypesListContainer);