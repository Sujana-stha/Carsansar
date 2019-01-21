import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import store from '../../store';
import {connect} from 'react-redux';


class OptionsForm extends Component {
    constructor() {
        super();
        this.state = {
            value: 1
        }
    }
    componentDidMount() {
        // $('select').material_select('destroy');
       
    }

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
    renderSelectField({input, label, meta: {touched, error}, defaultValue, children}) {
        return (
            <div>
                <label>{label}</label>
                <select value={defaultValue} {...input} className="browser-default">
                    {children}
                </select>
                <div className="error">
                    {touched ? error: ''}
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
                            <div>
                                
                                <Field 
                                    name="oc_id"
                                    component={this.renderSelectField}
                                    label="Option Categories"
                                    value = "4"
                                >
                                    {this.props.optionLists.map((optionList) => {
                                        return (
                                            <option key= {optionList.id} value={optionList.id} >{optionList.optioncategory_desc}</option>
                                        )
                                    })}
                                </Field>
                            </div>
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
    console.log('values', values)
    if(!values.option_desc) {
        errors.option_desc = "The Field is empty"
    } else if (values.option_desc.length > 30) {
        errors.option_desc = "Must be 30 character or Less!"
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