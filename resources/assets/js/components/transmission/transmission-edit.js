import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as Api from '../../api/transmission-api';

class EditTransmission extends Component {
    componentDidMount() {
        const id = this.props.editId;
        Api.getSingleTransmissions(id).then((response) => {
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
                
                <h4 className="header2">Edit Transmission</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Enter Transmission"
                            name="transmission_desc"
                            type="text"
                            value="transmission_desc"
                            component={this.renderInputField} 
                        />
                        
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

    if(!values.transmission_desc) {
        errors.transmission_desc = "The Field is empty"
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditTransmissions'
})(EditTransmission);