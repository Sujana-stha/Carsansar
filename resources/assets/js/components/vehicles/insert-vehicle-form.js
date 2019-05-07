// Insert Vehicle

import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
// import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import ImagePreviewField from './imagePreview';
import AutocompleteField from './autocomplete-field';
import TextEditorField from './textEditor-field'
import { connect } from 'react-redux';


const renderInputField =({input, label, type, meta: {touched, error}})=> {
	return (
		<div className="input-field col s12">
			<input id={input.name} type={type} {...input}/>
			<label htmlFor={input.name}>{label}</label>
			<div className="error">
				{touched ? error: ''}
			</div>
		</div>
	)
}

const renderSelectField=({input, label, meta: {touched, error}, defaultValue, children})=> {
	return (
		<div className="col s12 mt-2 mb-4">
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

const renderCheckboxField=({input, label, type, meta: {touched, error}})=> {
	return(
		<div className="col s6">
			<label>
				<input type={type} className="filled-in" {...input} />
				<span>{label}</span>
			</label>
		</div>
	)
}
const renderOptionsList=({input, options, optCategories, meta: {touched, error}})=> {
	return optCategories.map((optCategory, i)=> {
		return (
			<div key={i} className="wr-options-list">
				<h4>{optCategory.optioncategory_desc}</h4>
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
let InsertVehicle = props => {

	const { handleSubmit } = props
	return (
		<div className="card-panel">
			<div className="row">
				<form onSubmit={ handleSubmit} className="col s12">
					<Field
						label="Vehicle Title"
						type = "text"
						name="title"
						component={renderInputField}
					/>
					  		
					<Field
						name="vehicle_description"
						label ="Vehicle Description"
						id="vehicle_description"
						component={TextEditorField}
					/>
					<div className="col s12 m12 l12 mt-6">
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
									<div className="col s6">
										<Field name="vehicle_status"
										label="Condition"
										component={renderSelectField}
										>
											<option value="">Choose your option</option>
											<option value="Used">Used</option>
											<option value="New">New</option>
										</Field>
									</div>
									<div className="col s6">
										<Field
										name="kms"
										label="KMS"
										type="text"
										component={renderInputField}
										/>
									</div>
									{props.isNewVehicle === "New" ? (
										<div className="input-field col s12">
											<p>Warranty Detailes</p>
											<Field
											name="warranty_flag"
											component={renderCheckboxField}
											type="checkbox"
											label="Warranty"
											/>
											<Field
											name="warranty_desc"
											component={TextEditorField}
											type="text"
											label="Warranty Description"
											/>
										</div>
									): null }

									<Field 
									name="trim"
									label ="Trim"
									type="text"
									component={renderInputField}
									/>

									<Field
									name="tech_specification"
									label="Technical Specifications"
									id="tech_specification"
									component={TextEditorField}
									/>

									<Field
									name="ad_desc"
									label="Additional Information"
									id="ad_desc"
									component={TextEditorField}
									/>
											
								</div>
							</TabPanel>
							<TabPanel tabId="vehicle-attributes">
								<div className="row">
									<div className="col s12 m6">
										<Field
										name="vin"
										label="Vin Number"
										type="text"
										id="vin"
										component={renderInputField}
										/>	
									</div>
									<div className="col s12 m6">
										<Field
										name="year"
										label="Year"
										value="1"
										component={renderSelectField}
										>
											<option value="">Choose your option</option>
											<option value="2016">2016</option>
											<option value="2017">2017</option>
											<option value="2018">2018</option>
										</Field>	
									</div>
									<div className="col s12 m6">
										<Field
										name="doors"
										label="Doors"
										type="text"
										component={renderInputField}
										/>
									</div>
									<div className="col s12 m6">
										<Field
										name="passenger"
										label="Passenger"
										type="text"
										component={renderInputField}
										/>
									</div>
									<Field name="category_id"
									label="Categories"
									itemList={props.categories}
									apiName="categories"
									component={AutocompleteField}
									/>

									<Field name="make_id"
									label="Makes"
									itemList={props.makes}
									apiName="makes"
									component={AutocompleteField}
									/>
									{/* <Field
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
									</Field> */}
									<Field name="model_id" 
									label="Model"
									itemList={props.models}
									apiName="models"
									component={AutocompleteField}
									/>

							  		<Field 
									name="body_id"
									label="Body"
									itemList={props.bodies}
									apiName="bodies"
									component={AutocompleteField}
									/>
												
									<Field
									name="enginesize_id"
									label="Engine"
									itemList={props.enginesizes}
									apiName="enginesizes"
									component={AutocompleteField}
									/>
										
									<Field
									name="drive_id"
									label="Drivetrain"
									itemList={props.drives}
									apiName="drives"
									component={AutocompleteField}
									/>

									<Field
									name="transmission_id"
									label="Transmission"
									itemList={props.transmissions}
									apiName="transmissions"
									component={AutocompleteField}
									/>

							  		<Field
									name="mfg_exterior_color_id"
									label="Manufacture Exterior Color"
									itemList={props.colors}
									apiName="colors"
									component={AutocompleteField}
									/>

									<Field
									name="exterior_color_id"
									label="Exterior Color"
									itemList={props.colors}
									apiName="colors"
									component={AutocompleteField}
									/>

									<Field
									name="interior_color_id"
									label="Interior Color"
									itemList={props.colors}
									apiName="colors"
									component={AutocompleteField}
									/>
											
									<Field
									name="fueltype_id"
									label="Fuel Type"
									itemList={props.fueltypes}
									apiName="fueltypes"
									component={AutocompleteField}
									/>
									<div className="col s12">		
										<Field
										name="fuel_economy"
										type="text"
										label="Fuel Economy"
										component={renderInputField}
										/>
									</div>		
									<div className="col s12">
										<p>Fuel Efficiency</p>
									</div>
									<div className="col s6">
							  			<Field
										name="city_mpg"
										type="text"
										label="City MPG"
										component={renderInputField}
										/>
									</div>
									<div className="col s6">
										<Field
										name="highway_mpg"
										type="text"
										label="Highway MPG"
										component={renderInputField}
										/>
												
									</div>
									<div className="col s12">
										<Field
											name="mileage"
											type="text"
											label="Mileage/Odometer"
											component={renderInputField}
										/>
									</div>
								</div>
							</TabPanel>
							<TabPanel tabId="features-options">
								<div className="wr-features-container">
									<Field
									name="option_id"
									component={renderOptionsList}
									options={props.options}
									optCategories={props.optCategories}
									/>
								</div>
							</TabPanel>
							<TabPanel tabId="pricing">
								<div className="row">
									<div className="col s6">
										<Field
										name="price"
										label="Actual Price"
										type="text"
										component={renderInputField}
										/>
									</div>
									<div className="col s6">
										<Field
										name="selling_price"
										label="Selling Price"
										type="text"
										component={renderInputField}
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
									component={renderSelectField}
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
										component={renderInputField}
										/>
									</div>
											
									<div className="col s6">
							  			<Field
										name="longitude"
										type="text"
										label="Longitude"
										component={renderInputField}
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
										component={renderCheckboxField}
										/>
									</div>
								</div>
								{props.hasFinance ? (
									<div className="card">
										<div className="card-content">
											<h4 className="card-title">Finance Form</h4>
											<div className="row">	
												<div className="col s6">
													<Field name="type"
													label="Type"
													type="text"
													component={renderInputField}
													/>
												</div>
												<div className="col s6">
													<Field name="payment"
													label="Payment"
													type="text"
													component={renderInputField}
													/>
												</div>
												<div className="col s6">
													<Field name="payment_type"
													label="Payment Type"
													type="text"
													component={renderInputField}
													/>
												</div>
												<div className="col s6">
													<Field name="downpayment"
													label="Down Payment"
													type="text"
													component={renderInputField}
													/>
												</div>
												<div className="col s6">
													<Field name="number_of_payment"
													label="Number of Payment"
													type="text"
													component={renderInputField}
													/>
												</div>
												<div className="col s6">
													<Field name="source"
													label="Source of Payment"
													type="text"
													component={renderInputField}
													/>
												</div>
												<div className="col s6">
													<Field name="odometer"
													label="Odometer"
													type="text"
													component={renderInputField}
													/>
												</div>
												<div className="col s6">
													<Field name="description"
													label="Description"
													type="text"
													component={renderInputField}
													/>
												</div>
											</div>
										</div>
									</div>
		  						):null}
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
	)
	
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

// export default reduxForm({
// 	form: 'PostVehicles',
// 	validate
// })(InsertVehicle);

InsertVehicle =  reduxForm({
	form: 'PostVehicles',
	validate
})(InsertVehicle);

const selector =  formValueSelector('PostVehicles');
InsertVehicle = connect(state=> {
	const isNewVehicle = selector(state, 'vehicle_status')
	const hasFinance =  selector(state, 'financing_flag')
	return {
		isNewVehicle,
		hasFinance
	};
})(InsertVehicle)

export default InsertVehicle;