import React from 'react';
import { Field, reduxForm } from 'redux-form';


const renderInputField=({input, label, type, meta: {touched, error}})=> {
    return (
            <div className="row">
                <div className="input-field col s12">
                    <input type={type} {...input}/>
                    <label>{label}</label>
                    <div className="error">
                        {touched ? error: ''}
                    </div>
                </div>
            </div>
    )
}

const EnginesizeForm = props=> {
    
        const { handleSubmit } = props;
        return (
            <div>
                <h4 className="header2">Add New Enginesize</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Enginesize Desciption"
                                name="enginesize_desc"
                                type="text"
                                component={renderInputField} 
                            />
                            
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

function validate(values) {
    const errors = {}
    if(!values.enginesize_desc) {
        errors.enginesize_desc = "The Field is empty"
    } else if (values.enginesize_desc > 30) {
        errors.enginesize_desc = "Must be 30 character or Less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'PostEnginesizes'
})(EnginesizeForm);