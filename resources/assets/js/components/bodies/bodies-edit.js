import React, { Component } from 'react';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as bodyApi from '../../api/bodies-api';


var globalData = null;


class EditBody extends Component {
    componentDidMount() {
        this.handleInitialize();
        bodyApi.getBodies();
    }
    
    handleInitialize() {
        const id = this.props.editId;
        
        console.log('length',this.props.bodies[0].id);
        for (var i = 0; i < this.props.bodies.length; i++ ) {
            if(this.props.bodies[i].id == id) {
                globalData = this.props.bodies[i]
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
                
                <h4 className="header2">Update Body</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Body Desciption"
                            name="body_desc"
                            type="text"
                            value="body_desc"
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

    if(!values.body_desc) {
        errors.body_desc = "The Field is empty"
    }
    
    return errors;
}
function mapStateToProps(store) {
    return {
        bodies: store.bodyState.bodies
    }
}
export default reduxForm({
    validate,
    form: 'EditBodies'
})(connect(mapStateToProps, null)(EditBody));