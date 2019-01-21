// Insert Vehicle

import React, { Component } from 'react';
import { render } from 'react-dom';
import { NavLink } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Button, Card, Row, Col, Input, CardPanel } from 'react-materialize';
import 'react-web-tabs/dist/react-web-tabs.css';
// import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import store from '../../store';
import { bindActionCreators } from 'redux';
import { requestMakes } from  '../../actions/makes-action';
import { Field, reduxForm } from 'redux-form';

class InsertVehicle extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = { text: 'Vehicle Description' } // You can also pass a Quill Delta here
	  this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount() {
        // makeApi.getMakes();
        this.props.requestMakes();
    }
	handleChange(value) {
	  this.setState({ text: value })
	}

	handleSubmit(event) {
		//alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
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
	renderCheckboxField({input, label, type, id, meta: {touched, error}}) {
		return (
			<div className="col s12">
				<input type={type} {...input} className="filled-in" id={id}/>
				<label>{label}</label>
				<div className="error">
                    {touched ? error: ''}
                </div>
			</div>
		)
	}
	render() {
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
						<form className="col s12" onSubmit={this.handleSubmit}>
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
											name="model"
											label="Model"
											value="2"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">Acadia</option>
												<option value="2">Accent</option>
												<option value="3">Accord</option>
												<option value="3">Patriot</option>
											</Field>

							  				<Field
											name="model-code"
											label="Model Code"
											value="2"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">E87</option>
												<option value="2">E53</option>
												<option value="2">W201</option>
											</Field>

							  				<Field 
											name="body"
											value="2"
											label="Body"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">Convertible</option>
												<option value="2">Coupe</option>
												<option value="3">Hatchback</option>
												<option value="3">Sedan</option>
											</Field>
											
											<Field
											name="engine"
											label="Engine"
											value="2"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">4-Cylinder</option>
												<option value="2">6-Cylinder</option>
												<option value="2">V6-Cylinder</option>
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
											name="transmission"
											value="2"
											label="Transmission"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">Automatic</option>
												<option value="2">Manual</option>
												<option value="3">4 Speed Automatic</option>
												<option value="3">5 Speed Automatic</option>
											</Field>
							  				
											<Field
											name="exterior-color"
											value="2"
											label="Exterior Color"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">Red</option>
												<option value="2">Black</option>
												<option value="2">Grey</option>
											</Field>

											<Field
											name="interior-color"
											value="2"
											label="Interior Color"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">Red</option>
												<option value="2">Black</option>
												<option value="2">Grey</option>
											</Field>
											
											<Field
											name="fuel-type"
											value="2"
											label="Fuel Type"
											component={this.renderSelectField}
											>
												<option value="" disabled>Choose your option</option>
												<option value="1">Diesel</option>
												<option value="2">Electric</option>
												<option value="2">Flexible</option>
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
											<div className="col s4">
												<strong>Interior Features</strong>
												<Field
												name="interior-features"
												type="checkbox"
												id="air-condition"
												Label="Air Conditioning" 
												component={this.renderCheckboxField}
												/>
												
												<Field
												name="interior-features"
												type="checkbox"
												id="alloy-wheel"
												Label="Alloy Wheels" 
												component={this.renderCheckboxField}
												/>
												{/* <div className="col s12">
													<input type="checkbox" className="filled-in" id="air-conditioning" defaultChecked />
													<label htmlFor="air-conditioning"></label>
												</div>
												<div className="col s12">
													<input type="checkbox" className="filled-in" id="alloy-wheels" />
													<label htmlFor="alloy-wheels"></label>
												</div> */}
											</div>

											<div className="col s4">
												<strong>Exterior Features</strong>
												<div className="col s12">
													<input type="checkbox" className="filled-in" id="air-conditioning" defaultChecked />
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
													<input type="checkbox" className="filled-in" id="air-conditioning" defaultChecked />
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
													<input type="checkbox" className="filled-in" id="air-conditioning" defaultChecked />
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
													<input type="checkbox" className="filled-in" id="air-conditioning" defaultChecked />
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
													<input type="checkbox" className="filled-in" id="air-conditioning" defaultChecked />
													<label htmlFor="air-conditioning">Air Conditioning</label>
												</div>
												<div className="col s12">
													<input type="checkbox" className="filled-in" id="alloy-wheels" />
													<label htmlFor="alloy-wheels">Alloy Wheels</label>
												</div>
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
											<div className="input-field col s12">
												<input type="file" id="input-file-now" className="dropify" multiple />
											</div>
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
											<div className="input-field col s6">
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

function mapStateToProps(store) {
    console.log('ins', store.makeState)
    return {
        makes: store.makeState.makes
    }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestMakes }, dispatch);
export default reduxForm({
	form: 'PostVehicles'
})(connect(mapStateToProps, mapDispatchToProps)(InsertVehicle));
// export default InsertVehicle;