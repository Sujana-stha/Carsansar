// Insert Vehicle

import React, { Component } from 'react';
import DropZone from "react-dropzone";
import { NavLink } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Tabs, Tab, TabPanel, TabList, TabProvider } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
// import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import * as api from '../../api/deals-api';
import * as optCatapi from '../../api/option_cat-api';
import { Field, reduxForm } from 'redux-form';
// import DropzoneField from './Dropzonefield'


class InsertVehicle extends Component {
	constructor() {
	  	super();
	  	this.state = { 
			images:[],
			text: 'Vehicle Description',
			makes: {},
			models:{},
			bodies: {},
			enginesizes:{},
			transmissions: {},
			colors: {},
			fueltypes: {},
			drives: {},
			options: [],
			optCategories: [],
			hide: true
		}; // You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this);
		// this.onDrop = this.onDrop.bind(this);
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
			console.log('opt',response)
			this.setState({options: response.data})
		})
		optCatapi.getOptionsCategories().then((response) => {
			console.log('optcat',response)
			this.setState({optCategories: response.data})
		})
    }
	handleChange(files) {
		console.log('fff', files)
	}

	renderInputField({input, label, type, meta: {touched, error}}) {
		
        return (
			<div className="input-field col s12">
                <input  type={type} {...input}/>
                <label>{label}</label>
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
	// onDrop(images){
    //     console.log('tss', images)
    //     this.setState({
    //         images : this.state.images.concat([...images])
    //     });

    // }
	renderDropzoneField (field) {
		const files = field.input.value;
		const onDrop =(files)=> {
			
			console.log('fileV',files);
			field.input.onChange(files);
    	}
		return (
			<div className="row">
				<div className="col s12">
					<DropZone
						name={field.name}
						onDrop={onDrop.bind(files)}
						maxSize={5242880}
						multiple={true}
						accept={'image/*'}
						className="drop-zone"
					>
						Drag and Drop Images Here!
					</DropZone>
					{field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
					{files && Array.isArray(files) && (
						
						<div className="col s12">
							{files.map((file, i) =>
								<div key={i} className="wr-preview-image-block">
									{/* {this.state.hide ? (
										<i className="material-icons">check</i>
									):null } */}
									<img src={file.preview} alt="preview" className="wr-preview-image"/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		)
	}
	
	componentWillUnmount() {
		// Make sure to revoke the data uris to avoid memory leaks
		this.state.images.forEach(image => URL.revokeObjectURL(image.preview))
	  }	
	onSubmit(values) {
		console.log('valuessss', this.props)
		this.props.requestSubmitVehicle(values);
	}
	render() {
		const { handleSubmit } = this.props
		
	  	return (
			<div>
				<div className="row">
					<div className="col s12 mt-2 mb-2 right-align">
						<NavLink to="/vehicles" className="btn waves-effect waves-light"><i className="material-icons left">view_list</i><span> All Vehicles</span></NavLink>
					</div>
				</div>
				<h4 className="header2">Add New Vehicle</h4>
				<div className="card-panel">
					<div className="row">
						<form onSubmit={ handleSubmit} className="col s12">
							<Field
								label="Vehicle Title"
								type = "text"
								name="title"
								component={this.renderInputField}
							></Field>

					  		{/* <Row>
								<div className="input-field col s12">
									<ReactQuill id="v_description" className="v-desc" value={this.state.text} onChange={this.handleChange} theme="snow"/>
									{/* <textarea id="v_description" className="materialize-textarea"></textarea>
									<label htmlFor="v_description">Vehicle Description</label> */}
								{/* </div>
					  		</Row> */} 
							<Field
								name="v_description"
								label ="Vehicle Description"
								value={this.state.text}
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
											<Field name="condition"
											label="Condition"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												<option value="1">Used</option>
												<option value="2">New</option>
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
											name="stock-number"
											label="Stock Number"
											value="1"
											component={this.renderSelectField}
											>
												<option value="" >Choose your option</option>
												<option value="1">W1001</option>
												<option value="2">W1002</option>
												<option value="2">W1003</option>
											</Field>

											<Field
											name="vin"
											label="Vin Number"
											value="1"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												<option value="1">1FVACWDU1BHBB3474</option>
												<option value="2">JH4DB1670MS000448</option>
												<option value="2">1YVHZ8CH2A5M03260</option>
											</Field>

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

											<Field
											name="make_id"
											label="Make"
											value="1"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.makes).map((make, i)=> {
													return (
														<option key={i} value={make}>{this.state.makes[make]}</option>
													)
												})}
											</Field>
							  				<Field
											name="model_id"
											label="Model"
											value="2"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.models).map((model, i)=> {
													return (
														<option key={i} value={model}>{this.state.models[model]}</option>
													)
												})}
											</Field>

							  				<Field 
											name="body_id"
											value="2"
											label="Body"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.bodies).map((body, i)=> {
													return(
														<option key={i} value={body}>{this.state.bodies[body]}</option>
													)
												})}
											</Field>
											
											<Field
											name="enginesize_id"
											label="Engine"
											value="2"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.enginesizes).map((enginesize, i)=> {
													return(
														<option key={i} value={enginesize}>{this.state.enginesizes[enginesize]}</option>
													)
												})}
												
											</Field>
											
											<Field
											name="drive_id"
											label="Drivetrain"
											value="2"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.drives).map((drive, i)=> {
													return(
														<option key={i} value={drive}>{this.state.drives[drive]}</option>
													)
												})}
											</Field>
											
											<Field
											name="transmission_id"
											value="2"
											label="Transmission"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.transmissions).map((transmission, i)=>{
													return(
														<option key={i} value={transmission}>{this.state.transmissions[transmission]}</option>
													)
												})}
												
											</Field>
							  				
											<Field
											name="exterior_color_id"
											value="2"
											label="Exterior Color"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.colors).map((color, i)=>{
													return(
														<option key={i} value={color}>{this.state.colors[color]}</option>
													)
												})}
											</Field>

											<Field
											name="interior_color_id"
											value="2"
											label="Interior Color"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.colors).map((color, i)=>{
													return(
														<option key={i} value={color}>{this.state.colors[color]}</option>
													)
												})}
											</Field>
											
											<Field
											name="fueltype_id"
											value="2"
											label="Fuel Type"
											component={this.renderSelectField}
											>
												<option value="">Choose your option</option>
												{Object.keys(this.state.fueltypes).map((fueltype, i)=> {
													return(
														<option key={i} value={fueltype}>{this.state.fueltypes[fueltype]}</option>
													)
												})}
											</Field>
											
											<Field
											name="fuel_economy"
											type="text"
											label="Fuel Economy"
											component={this.renderInputField}
											>
											</Field>
											
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
									<TabPanel tabId="gallery">
										<div className="row section">
											{/* <div className="input-field col s12">
												<input type="file" id="input-file-now" className="dropify" multiple />
											</div> */}
											<Field name="files" 
											component={this.renderDropzoneField} 
											type="file"
											images={this.state.images} 
											// handleOnDrop={this.onDrop}
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
                                    <button type="submit" className="btn cyan waves-effect waves-light right" name="action">Save
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
						</form>
					</div>
				</div>
			</div>
		)

	}
}
function validate(values) {
	const errors = {}
    console.log('values', values)
}


export default reduxForm({
	form: 'PostVehicles',
	validate,
	destroyOnUnmount: false,
})(InsertVehicle);