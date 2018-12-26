import React, { Component } from 'react';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as optionCatApi from '../../api/option_cat-api';


var globalData = null;


class EditOptionCategory extends Component {
    componentDidMount() {
        this.handleInitialize();
        optionCatApi.getOptionsCategories();
    }
    
    handleInitialize() {
        const id = this.props.editId;
        
        console.log('length',this.props.optionCategories[0].oc_id);
        for (var i = 0; i < this.props.optionCategories.length; i++ ) {
            if(this.props.optionCategories[i].oc_id == id) {
                globalData = this.props.optionCategories[i]
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
                
                <h4 className="header2">Update Option Categories</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Make Desciption"
                            name="oc_desc"
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

    if(!values.oc_desc) {
        errors.oc_desc = "The Field is empty"
    }
    
    return errors;
}
function mapStateToProps(store) {
    return {
        optionCategories: store.OptCatState.optionCategories
    }
}
export default reduxForm({
    validate,
    form: 'EditOptionCategory'
})(connect(mapStateToProps, null)(EditOptionCategory));