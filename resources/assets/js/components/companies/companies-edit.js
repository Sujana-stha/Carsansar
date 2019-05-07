import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as companyApi from '../../api/companies-api'

class EditCompany extends Component {
    componentDidMount() {
        const id = this.props.editId;
        companyApi.getSingleCompanies(id).then((response)=> {
            const data =  response.data;
            this.props.initialize(data);
        })
    }
    
    renderInputField({input, label, type, meta: {touched, error}}) {
        return (
                <div className="row">
					<div className="input-field col s12">
                        <input type={type} {...input}/>
                        <label className="active">{label}</label>
                        <div className="error">
                            {touched ? error: ''}
                        </div>
                    </div>
                </div>
        )
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h4 className="wr-header2">Edit Company</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <div className="col s12 14 m4">
                            <Field 
                                label="Enter Company Code"
                                name="company_cd"
                                type="text"
                                value="company_cd"
                                component={this.renderInputField} 
                            />
                        </div>
                        <div className="col s12 14 m4">
                            <Field 
                                label="Enter Company Name"
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
								<div className="col s12">
									<button className="btn cyan waves-effect waves-light" type="submit" name="action">Update
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
        errors.company_cd = "This field is empty."
    } else if(values.company_cd.length > 25) {
        errors.company_cd = "Must be 25 character or less!"
    }

    if(!values.name) {
        errors.name = "This field is empty."
    } else if(values.name.length > 50) {
        errors.name = "Must be 50 character or less!"
    }

    if(!values.address) {
        errors.address = "This field is empty."
    } else if (values.address.length > 100) {
        errors.address = "Must be 50 character or less!"
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 50) {
        errors.email = "Must be 50 character or less!"
    }
    if(!values.contact_no) {
        errors.contact_no = "This field is empty!"
    } else if(values.contact_no.length > 15) {
        errors.contact_no = "Must be 15 character or less!"
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditCompanies'
})(EditCompany);