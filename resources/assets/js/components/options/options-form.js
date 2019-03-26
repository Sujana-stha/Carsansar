import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField=({input, label, type, meta: {touched, error}})=> {
    return (
            <div className="row">
                <div className="input-field col s12">
                    <input  type={type} {...input}/>
                    <label>{label}</label>
                    <div className="error">
                        {touched ? error: ''}
                    </div>
                </div>
            </div>
    )
}
const renderSelectField=({input, label, meta: {touched, error}, defaultValue, children})=> {
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
const OptionsForm = props => {
        const { handleSubmit } = props;
        return (
            <div>
                <h4 className="wr-header2">Add Options</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Enter Options"
                                name="option_desc"
                                type="text"
                                component={renderInputField} 
                            />
                                
                            <Field 
                                name="oc_id"
                                component={renderSelectField}
                                label="Option Categories"
                                value = "4"
                            >
                                {props.optionLists.map((optionList) => {
                                    return (
                                        <option key= {optionList.id} value={optionList.id} >{optionList.optioncategory_desc}</option>
                                    )
                                })}
                            </Field>
                            <div className="row">
                                <div className="col s12">
                                    <button className="btn cyan waves-effect waves-light" type="submit" name="action">Add
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