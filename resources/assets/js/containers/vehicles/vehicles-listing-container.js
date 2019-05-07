import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import * as api from '../../api/deals-api';
import { requestVehicles, searchVehicleByTitle } from '../../actions/deals-action'
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
            keyword: ''
        }
    }
    componentDidMount() {
        this.props.requestVehicles();
        console.log('veh', this.props.vehicles)

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
            console.log('list',list)
            this.setState({keyword})
            this.props.searchVehicleByTitle(list)
        } else {
            this.setState({keyword})
            this.props.requestVehicles()
        }
    }
    render() {
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
                                <th className="wr-vehicles-title">Title</th>
                                <th>Stock #</th>
                                <th>Price</th>
                                <th>Condition</th>
                                <th>Type</th>
                                <th>Image</th>
                                <th>Added By</th>
                                <th className="wr-vehicles-date">Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {this.props.vehicles.length ? (
                            <VehicleLists vehicles={this.props.vehicles}/>
                        ) : (
                            <tbody>
                                <tr>
                                    <td>No Results Found !</td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        vehicles: store.dealState.vehicleList,
        fetching: store.dealState.fetching
    }
}

export default connect(mapStateToProps, { requestVehicles, searchVehicleByTitle })(VehiclesListingContainer);