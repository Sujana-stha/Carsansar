import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as modelApi from '../../api/model-api';


class EditModel extends Component {
    componentDidMount() {
        const id = this.props.editId;
        modelApi.getSingleModels(id).then((response) => {
            const data =  response.data;
            this.props.initialize(data);
        })
    }
    
    handleInitialize() {
        
        console.log('length',this.props.models[0].id);
        for (var i = 0; i < this.props.models.length; i++ ) {
            if(this.props.models[i].id == id) {
                globalData = this.props.models[i]
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
                
                <h4 className="header2">Update Model</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Model Desciption"
                            name="model_desc"
                            type="text"
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

    if(!values.model_desc) {
        errors.model_desc = "The Field is empty"
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditModels'
})(EditModel);