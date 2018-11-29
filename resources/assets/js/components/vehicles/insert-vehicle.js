// Insert Vehicle

import React, { Component } from 'react';
import { render } from 'react-dom';
import { NavLink } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Button, Card, Row, Col, Input, CardPanel } from 'react-materialize';
import 'react-web-tabs/dist/react-web-tabs.css';
//import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
class InsertVehicle extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = { text: 'Vehicle Description' } // You can also pass a Quill Delta here
	  this.handleChange = this.handleChange.bind(this)
	}
   
	handleChange(value) {
	  this.setState({ text: value })
	}

	handleSubmit(event) {
		//alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
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
					  		<Row>
								<div className="input-field col s12">
						  			<input id="v_title" type="text" className="validate" />
						  			<label htmlFor="v_title">Vehicle Title</label>
								</div>
					  		</Row>

					  		<Row>
								<div className="input-field col s12">
									<ReactQuill id="v_description" className="v-desc" value={this.state.text} onChange={this.handleChange} theme="snow"/>
									{/* <textarea id="v_description" className="materialize-textarea"></textarea>
									<label htmlFor="v_description">Vehicle Description</label> */}
								</div>
					  		</Row>
							
					 		<Tabs defaultTab="general" vertical>
								<TabList>
									<Tab tabFor="general">General</Tab>
									<Tab tabFor="two">Tab 2</Tab>
									<Tab tabFor="three">Tab 3</Tab>
								</TabList>
								<TabPanel tabId="general">
									<div className="row section">
										<div className="col s12">
											<select name="condition" className="browser-default">
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
								</TabPanel>
								<TabPanel tabId="two">
									<p>Tab 2 content</p>
								</TabPanel>
								<TabPanel tabId="three">
									<p>Tab 3 content</p>
								</TabPanel>
							</Tabs>
							<div className="tabs-vertical">
								<Row>
									<Col s={4} m={3} l={3}>
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
									</Col>
									<div className="col s8 m9 l8">
									<div id="General" className="tab-content">
										<div className="row section">
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
									<div id="Features-Options" className="tab-content">
										<div className="row">
											<div className="col s4">
												<strong>Interior Features</strong>
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
													<option value="1">Honda</option>
													<option value="2">BMW</option>
													<option value="3">Hyundai</option>
													<option value="3">Ford</option>
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
											<div className="switch"><label>Featured<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
										</div>
													
										<div className="input-field col s6">
											<div className="switch"><label>Sold Out<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
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
								</Row>
							</div>
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


export default InsertVehicle;