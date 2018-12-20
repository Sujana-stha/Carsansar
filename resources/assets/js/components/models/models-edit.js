import React, { Component } from 'react';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as modelApi from '../../api/model-api';


var globalData = null;


class EditModel extends Component {
    componentDidMount() {
        this.handleInitialize();
        modelApi.getModel();
    }
    
    handleInitialize() {
        const id = this.props.editId;
        
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
                        <label>{label}</label>
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
                            label="Make Desciption"
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
function mapStateToProps(store) {
    return {
        models: store.modelState.models
    }
}
export default reduxForm({
    validate,
    form: 'EditModels'
})(connect(mapStateToProps, null)(EditModel));