import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as fuelApi from '../../api/fueltypes-api';


class EditFueltype extends Component {
    componentDidMount() {
        const id = this.props.editId;
        fuelApi.getSingleFueltypes(id).then((response) => {
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
                
                <h4 className="header2">Update Fueltype</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Fueltype Desciption"
                            name="fueltype_desc"
                            type="text"
                            value="fueltype_desc"
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

    if(!values.fueltype_desc) {
        errors.fueltype_desc = "The Field is empty"
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditFueltypes'
})(EditFueltype);