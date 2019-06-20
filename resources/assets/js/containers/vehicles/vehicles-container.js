import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import * as api from '../../api/deals-api';
import * as optCatapi from '../../api/option_cat-api';
import Pagination from "react-js-pagination";
import { requestVehicles, searchVehicleByTitle, requestSubmitVehicle } from '../../actions/deals-action'
import {requestLoggedUser} from '../../actions/users-action';
import { connect } from 'react-redux';

//COMPONENTS
import VehicleLists from '../../components/vehicles/vehicles-listing';
// import VehicleSearchComponent from '../../components/vehicles/vehicles-search-form';
import Loading from '../../components/loading';
import EditVehicleForm from '../../components/vehicles/edit-vehicle-form';
import InsertVehicle from '../../components/vehicles/insert-vehicle-form';

class VehiclesListingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            filtered: [],
            keyword: '',
            confirmText: null,
            sorted_column: 'id',
            order: 'desc',
            isEditing: false,
            makes: [],
			categories: [],
			models:{},
			bodies: {},
			enginesizes:{},
			transmissions: {},
			colors: {},
			fueltypes: {},
			drives: {},
			options: [],
			optCategories: []
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
        this.editVehicle = this.editVehicle.bind(this)
    }
    componentDidMount() {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestVehicles(pageNumber, sorted_column, order);
        this.props.requestLoggedUser();
        api.getMakesList().then((response)=> {
			this.setState({ makes: response.data })
		})
		api.getModelsList().then((response) => {
			this.setState({ models: response.data })
		})
		api.getBodiesList().then((response) => {
			this.setState({ bodies: response.data })
		})
		api.getEnginesizeList().then((response) => {
			this.setState({ enginesizes: response.data })
		})
		api.getTransmissionList().then((response) => {
			this.setState({ transmissions: response.data })
		})
		api.getColorsList().then((response)=> {
			this.setState({ colors: response.data })
		})
		api.getFueltypesList().then((response)=> {
			this.setState({ fueltypes: response.data })
		})
		api.getDRivesist().then((response)=> {
			this.setState({drives: response.data })
		})
		api.getCategoriesList().then((response)=> {
			this.setState({categories: response.data})
		})
		api.getOptionsList().then((response)=> {
			this.setState({options: response.data})
		})
		optCatapi.getOptionsCategories().then((response) => {
			this.setState({optCategories: response.data})
		})
    }
    toggleStatus (vehicleId, status) {
        const newVehicleStatus = {
            status: !status
        }
        console.log('id=>',vehicleId)
        console.log('status=>', newVehicleStatus)
    }
    //submit vehicle form
    onSubmitForm(values) {
        this.props.requestSubmitVehicle(values);
    }

    // edit functions
    editVehicle(values) {
        console.log('vehicle-id', values)
        this.setState ({
            isEditing : values
        })
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
        console.log('vehicles-props',this.props)
        if(this.props.match.path === "/dashboard/edit-vehicle") {
            return (
                <EditVehicleForm editId= {this.state.isEditing}/>
            )
        } else if(this.props.match.path ==="/dashboard/insert-vehicle") {
            return (
                <div>
                    <div className="row">
                        <div className="col s12 mt-2 mb-2 right-align">
                            <NavLink to="/dashboard/vehicles" className="btn waves-effect waves-light"><i className="material-icons left">view_list</i><span> All Vehicles</span></NavLink>
                        </div>
                    </div>
                    <h4 className="header2">Add New Vehicle</h4>
                    <InsertVehicle 
                    makes={this.state.makes}
                    models={this.state.models}
                    categories={this.state.categories}
                    colors={this.state.colors}
                    drives={this.state.drives}
                    enginesizes={this.state.enginesizes}
                    fueltypes={this.state.fueltypes}
                    bodies={this.state.bodies}
                    transmissions={this.state.transmissions}
                    options={this.state.options}
                    optCategories={this.state.optCategories}
                    onSubmit={this.onSubmitForm.bind(this)}
                    />
                </div>
            )
        } else {
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
                            onEdit = {this.editVehicle} 
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

export default connect(mapStateToProps, { requestLoggedUser, requestVehicles, searchVehicleByTitle, requestSubmitVehicle })(VehiclesListingContainer);