// Insert Vehicle

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { NavLink } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Button, Card, Row, Col, Input, CardPanel } from 'react-materialize';
import 'react-web-tabs/dist/react-web-tabs.css';
// import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import store from '../../store';
import * as api from '../../api/deals-api';
import * as optCatapi from '../../api/option_cat-api';
import { Field, reduxForm } from 'redux-form';
import {requestSubmitVehicle} from '../../actions/deals-action'

class InsertVehicle extends Component {
	constructor() {
	  	super()
	  	this.state = { 
			text: 'Vehicle Description',
			images:[],
			makes: {},
			models:{},
			bodies: {},
			enginesizes:{},
			transmissions: {},
			colors: {},
			fueltypes: {},
			options: [],
			optCategories: []
		} // You can also pass a Quill Delta here
		  this.handleChange = this.handleChange.bind(this);
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
		api.getOptionsList().then((response)=> {
			console.log('opt',response)
			this.setState({options: response.data})
		})
		optCatapi.getOptionsCategories().then((response) => {
			console.log('optcat',response)
			this.setState({optCategories: response.data})
		})
    }
	handleChange(value) {
	  this.setState({ text: value })
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
	
	renderCheckboxField({input, options, optCategories, meta: {touched, error}}) {
		return optCategories.map((optCategory, i)=> {
			return (
				<div key={i}>
					<strong>{optCategory.optioncategory_desc}</strong>
					{options.map((option, i) => {
						return(
						<div className="col s12" key={i}>
							{optCategory.id== option.oc_id ? (
								<Input 
								name={`${input.name}`}
								type="checkbox"
								
								label={option.option_desc} 
								className='filled-in'
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
							): null }
						</div>
						)
					})}
				</div>
			)
		})
		
	}
	
	renderDropzoneField(field) {
		const files = field.input.value;
		let dropzoneRef;
		var images=[]
		const onDrop =(files) => {
			files.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			}))
			console.log('fileV',files);
			images = files;
			console.log('img', images)
		}
		const thumbs = ()=> {
			return (
				<div>
					{images.length > 0 ? (
						<ul>
							{images.map((image, i)=> {
								<li key={i}>
									<p>{image.name}</p>
									<img src={image.preview} alt="Preview"/>
								</li>
							})}
						</ul>
					): null}
				</div>
			)
		}
  		return ( 
      		<div className="col s12">
				<Row>
					<Dropzone
						style={{
						width: '200px',
						height: '200px',
						borderWidth: '2px',
						borderColor: 'rgb(102, 102, 102)',
						borderStyle: 'dashed',
						borderRadius: '5px',
						padding: '20px',
						}}
						name={field.name}
						onDrop={onDrop.bind(files)}
						ref={(node) => { dropzoneRef = node; }}
						maxSize={5242880}
						multiple={false}
						accept={'image/*'}
						className="drop-zone"
					>
					{({getRootProps, getInputProps, open, isDragActive, isDragReject, acceptedFiles, rejectedFiles}) => {
						if (isDragActive) {
						return 'This file is authorized';
						}
						if (isDragReject) {
						return 'This file is not authorized';
						}
						return (
							<div>
								<div style={{
									width: '200px',
									height: '200px',
									borderWidth: '2px',
									borderColor: 'rgb(102, 102, 102)',
									borderStyle: 'dashed',
									borderRadius: '5px',
									padding: '20px',
								}}  {...getRootProps()}>
									<input 
									{...getInputProps()} 
									/>
									<p>Drop files here</p>
								</div>
							</div>
						)
					}}
					</Dropzone>
					{field.meta.touched &&
					field.meta.error &&
					<span className="error">{field.meta.error}</span>}
					{files && Array.isArray(files) && (
						{thumbs}
					)}
					
				</Row>
				<Row>
					<Button type="button" style={{margin: '5px'}}
							onClick={() => { dropzoneRef.open(); }}>Add An
					Image
					</Button>
				</Row>
      		</div>
  		);
	}
	// onSubmit(values) {
	// 	console.log('valuessss', this.props)
	// 	this.props.requestSubmitVehicle(values);
	// }
	render() {
		const FILE_FIELD_NAME = 'files';
		// const { handleSubmit } = this.props
	  	return (
			<div>
				<Row>
					<div className="col s12 mt-2 mb-2 right-align">
						<NavLink to="/vehicles" className="btn waves-effect waves-light"><i className="material-icons left">view_list</i><span> All Vehicles</span></NavLink>
					</div>
				</Row>
				<h4 className="header2">Add New Vehicle</h4>
				<CardPanel>
					<Row>
						<form className="col s12" onSubmit={ this.props.handleSubmit((event)=>this.onSubmit(event))}>
					  		{/* <Row>
								<div className="input-field col s12">
						  			<input id="v_title" type="text" className="validate" />
						  			<label htmlFor="v_title">Vehicle Title</label>
								</div>
							  </Row> */}
							<Field
								label="Vehicle Title"
								type = "text"
								name="v_title"
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
										<Tab tabFor="general">General</Tab>
										<Tab tabFor="vehicle-attributes">Vehicle Attributes</Tab>
										<Tab tabFor="features-options">Features and Options</Tab>
										<Tab tabFor="pricing">Pricing</Tab>
										<Tab tabFor="gallery">Gallery</Tab>
										<Tab tabFor="vehicle-location">Vehicle Location</Tab>
										<Tab tabFor="status">Statuses</Tab>
										<Tab tabFor="information">More Information</Tab>
									</TabList>
									<TabPanel tabId="general">
										<div className="row">
											<Field name="condition"
											label="Condition"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">Used</option>
												<option value="2">New</option>
											</Field>

											<Field
											name="type"
											label="Type"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
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
												<option value="" disabled>Choose your option</option>
												<option value="1">W1001</option>
												<option value="2">W1002</option>
												<option value="2">W1003</option>
											</Field>

											<Field
											name="vin-number"
											label="Vin Number"
											value="1"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
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
												<option value="" disabled>Choose your option</option>
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
											name="drivetrain"
											label="Drivetrain"
											value="2"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">2WD</option>
												<option value="2">4WD</option>
												<option value="2">AWD</option>
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
												component={this.renderCheckboxField}
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
											<Field name={FILE_FIELD_NAME} component={this.renderDropzoneField} />
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
												<option value="" disabled>Choose your option</option>
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
							
							{/* <Row>
								<div className="tabs-vertical">
									<div className="col s4 m3 l3">
										<ul className="tabs">
											<li className="tab">
												<a className="active" href="#General">General</a>
											</li>
											<li className="tab">
												<a href="#Vehicle-Attributes">Vehicle Attributes</a>
											</li>
											<li className="tab">
												<a href="#Features-Options">Features and Options</a>
											</li>
															
											<li className="tab">
												<a href="#Pricing">Pricing</a>
											</li>
											<li className="tab">
												<a href="#Gallery">Gallery</a>
											</li>
											<li className="tab">
												<a href="#Vehicle-Location">Vehicle Location</a>
											</li>
											<li className="tab">
												<a href="#Status">Statuses</a>
											</li>
											<li className="tab">
												<a href="#Information">More Information</a>
											</li>
										</ul>
									</div>
									<div className="col s8 m9 l8">
										<div id="General" className="tab-content">
											<div className="row">
												<div className="col s12">
													<Row>
														<Input s={12} type='select' label="Condition" defaultValue='2'>
															<option value='1'>Used</option>
															<option value='2'>New</option>
														</Input>
													</Row>
													<select>
														<option value="" disabled>Choose your option</option>
														<option value="1">Used</option>
														<option value="2">New</option>
													</select>
													<label>Condition</label>
												</div>
												<div className="input-field col s12">
													<select name="type">
														<option value="" disabled>Choose your option</option>
														<option value="1">Car</option>
														<option value="2">Sport Utility</option>
														<option value="3">Truck</option>
														<option value="3">Van</option>
													</select>
													<label>Type</label>
												</div>
											</div>
											<Row>
												<div className="input-field col s12">
													<textarea id="v_technical_specifications" className="materialize-textarea"></textarea>
													<label htmlFor="v_technical_specifications">Technical Specifications</label>
												</div>
											</Row>
											<Row>
												<div className="input-field col s12">
													<textarea id="v_additional_information" className="materialize-textarea"></textarea>
													<label htmlFor="v_additional_information">Additional Information</label>
												</div>
											</Row>
										</div>
										
										<div id="Vehicle-Attributes" className="tab-content">
											<Row>
												<div className="input-field col s12">
													<select name="stock-number">
														<option value="" disabled>Choose your option</option>
														<option value="1">W1001</option>
														<option value="2">W1002</option>
														<option value="2">W1003</option>
													</select>
													<label>Stock Number</label>
												</div>
												<div className="input-field col s12">
													<select name="vin-number">
														<option value="" disabled>Choose your option</option>
														<option value="1">1FVACWDU1BHBB3474</option>
														<option value="2">JH4DB1670MS000448</option>
														<option value="2">1YVHZ8CH2A5M03260</option>
													</select>
													<label>Vin Number</label>
												</div>
												<div className="input-field col s12">
													<select name="year">
														<option value="" disabled>Choose your option</option>
														<option value="1">2016</option>
														<option value="2">2017</option>
														<option value="3">2018</option>
													</select>
													<label>Year</label>
												</div>
												<div className="input-field col s12">
													<select name="make">
														<option value="" disabled>Choose your option</option>
														{this.props.makes.map((make)=> {
															return (
																<option key={make.id} value={make.id}>{make.make_desc}</option>
															)
														})}
													</select>
													<label>Make</label>
												</div>
												<div className="input-field col s12">
													<select name="model">
														<option value="" disabled>Choose your option</option>
														<option value="1">Acadia</option>
														<option value="2">Accent</option>
														<option value="3">Accord</option>
														<option value="3">Patriot</option>
													</select>
													<label>Model</label>
												</div>
												<div className="input-field col s12">
													<select name="model-code">
														<option value="" disabled>Choose your option</option>
														<option value="1">E87</option>
														<option value="2">E53</option>
														<option value="2">W201</option>
													</select>
													<label>Model Code</label>
												</div>
												<div className="input-field col s12">
													<select name="body">
														<option value="" disabled>Choose your option</option>
														<option value="1">Convertible</option>
														<option value="2">Coupe</option>
														<option value="3">Hatchback</option>
														<option value="3">Sedan</option>
													</select>
													<label>Body Style</label>
												</div>
												<div className="input-field col s12">
													<select name="engine">
														<option value="" disabled>Choose your option</option>
														<option value="1">4-Cylinder</option>
														<option value="2">6-Cylinder</option>
														<option value="2">V6-Cylinder</option>
													</select>
													<label>Engine</label>
												</div>
												<div className="input-field col s12">
													<select name="drivetrain">
														<option value="" disabled>Choose your option</option>
														<option value="1">2WD</option>
														<option value="2">4WD</option>
														<option value="2">AWD</option>
													</select>
													<label>Drivetrain</label>
												</div>
												<div className="input-field col s12">
													<select name="transmission">
														<option value="" disabled>Choose your option</option>
														<option value="1">Automatic</option>
														<option value="2">Manual</option>
														<option value="3">4 Speed Automatic</option>
														<option value="3">5 Speed Automatic</option>
													</select>
													<label>Transmission</label>
												</div>
												<div className="input-field col s12">
													<select name="exterior-color">
														<option value="" disabled>Choose your option</option>
														<option value="1">Red</option>
														<option value="2">Black</option>
														<option value="2">Grey</option>
													</select>
													<label>Exterior Color</label>
												</div>
												<div className="input-field col s12">
													<select name="interior-color">
														<option value="" disabled>Choose your option</option>
														<option value="1">Red</option>
														<option value="2">Black</option>
														<option value="2">Grey</option>
													</select>
													<label>Interior Color</label>
												</div>
												<div className="input-field col s12">
													<select name="fuel-type">
														<option value="" disabled>Choose your option</option>
														<option value="1">Diesel</option>
														<option value="2">Electric</option>
														<option value="2">Flexible</option>
													</select>
													<label>Fuel Type</label>
												</div>
												<div className="input-field col s12">
													<input id="fuel_economy" type="text" className="validate" />
													<label htmlFor="fuel_economy">Fuel Economy</label>
												</div>
												<div className="col s12">
													<p>Fuel Efficiency</p>
												</div>
												<div className="input-field col s6">
													<input id="city_mpg" type="text" className="validate" />
													<label htmlFor="city_mpg">City MPG</label>
												</div>
												<div className="input-field col s6">
													<input id="highway_mpg" type="text" className="validate" />
													<label htmlFor="highway_mpg">Highway MPG</label>
												</div>
												<div className="input-field col s12">
													<input id="mileage" type="text" className="validate" />
													<label htmlFor="mileage">Mileage/Odometer</label>
												</div>
											</Row>
										</div>

										<div id="Features-Options" className="tab-content">
											<div className="row">
												<div className="col s4">
													<strong>Interior Features</strong>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="air-conditioning"/>
														<label htmlFor="air-conditioning">Air Conditioning</label>
													</div>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="alloy-wheels" />
														<label htmlFor="alloy-wheels">Alloy Wheels</label>
													</div>
												</div>
												<div className="col s4">
													<strong>Exterior Features</strong>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="air-conditioning" />
														<label htmlFor="air-conditioning">Air Conditioning</label>
													</div>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="alloy-wheels" />
														<label htmlFor="alloy-wheels">Alloy Wheels</label>
													</div>
												</div>
												<div className="col s4">
													<strong>Suspension, Brakes and Steering</strong>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="air-conditioning" />
														<label htmlFor="air-conditioning">Air Conditioning</label>
													</div>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="alloy-wheels" />
														<label htmlFor="alloy-wheels">Alloy Wheels</label>
													</div>
												</div>
												<div className="col s4">
													<strong>Comfort</strong>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="air-conditioning" />
														<label htmlFor="air-conditioning">Air Conditioning</label>
													</div>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="alloy-wheels" />
														<label htmlFor="alloy-wheels">Alloy Wheels</label>
													</div>
												</div>
												<div className="col s4">
													<strong>Safety Features</strong>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="air-conditioning" />
														<label htmlFor="air-conditioning">Air Conditioning</label>
													</div>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="alloy-wheels" />
														<label htmlFor="alloy-wheels">Alloy Wheels</label>
													</div>
												</div>
												<div className="col s4">
													<strong>Entertainment Features</strong>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="air-conditioning"  />
														<label htmlFor="air-conditioning">Air Conditioning</label>
													</div>
													<div className="col s12">
														<input type="checkbox" className="filled-in" id="alloy-wheels" />
														<label htmlFor="alloy-wheels">Alloy Wheels</label>
													</div>
												</div>
											</div>
										</div>

										<div id="Pricing" className="tab-content">
											<Row>
												<div className="input-field col s6">
													<input id="current_price" type="text" className="validate" />
													<label htmlFor="current_price">Current Price</label>
												</div>
												<div className="input-field col s6">
													<input id="actual_price" type="text" className="validate" />
													<label htmlFor="actual_price">Actual Price</label>
												</div>
											</Row>
										</div>

										<div id="Gallery" className="tab-content">
											<div className="row section">
												<div className="input-field col s12">
													<input type="file" id="input-file-now" className="dropify" multiple />
												</div>
											</div>
										</div>

										<div id="Vehicle-Location" className="tab-content">
											<div className="row">
												<div className="input-field col s12">
													<select name="location">
														<option value="" disabled>Choose your option</option>
														<option value="1">Dealership 1</option>
														<option value="2">Dealership 2</option>
													</select>
													<label>Location</label>
												</div>
												<div className="input-field col s6">
													<input id="latitude" type="text" className="validate" />
													<label htmlFor="latitude">Latitude</label>
												</div>
												<div className="input-field col s6">
													<input id="longitude" type="text" className="validate" />
													<label htmlFor="longitude">Longitude</label>
												</div>
											</div>
										</div>

										<div id="Status" className="tab-content">
											<Row>
												<div className="input-field col s6">
													<div className="switch"><label>Featured<input  type="checkbox" /><span className="lever"></span>Active</label></div>
												</div>
													
												<div className="input-field col s6">
													<div className="switch"><label>Sold Out<input  type="checkbox" /><span className="lever"></span>Active</label></div>
												</div>
											</Row>
										</div>

										<div id="Information" className="tab-content">
											<Row>
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
											</Row>
											<Row>
												<div className="col s12">
													<p>Video URL</p>
												</div>
												<div className="input-field col s12">
													<input id="video_link" type="text" className="validate" />
													<label htmlFor="video_link">Video Link</label>
												</div>
											</Row>
										</div>
										
									</div>
								</div>
							</Row>
							 */}
							<div className="row">
                                <div className="input-field col s12">
                                    <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Save
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
						</form>
					</Row>
				</CardPanel>
			</div>
		)

	}
}
function validate(values) {
	const errors = {}
    console.log('values', values)
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ requestMakes }, dispatch);
export default reduxForm({
	form: 'PostVehicles',
	validate
})(connect(null, {requestSubmitVehicle})(InsertVehicle));
// export default InsertVehicle;