import React, { Component } from 'react';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as enginesizeApi from '../../api/enginesize-api';


var globalData = null;


class EditEnginesize extends Component {
    componentDidMount() {
        this.handleInitialize();
        enginesizeApi.getEnginesizes();
    }
    
    handleInitialize() {
        const id = this.props.editId;
        // console.log('length',this.props.drives[0].id);

        for (var i = 0; i < this.props.enginesizes.length; i++ ) {
            if(this.props.enginesizes[i].id == id) {
                globalData = this.props.enginesizes[i]
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
                
                <h4 className="header2">Update Enginesize</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Enginesize Desciption"
                            name="enginesize_desc"
                            type="text"
                            value="enginesize_desc"
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

    if(!values.enginesize_desc) {
        errors.enginesize_desc = "The Field is empty"
    }
    
    return errors;
}
function mapStateToProps(store) {
    return {
        enginesizes: store.enginesizeState.enginesizes
    }
}
export default reduxForm({
    validate,
    form: 'EditEnginesizes'
})(connect(mapStateToProps, null)(EditEnginesize));