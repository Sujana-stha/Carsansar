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
const DriveForm = props=> {
    
        const { handleSubmit } = props;
        return (
            <div>
                <h4 className="wr-header2">Add Drive</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Enter Drive"
                                name="drive_desc"
                                type="text"
                                component={renderInputField} 
                            />
                            
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
    if(!values.drive_desc) {
        errors.drive_desc = "This field is empty!"
    } else if (values.drive_desc.length > 30) {
        errors.drive_desc = "Must be 30 character or less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'PostDrives'
})(DriveForm);