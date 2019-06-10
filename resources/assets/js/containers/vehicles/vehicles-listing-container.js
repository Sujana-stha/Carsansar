import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import * as api from '../../api/deals-api';
import Pagination from "react-js-pagination";
import { requestVehicles, searchVehicleByTitle } from '../../actions/deals-action'
import {requestLoggedUser} from '../../actions/users-action';
import { connect } from 'react-redux';

//COMPONENTS
import VehicleLists from '../../components/vehicles/vehicles-listing';
// import VehicleSearchComponent from '../../components/vehicles/vehicles-search-form';
import Loading from '../../components/loading';

class VehiclesListingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            filtered: [],
            keyword: '',
            confirmText: null,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
    }
    componentDidMount() {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestVehicles(pageNumber, sorted_column, order);
        this.props.requestLoggedUser();
    }
    toggleStatus (vehicleId, status) {
        const newVehicleStatus = {
            status: !status
        }
        console.log('id=>',vehicleId)
        console.log('status=>', newVehicleStatus)
    }
    
    deleteItem(id){
        this.setState ({
            confirmText: id
        })
    }
    
    hideDiv() {
        this.setState({confirmText: null})
    }
    
    searchVehicle(event) {
        const keyword = event.target.value
        if(keyword !== '') {
            const list = this.props.vehicles.filter((vehicle) => {
                return (
                    vehicle.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                    // vehicle.type.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
                    // vehicle.stock_number.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                )
            })
            this.setState({keyword})
            this.props.searchVehicleByTitle(list)
        } else {
            this.setState({keyword})
            this.props.requestVehicles()
        }
    }
     // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestVehicles(pageNumber, sorted_column, order)
    }
    sortByColumn(column) {
        const pageNumber = this.props.activePage
        if (column === this.state.sorted_column) {
           this.state.order === 'desc' ? this.setState({order: 'asc'}, ()=>{
               this.props.requestVehicles(pageNumber, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestVehicles(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc'}, ()=>{
                this.props.requestVehicles(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }
    
    render() {
        console.log('thi',this.props)
        return (
            <div>
                <div className="row">
                    <div className="col s12 m4 mt-4 mb-2 left-align">
                        <input value={this.state.keyword}
                        type="text"
                        placeholder="Search Title.."
                        className="wr-vehicles-search-input"
                        onChange={e => this.searchVehicle(e)}
                        />
                    </div>
					<div className="col s12 m8 mt-4 mb-2 right-align">
						<NavLink to="/dashboard/insert-vehicle" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add Vehicle</span></NavLink>
					</div>
                    
				</div>
                {/* <div className="row">
                    <VehicleSearchComponent vehicles={this.props.vehicles}/>                        
                </div> */}
                {this.props.fetching ? (
                    <Loading/>
                ): (
                    <div className="wr-not-loading"></div>
                )}
                <div className="wr-vehicles-table-wrapper">
                    <table className="bordered responsive-table">
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th className="wr-vehicles-title" onClick={()=>this.sortByColumn('title')}>Title
                                    {this.state.order==='desc'?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                    :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th onClick={()=>this.sortByColumn('stock_number')}>Stock #
                                    {this.state.order==='desc'?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                    :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th onClick={()=>this.sortByColumn('price')}>Price
                                    {this.state.order==='desc'?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                    :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th onClick={()=>this.sortByColumn('vehicle_status')}>Condition
                                    {this.state.order==='desc'?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                    :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                {/* <th>Type</th> */}
                                <th>Image</th>
                                <th onClick={()=>this.sortByColumn('created_by')}>Added By
                                    {this.state.order==='desc'?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                    :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th className="wr-vehicles-date" onClick={()=>this.sortByColumn('created_at')}>Date
                                    {this.state.order==='desc'?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                    :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {this.props.vehicles.length ? (
                            <VehicleLists vehicles={this.props.vehicles}
                            userRole ={ this.props.loggedUser}
                            confirmText={this.state.confirmText} 
                            showConfirmBox={this.deleteItem} 
                            hideConfirmBox={this.hideDiv}
                            vehicleStatus = {this.toggleStatus}
                            />
                        ) : (
                            <tbody>
                                <tr>
                                    <td>No Results Found !</td>
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
        );
    }
}

function mapStateToProps(store) {
    return {
        loggedUser: store.userState.loggedUser,
        vehicles: store.dealState.vehicleList,
        fetching: store.dealState.fetching,
        activePage: store.dealState.activePage,
        itemsCountPerPage: store.dealState.itemsCountPerPage,
        totalItemsCount: store.dealState.totalItemsCount,
        pageRangeDisplayed: store.dealState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestLoggedUser, requestVehicles, searchVehicleByTitle })(VehiclesListingContainer);