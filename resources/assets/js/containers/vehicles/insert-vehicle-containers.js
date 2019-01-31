import React, { Component } from 'react';
import InsertVehicle from '../../components/vehicles/insert-vehicle-form'
import {requestSubmitVehicle} from '../../actions/deals-action'
import { connect } from 'react-redux';

class VehicleFormContainer extends Component {
    onSubmit(values) {
        console.log(this.props);
        this.props.requestSubmitVehicle(values);
    }

    render() {
        return (
            <InsertVehicle onSubmit={this.onSubmit.bind(this)}/>
        );
    }
}


export default connect(null, {requestSubmitVehicle})(VehicleFormContainer);