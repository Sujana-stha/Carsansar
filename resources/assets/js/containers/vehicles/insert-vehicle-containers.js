import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

//components
import InsertVehicle from '../../components/vehicles/insert-vehicle-form'

//action
import {  requestSubmitVehicle} from '../../actions/deals-action'


class VehicleFormContainer extends Component {
    onSubmit(values) {
        this.props.requestSubmitVehicle(values);
    }

    render() {
        return (
            <div>
                <div className="row">
					<div className="col s12 mt-2 mb-2 right-align">
						<NavLink to="/dashboard/vehicles" className="btn waves-effect waves-light"><i className="material-icons left">view_list</i><span> All Vehicles</span></NavLink>
					</div>
				</div>
				<h4 className="header2">Add New Vehicle</h4>
                <InsertVehicle onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}


export default connect(null, {requestSubmitVehicle})(VehicleFormContainer);