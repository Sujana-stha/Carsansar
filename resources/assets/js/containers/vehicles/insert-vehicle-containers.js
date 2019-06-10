import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import store from '../../store';
//action
import {  requestSubmitVehicle} from '../../actions/deals-action'

//api
import * as api from '../../api/deals-api';
import * as optCatapi from '../../api/option_cat-api';
//components
import InsertVehicle from '../../components/vehicles/insert-vehicle-form'


class VehicleFormContainer extends Component {
    constructor() {
        super();
        this.state = { 
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
			optCategories: [],
			showForm: false
        };
    }
    componentDidMount() {
		this.mounted =  true
        api.getMakesList().then((response)=> {
			if(this.mounted) {
			this.setState({ makes: response.data })
			}
		})
		api.getModelsList().then((response) => {
			if(this.mounted) {
			this.setState({ models: response.data })
			}
		})
		api.getBodiesList().then((response) => {
			if(this.mounted) {
			this.setState({ bodies: response.data })
			}
		})
		api.getEnginesizeList().then((response) => {
			if(this.mounted) {
			this.setState({ enginesizes: response.data })
			}
		})
		api.getTransmissionList().then((response) => {
			if(this.mounted) {
			this.setState({ transmissions: response.data })
			}
		})
		api.getColorsList().then((response)=> {
			if(this.mounted) {
			this.setState({ colors: response.data })
			}
		})
		api.getFueltypesList().then((response)=> {
			if(this.mounted) {
			this.setState({ fueltypes: response.data })
			}
		})
		api.getDRivesist().then((response)=> {
			if(this.mounted) {
			this.setState({drives: response.data })
			}
		})
		api.getCategoriesList().then((response)=> {
			if(this.mounted) {
			this.setState({categories: response.data})
			}
		})
		api.getOptionsList().then((response)=> {
			if(this.mounted) {
			this.setState({options: response.data})
			}
		})
		optCatapi.getOptionsCategories().then((response) => {
			if(this.mounted) {
			this.setState({optCategories: response.data})
			}
		})
	}
	componentWillUnmount() {
		this.mounted = false;
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
                showForm={this.state.showForm}
                onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default connect(null, {requestSubmitVehicle})(VehicleFormContainer)