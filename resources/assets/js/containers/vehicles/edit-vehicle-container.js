import React, { Component } from 'react';
import EditVehicle from '../../components/vehicles/edit-vehicle-form';
import { NavLink } from 'react-router-dom';
import {  requestVehiclesUpdate} from '../../actions/deals-action'
import { connect } from 'react-redux';

class EditVehicleFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            vehicleId : ''
        }
    }
    componentDidMount() {
		console.log('pr',this.props)
        let vehicleId =  this.props.match.params.id
        console.log('id', vehicleId); 
        this.setState({
            vehicleId: vehicleId
        })    
    }
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
				<h4 className="header2">Edit Vehicle</h4>
                <EditVehicle onSubmit={this.onSubmit.bind(this)} vehicleId={this.state.vehicleId}/>
            </div>
        );
    }
}

export default connect(null, {requestVehiclesUpdate})(EditVehicleFormContainer);