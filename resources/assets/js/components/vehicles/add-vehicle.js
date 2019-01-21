import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';

class AddVehicles extends Component {
    render() {
        return (
            <div className="row">
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
                            <div className="input-field col s12">
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

                            <div className="input-field col s12">
								<textarea id="v_technical_specifications" className="materialize-textarea"></textarea>
								<label htmlFor="v_technical_specifications">Technical Specifications</label>
							</div>

                            <div className="input-field col s12">
								<textarea id="v_additional_information" className="materialize-textarea"></textarea>
								<label htmlFor="v_additional_information">Additional Information</label>
							</div>
                        </div>
					</TabPanel>
					<TabPanel tabId="vehicle-attributes">
						<div className="row">
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
                        </div>
					</TabPanel>
					<TabPanel tabId="features-options">
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
					</TabPanel>
					<TabPanel tabId="pricing">
						<div className="row">
                            <div className="input-field col s6">
								<input id="current_price" type="text" className="validate" />
								<label htmlFor="current_price">Current Price</label>
							</div>
							<div className="input-field col s6">
								<input id="actual_price" type="text" className="validate" />
								<label htmlFor="actual_price">Actual Price</label>
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
        );
    }
}

export default AddVehicles;