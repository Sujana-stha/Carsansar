import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as api from '../../api/deals-api';

class VehcilesSearchComponent extends Component {
    constructor() {
        super();
        this.state = {
            makes: {},
            years: { 1:2013, 2:2015, 3:2016, 4:2012, 5:2010, 6:2014},
            models: {},
            bodies: {},
            transmissions: {},
            prices: {1: "$10,000", 2: "$20,000", 3: "$25,000", 4: "$50,000"}
        }
    }
    
    componentDidMount() {
        api.getMakesList().then(response => {
            this.setState({makes: response.data})
        })
        api.getModelsList().then(response => {
            this.setState({models: response.data})
        })
        api.getBodiesList().then(response=> {
            this.setState({bodies: response.data})
        })
        api.getTransmissionList().then(response => {
            this.setState({transmissions: response.data})
        })
    }
    renderSelectField({input, label, children, meta: {touched, error}}) {
        return (
            <div className="col s12 m2 wr-vehicles-attr-field">
                <label>{label}</label>
                <select {...input} className="browser-default wr-vehicles-attr-select">
                    {children}
                </select>
                <div className="error">
                    {touched ? error: ''}
                </div>
            </div>
        )
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Field name="years"
                    label="Years"
                    component={this.renderSelectField}>
                        <option className="wr-vehicles-options" value="">All Years</option>
                        {Object.keys(this.state.years).map((year, i)=> {
							return (
								<option key={i} value={this.state.years[year]}>{this.state.years[year]}</option>
							)
						})}
                    </Field>
                    <Field
                    name="makes"
                    label="Makes"
                    component={this.renderSelectField}
                    >
                        <option value="">All Makes</option>
                        {Object.keys(this.state.makes).map((make, i)=> {
							return (
								<option key={i} value={this.state.makes[make]}>{this.state.makes[make]}</option>
							)
						})}
                    </Field>
                    <Field
                    name="models"
                    label="Models"
                    component={this.renderSelectField}
                    >
                        <option value="">All Models</option>
                        {Object.keys(this.state.models).map((model, i)=> {
							return (
								<option key={i} value={this.state.models[model]}>{this.state.models[model]}</option>
							)
						})}
                    </Field>
                    <Field
                    name="bodies"
                    label="Body Types"
                    component={this.renderSelectField}
                    >
                        <option value="">All Body Types</option>
                        {Object.keys(this.state.bodies).map((body, i)=> {
							return (
								<option key={i} value={this.state.bodies[body]}>{this.state.bodies[body]}</option>
							)
						})}
                    </Field>
                    <Field
                    name="transmission"
                    label="Transmissions"
                    component={this.renderSelectField}
                    >
                        <option value="">All Transmissions</option>
                        {Object.keys(this.state.transmissions).map((transmission, i)=> {
							return (
								<option key={i} value={this.state.transmissions[transmission]}>{this.state.transmissions[transmission]}</option>
							)
						})}
                    </Field>
                    <Field name="prices"
                    label="Prices"
                    component={this.renderSelectField}>
                        <option value="">All Prices</option>
                        {Object.keys(this.state.prices).map((price, i)=> {
							return (
								<option key={i} value={this.state.prices[price]}>{this.state.prices[price]}</option>
							)
						})}
                    </Field>
                    <button type="submit" className="btn mt-2 ml-2">Search</button>
                </form> 
            </div>
        );
    }
}

function validate(values) {
    console.log('value', values);
}

export default reduxForm({
    validate,
    form: 'VehicleSearchForm'
})(VehcilesSearchComponent)