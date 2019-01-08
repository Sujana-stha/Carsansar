import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import store from '../../store';
import {connect} from 'react-redux';


class OptionsForm extends Component {
    
    renderInputField({input, label, type, meta: {touched, error}}) {
        return (
            <div>
                <div className="row">
					<div className="input-field col s12">
                        <input  type={type} {...input}/>
                        <label>{label}</label>
                        <div className="error">
                            {touched ? error: ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    renderSelectField({input, label, meta: {touched, error},children}) {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <select className="browser-default">
                        {children}
                    </select>
                    <label>{label}</label>
                    <div className="error">
                        {touched ? error: ''}
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const { handleSubmit } = this.props;
        console.log('ppp', this.props)
        return (
            <div>
                <h4 className="header2">Add New Options</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Options Desciption"
                                name="option_desc"
                                type="text"
                                component={this.renderInputField} 
                            />
                            
                                    <Field 
                                    name="oc_id"
                                    label="Option Categories"
                                    component={this.renderSelectField}
                                    >
                                      
                                        {this.props.optionLists.map((optionList) => {
                                            return (
                                                <option key= {optionList.oc_id} value={optionList.oc_id}>{optionList.oc_desc}</option>
                                            )
                                        })}
                                    </Field>
                                
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Save
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
console.log('val', values)
    if(!values.option_desc) {
        errors.option_desc = "The Field is empty"
    }
    if(!values.oc_id) {
        errors.oc_id = "The Field is empty"
    }
    return errors;
}

export default reduxForm({
    form: 'PostOptions', // a unique identifier for this form
    validate,
  })(OptionsForm)