import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import { Field, reduxForm } from 'redux-form';
import {  requestVehiclesUpdate} from '../../actions/deals-action'
import { connect } from 'react-redux';
//API
import * as api from '../../api/deals-api';
import * as optCatapi from '../../api/option_cat-api';

// FIELD COMPONENT
import ImagePreviewField from './imagePreview';
import AutocompleteField from './autocomplete-field';

class EditVehicles extends Component {
    constructor(props) {
        super(props)
        this.state= {
            makes: [],
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
        }
    }
    componentDidMount() {
		let vehicleId =  this.props.match.params.id
		api.getSingleVehicles(vehicleId).then((response)=> {
			const data =  response.data;
			const vehicles = {
				kms: data.kms,
				price:data.price,
				title: data.title,
				images: data.images,
				body_id : data.attribute.body_id==null ? 'Null':{label:data.attribute.body_id.body_desc, value:data.attribute.body_id.id},
				exterior_color_id: data.attribute.exteriorcolor_id==null ? 'Null':{label: data.attribute.exteriorcolor_id.color_desc, value: data.attribute.exteriorcolor_id.id},
				interior_color_id: data.attribute.interiorcolor_id==null ? 'Null':{label:data.attribute.interiorcolor_id.color_desc, value: data.attribute.interiorcolor_id.id},
				option_id: data.attribute.option_ids,
				doors:data.attribute.doors,
				passenger: data.attribute.passenger,
				category_id: data.vehicle_info.category_id==null ? 'Null':{label:data.vehicle_info.category_id.category_desc, value: data.vehicle_info.category_id.id},
				drive_id: data.vehicle_info.drive_id==null ? 'Null':{label:data.vehicle_info.drive_id.drive_desc, value:data.vehicle_info.drive_id.id},
				enginesize_id: data.vehicle_info.enginesize_id==null ? 'Null':{label:data.vehicle_info.enginesize_id.enginesize_desc, value: data.vehicle_info.enginesize_id.id},
				fueltype_id: data.vehicle_info.fueltype_id==null ? 'Null':{label:data.vehicle_info.fueltype_id.fueltype_desc, value: data.vehicle_info.fueltype_id.id},
				make_id: data.vehicle_info.make_id==null ? 'Null':{label:data.vehicle_info.make_id.make_desc, value: data.vehicle_info.make_id.id},
				mfg_exterior_color_id: data.vehicle_info.mfgexteriorcolor_id==null ? 'Null':{label:data.vehicle_info.mfgexteriorcolor_id.color_desc, value: data.vehicle_info.mfgexteriorcolor_id.id},
				model_id: data.vehicle_info.model_id==null ? 'Null': {label: data.vehicle_info.model_id.model_desc, value: data.vehicle_info.model_id.id},
				transmission_id: data.vehicle_info.transmission_id==null ? 'Null':{label:data.vehicle_info.transmission_id.transmission_desc, value: data.vehicle_info.transmission_id.id},
				vin: data.vehicle_info.vin,
				year: data.vehicle_info.year,
				vehicle_status: data.vehicle_status
			}
            this.props.initialize(vehicles);
		})
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
		api.getOptionsList().then((response)=> {
			this.setState({options: response.data})
		})
		optCatapi.getOptionsCategories().then((response) => {
			this.setState({optCategories: response.data})
		})
		
    }
    renderInputField({input, label, type, meta: {touched, error}}) {
        return (
			<div className="row">
				<div className="input-field col s12">
					<input id={input.name} type={type} {...input}/>
					<label className="active" htmlFor={input.name}>{label}</label>
					<div className="error">
						{touched ? error: ''}
					</div>
				</div>
			</div>
        )
    }
    renderTextareaField({input,id, label, meta: {touched, error}}) {
		return (
			<div className="input-field col s12">
				<textarea {...input} id={id} className="materialize-textarea"></textarea>
				<label htmlFor={id} className="active">{label}</label>
				<div className="error">
                    {touched ? error: ''}
                </div>
			</div>
		)
    }
    renderSelectField({input, label, meta: {touched, error}, defaultValue, children}) {
        return (
            <div className="col s12">
                <label className="active">{label}</label>
                <select value={defaultValue} {...input} className="browser-default">
                    {children}
                </select>
                <div className="error">
                    {touched ? error: ''}
                </div>
            </div>
        )
	}
	renderCheckboxField({input, label, type, meta: {touched, error}}) {
		return(
			<div className="col s6">
				<label>
					<input type={type} className="filled-in" {...input} />
					<span>{label}</span>
				</label>
			</div>
		)
	}
    renderOptionsList({input, options, optCategories, meta: {touched, error}}) {
		return optCategories.map((optCategory, i)=> {
			return (
				<div key={i}>
					<strong>{optCategory.optioncategory_desc}</strong>
					{options.map((option, i) => {
						return(
						<div key={i}>
							{optCategory.id== option.oc_id ? (
								<label>
									<input
									name={`${input.name}`}
									type="checkbox"
									className="filled-in"
									value={option.id}
									checked={input.value.indexOf(option.id) !== -1}
									onChange={(event) => {
										const checkedValues= [...input.value];
										if(event.target.checked) {
											checkedValues.push(option.id);
										} else {
											checkedValues.splice(checkedValues.indexOf(option.id), 1);
										}
										return input.onChange(checkedValues)
									}}/>
									<span>{option.option_desc}</span>
								</label>
							): null }
						</div>
						)
					})}
				</div>
			)
		})
	}
	financeForm(e) {
		this.setState({
			showForm: e.target.checked
		})
	}
	onSubmit(values) {
		console.log('value', values)
		this.props.requestVehiclesUpdate(values)
	}
    render() {
		// const { handleSubmit } = this.props;
        return (
			<div>
				<div className="row">
					<div className="col s12 mt-2 mb-2 right-align">
						<NavLink to="/dashboard/vehicles" className="btn waves-effect waves-light"><i className="material-icons left">view_list</i><span> All Vehicles</span></NavLink>
					</div>
				</div>
				<h4 className="header2">Edit Vehicle</h4>
				<div className="card-panel">
					<div className="row">
						<form onSubmit={ this.props.handleSubmit((event)=>this.onSubmit(event))} className="col s12">
							<Field
								label="Vehicle Title"
								type = "text"
								name="title"
								value="title"
								component={this.renderInputField}
							></Field>

							<Field
								name="ad_desc"
								label ="Vehicle Description"
								id="vehicle-description"
								value="ad_desc"
								component={this.renderTextareaField}
							></Field>
							<div className="col s12 m12 l12">
								<Tabs defaultTab="general" vertical>
									<TabList>
									<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="general">General</Tab>
										<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="vehicle-attributes">Vehicle Attributes</Tab>
										<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="features-options">Features and Options</Tab>
										<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="pricing">Pricing</Tab>
										<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="gallery">Gallery</Tab>
										<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="vehicle-location">Vehicle Location</Tab>
										<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="financing">Financing</Tab>
										<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="information">More Information</Tab>
									</TabList>
									<TabPanel tabId="general">
										<div className="row">
											<Field name="vehicle_status"
											label="Condition"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												<option value="Used">Used</option>
												<option value="New">New</option>
											</Field>

											<Field
											name="type"
											label="Type"
											component={this.renderSelectField}
											>
												<option value="" >Choose your option</option>
												<option value="1">Car</option>
												<option value="2">Sport Utility</option>
												<option value="3">Truck</option>
												<option value="3">Van</option>
											</Field>

											<Field
											name="v_technical_specifications"
											label="Technical Specifications"
											id="v_technical_specifications"
											component={this.renderTextareaField}
											/>

											<Field
											name="v_additional_information"
											label="Additional Information"
											id="v_additional_information"
											component={this.renderTextareaField}
											/>
												
										</div>
									</TabPanel>
									<TabPanel tabId="vehicle-attributes">
										<div className="row">
											<Field
											name="vin"
											label="Vin Number"
											type="text"
											id="vin"
											value="vin"
											component={this.renderInputField}
											/>
											<Field
											name="year"
											label="Year"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												<option value="2016">2016</option>
												<option value="2017">2017</option>
												<option value="2018">2018</option>
											</Field>

											<Field name="make_id"
											label="Makes"
											itemList={this.state.makes}
											apiName="makes"
											component={AutocompleteField}
											/>

											<Field name="model_id" 
											label="Model"
											itemList={this.state.models}
											apiName="models"
											component={AutocompleteField}
											/>

											<Field 
											name="body_id"
											label="Body"
											itemList={this.state.bodies}
											apiName="bodies"
											component={AutocompleteField}
											/>
													
											<Field
											name="enginesize_id"
											label="Engine"
											itemList={this.state.enginesizes}
											apiName="enginesizes"
											component={AutocompleteField}
											/>
											
											<Field
											name="drive_id"
											label="Drivetrain"
											itemList={this.state.drives}
											apiName="drives"
											component={AutocompleteField}
											/>

											<Field
											name="transmission_id"
											label="Transmission"
											itemList={this.state.transmissions}
											apiName="transmissions"
											component={AutocompleteField}
											/>
											<Field
											name="mfg_exterior_color_id"
											label="Manufacture Exterior Color"
											itemList={this.state.colors}
											apiName="colors"
											component={AutocompleteField}
											/>
											<Field
											name="exterior_color_id"
											label="Exterior Color"
											itemList={this.state.colors}
											apiName="colors"
											component={AutocompleteField}
											/>

											<Field
											name="interior_color_id"
											label="Interior Color"
											itemList={this.state.colors}
											apiName="colors"
											component={AutocompleteField}
											/>
												
											<Field
											name="fueltype_id"
											label="Fuel Type"
											itemList={this.state.fueltypes}
											apiName="fueltypes"
											component={AutocompleteField}
											/>
													
											<Field
											name="fuel_economy"
											type="text"
											label="Fuel Economy"
											component={this.renderInputField}
											/>
												
											<div className="col s12">
												<p>Fuel Efficiency</p>
											</div>
											<div className="col s6">
												<Field
												name="city_mpg"
												type="text"
												label="City MPG"
												component={this.renderInputField}
												/>
											</div>
											<div className="input-field col s6">
												<Field
												name="highway_mpg"
												type="text"
												label="Highway MPG"
												component={this.renderInputField}
												/>
													
											</div>
											<Field
												name="mileage"
												type="text"
												label="Mileage/Odometer"
												component={this.renderInputField}
											/>
										</div>
									</TabPanel>
									<TabPanel tabId="features-options">
										<div className="row">
											<div className="col s12">
												<Field
												name="option_id"
												component={this.renderOptionsList}
												options={this.state.options}
												optCategories={this.state.optCategories}
												/>
											</div>
										</div>
									</TabPanel>
									<TabPanel tabId="pricing">
										<div className="row">
											<div className="col s6">
												<Field
												name="price"
												label="Price"
												type="text"
												component={this.renderInputField}
												/>
											</div>
												
										</div>
									</TabPanel>
									<TabPanel tabId="gallery" className="col s12">
										<div className="row">
											<Field name="images" 
											component={ImagePreviewField} 
											/>
										</div>
									</TabPanel>
									<TabPanel tabId="vehicle-location">
										<div className="row">
											<Field
											name="location"
											label="Location"
											value="1"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												<option value="1">Dealership 1</option>
												<option value="2">Dealership 2</option>
											</Field>

											<div className="col s6">
												<Field
												name="latitude"
												label="Latitude"
												type="text"
												component={this.renderInputField}
													/>
											</div>
												
											<div className="col s6">
												<Field
													name="longitude"
													type="text"
													label="Longitude"
													component={this.renderInputField}
												/>
													
											</div>
										</div>
									</TabPanel>
									<TabPanel tabId="financing">
										<div className="row">
											<div className="col s12">
												<h4>Finance</h4>
												<Field name="financing_flag"
												type="checkbox"
												label="Financing"
												component={this.renderCheckboxField}
												onChange={(e)=> this.financeForm(e)}
												/>
											</div>
										</div>
										{this.state.showForm ? (
										<div className="card">
											<div className="card-content">
												<h4 className="card-title">Finance Form</h4>
												<div className="row">	
													<div className="col s6">
														<Field name="type"
														label="Type"
														type="text"
														component={this.renderInputField}
														/>
													</div>
													<div className="col s6">
														<Field name="payment"
														label="Payment"
														type="text"
														component={this.renderInputField}
														/>
													</div>
													<div className="col s6">
														<Field name="payment_type"
														label="Payment Type"
														type="text"
														component={this.renderInputField}
														/>
													</div>
													<div className="col s6">
														<Field name="downpayment"
														label="Down Payment"
														type="text"
														component={this.renderInputField}
														/>
													</div>
													<div className="col s6">
														<Field name="number_of_payment"
														label="Number of Payment"
														type="text"
														component={this.renderInputField}
														/>
													</div>
													<div className="col s6">
														<Field name="source"
														label="Source of Payment"
														type="text"
														component={this.renderInputField}
														/>
													</div>
													<div className="col s6">
														<Field name="odometer"
														label="Odometer"
														type="text"
														component={this.renderInputField}
														/>
													</div>
													<div className="col s6">
														<Field name="description"
														label="Description"
														type="text"
														component={this.renderInputField}
														/>
													</div>
												</div>
											</div>
										</div>
		  								): null }
									</TabPanel>
									<TabPanel tabId="information">
										<div className="row">
											<div className="col s12">
												<p>Vehicle Brochure</p>
											</div>
											<div className="col s12">
												<div className="file-field input-field">
													<div className="btn">
														<span>Upload Brochure</span>
														<input type="file" />
													</div>
													<div className="file-path-wrapper">
														<input className="file-path validate" type="text" />
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
								</Tabs>
							</div>
								
							<div className="row">
								<div className="input-field col s12">
									<button type="submit" className="btn cyan waves-effect waves-light right" name="action">Update
										<i className="material-icons right">send</i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
        );
    }
}

function validate(values) {
	const errors = {}
	if(!values.title) {
        errors.title = "This Field is empty"
    } else if (values.title.length > 100) {
        errors.title = "Must be 100 character or Less!"
	}
	return errors;
}

export default reduxForm({
	form: 'EditVehicles',
	validate
})(connect(null, {requestVehiclesUpdate})(EditVehicles));