import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as colorApi from '../../api/color-api';

class EditColor extends Component {
    componentDidMount() {
        const id =  this.props.editId;
        colorApi.getSingleColors(id).then((response)=> {
            const data =  response.data;
            this.props.initialize(data);
        })
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
                <h4 className="header2">Update Color</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                            <Field 
                                label="Color Code"
                                name="color_cd"
                                type="text"
                                value="color_cd"
                                component={this.renderInputField} 
                            />
                            <Field 
                                label="Color Desciption"
                                name="color_desc"
                                type="text"
                                value="color_desc"
                                component={this.renderInputField} 
                            />
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
    if(!values.color_cd) {
        errors.color_cd = "The Field is Empty!"
    } else if (values.color_cd.length > 20) {
        errors.color_cd = "Must be 20 Character or less!"
    }
    if(!values.color_desc) {
        errors.color_desc = "The Field is empty"
    } else if (values.color_desc.length > 20) {
        errors.color_desc = "Must be 20 Character or less!"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditColors',
})(EditColor);