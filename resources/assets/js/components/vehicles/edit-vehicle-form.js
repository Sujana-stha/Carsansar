import React, { Component } from 'react';

import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import { Field, reduxForm } from 'redux-form';

//API
import * as api from '../../api/deals-api';
import * as optCatapi from '../../api/option_cat-api';

// FIELD COMPONENT
import ImagePreviewField from './imagePreview';
import AutocompleteField from './autocomplete-field';

class EditVehicles extends Component {
    constructor() {
        super()
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
        }
    }
    componentDidMount() {
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
			<div className="input-field col s12">
                <input  type={type} {...input}/>
                <label htmlFor={input.name}>{label}</label>
                <div className="error">
                    {touched ? error: ''}
                </div>
            </div>
        )
    }
    renderTextareaField({input,id, label, meta: {touched, error}}) {
		return (
			<div className="input-field col s12">
				<textarea {...input} id={id} className="materialize-textarea"></textarea>
				<label htmlFor={id}>{label}</label>
				<div className="error">
                    {touched ? error: ''}
                </div>
			</div>
		)
    }
    renderSelectField({input, label, meta: {touched, error}, defaultValue, children}) {
        return (
            <div className="col s12">
                <label>{label}</label>
                <select value={defaultValue} {...input} className="browser-default">
                    {children}
                </select>
                <div className="error">
                    {touched ? error: ''}
                </div>
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
										console.log('new', checkedValues)
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
    render() {
        const { handleSubmit } = this.props;
        return (
				
			<div className="card-panel">
				<div className="row">
					<form onSubmit={ handleSubmit} className="col s12">
						<Field
							label="Vehicle Title"
							type = "text"
							name="title"
							component={this.renderInputField}
						></Field>

						<Field
							name="v_description"
							label ="Vehicle Description"
							id="vehicle-description"
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
									<Tab onClick={tabId => { tabId.preventDefault()}} tabFor="status">Statuses</Tab>
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
										component={this.renderInputField}
										/>
										<Field
										name="year"
										label="Year"
										value="1"
										component={this.renderSelectField}
										>
											<option value="">Choose your option</option>
											<option value="1">2016</option>
											<option value="2">2017</option>
											<option value="3">2018</option>
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
											name="current_price"
											label="Current Price"
											type="text"
											component={this.renderInputField}
											/>
												
										</div>
										<div className="col s6">
							  				<Field
												name="actual_price"
												label="Actual Price"
												type="text"
												 component={this.renderInputField}
											/>
										</div>
											
									</div>
								</TabPanel>
								<TabPanel tabId="gallery" className="col s12">
									<div className="row">
										<Field name="files" 
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
								<TabPanel tabId="status">
									<div className="row">
										<div className="col s6">
											<div className="switch"><label>Featured<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
										</div>
																	
										<div className="input-field col s6">
											<div className="switch"><label>Sold Out<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
										</div>
									</div>
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
        );
    }
}

function validate(values) {
	const errors = {}
	console.log('value', values);
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
})(EditVehicles);