import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import * as api from '../../api/deals-api';
import { requestVehicles } from '../../actions/deals-action'
import { connect } from 'react-redux';

//COMPONENTS
import VehicleLists from '../../components/vehicles/vehicles-listing';
import VehicleSearchComponent from '../../components/vehicles/vehicles-search-form';

class VehiclesListingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            filtered: [],
            keyword: ''
        }
    }
    componentDidMount() {
        this.props.requestVehicles();
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
            this.setState({
                filtered: list,
                keyword
            })
        } else {
            this.setState({
                filtered: this.props.vehicles,
                keyword
            })
        }
    }
    render() {
        console.log('veh', this.props.vehicles)
        return (
            <div>
                <div className="row">
                    {/* <div className="col s12 m4 mt-2 mb-2 left-align">
                        <input value={this.state.keyword}
                        type="text"
                        placeholder="Search Title.."
                        onChange={e=>this.searchVehicle(e)}
                        />
                    </div> */}
					<div className="col s12 m12 mt-2 mb-2 right-align">
						<NavLink to="/dashboard/insert-vehicle" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add Vehicle</span></NavLink>
					</div>
                    
				</div>
                <div className="row">
                    <VehicleSearchComponent vehicles={this.props.vehicles}/>                        
                </div>
                <div className="wr-vehicles-table-wrapper">
                    <table className="bordered responsive-table">
                        <thead>
                            <tr>
                                <th className="wr-vehicle-sn">S.N</th>
                                <th >Title</th>
                                <th className="wr-vehicle-price">VI</th>
                                <th className="wr-vehicle-stock_number">Stock Number</th>
                                <th className="wr-vehicle-price">Price</th>
                                <th>Vehicle Status</th>
                                <th>Category</th>
                                <th className="wr-vehicle-stock_number">Make</th>
                                <th className="wr-vehicle-stock_number">Model</th>
                                <th className="wr-vehicle-price">Year</th>
                                <th>Drive</th>
                                <th>Engines</th>
                                <th>Transmission</th>
                                <th>Fueltype</th>
                                <th className="wr-vehicle-price">Warranty</th>
                                <th>Option</th>
                                <th className="wr-vehicle-price">Body</th>
                                <th>Manufacture Color</th>
                                <th>Exterior Color</th>
                                <th>Interior Color</th>
                                <th className="wr-vehicle-stock_number">Availability</th>
                                <th >Added By</th>
                                <th className="wr-vehicles-date">Date</th>
                                <th className="wr-vehicles-date">Status</th>
                                <th className="wr-vehicle-price">Action</th>
                            </tr>
                        </thead>
                        <VehicleLists vehicles={this.props.vehicles}/>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        vehicles: store.dealState.vehicleList
    }
}

export default connect(mapStateToProps, { requestVehicles })(VehiclesListingContainer);