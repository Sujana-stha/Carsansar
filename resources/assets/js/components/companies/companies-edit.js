import React, { Component } from 'react';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';


var globalData = null;


class EditCompany extends Component {
    componentDidMount() {
        this.handleInitialize();
    }
    
    handleInitialize() {
        const id = this.props.editId;
        // console.log('length',this.props.drives[0].id);

        for (var i = 0; i < this.props.companies.length; i++ ) {
            if(this.props.companies[i].id == id) {
                globalData = this.props.companies[i]
            }
        }
        this.props.initialize(globalData);
    }
    renderInputField({input, label, type, meta: {touched, error}}) {
        return (
            <div>
                <div className="row">
					<div className="input-field col s12">
                        <input type={type} {...input}/>
                        <label className="active">{label}</label>
                        <div className="error">
                            {touched ? error: ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                
                <h4 className="header2">Update Company</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <div className="col s12 14 m4">
                            <Field 
                                label="Company Code"
                                name="company_cd"
                                type="text"
                                value="company_cd"
                                component={this.renderInputField} 
                            />
                        </div>
                        <div className="col s12 14 m4">
                            <Field 
                                label="Company Name"
                                name="name"
                                type="text"
                                value="name"
                                component={this.renderInputField} 
                            />
                        </div>
                        <div className="col s12 14 m4">
                            <Field 
                                label="Contact Number"
                                name="contact_no"
                                type="number"
                                value="contact_no"
                                component={this.renderInputField} 
                            />
                        </div>
                        <div className="col s12 16 m6">
                            <Field 
                                label="Company Address"
                                name="address"
                                type="text"
                                value="address"
                                component={this.renderInputField} 
                            />
                        </div>
                        <div className="col s12 16 m6">
                            <Field 
                                label="Company Email"
                                name="email"
                                type="email"
                                value="email"
                                component={this.renderInputField} 
                            />
                        </div>
                        
                        <div className="row">
								<div className="input-field col s12">
									<button className="btn cyan waves-effect waves-light right" type="submit" name="action">Update
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

    if(!values.company_cd) {
        errors.company_cd = "The Field is empty"
    }
    if(!values.name) {
        errors.name = "This Fiels is empty"
    }

    if(!values.address) {
        errors.address = "This Fiels is empty"
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(!values.contact_no) {
        errors.contact_no = "This Fiels is empty"
    } 
    
    return errors;
}
function mapStateToProps(store) {
    return {
        companies: store.companyState.companies
    }
}
export default reduxForm({
    validate,
    form: 'EditCompanies'
})(connect(mapStateToProps, null)(EditCompany));