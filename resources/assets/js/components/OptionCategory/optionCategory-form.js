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
const OptionCategoryForm =props=> {
        const { handleSubmit } = props;
        return (
            <div>
                <h4 className="wr-header2">Add Option Categories</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Enter Option Category"
                                name="optioncategory_desc"
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
    if(!values.optioncategory_desc) {
        errors.optioncategory_desc = "This field is empty."
    } else if (values.optioncategory_desc.length > 40) {
        errors.optioncategory_desc= "Must be 40 character or less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'PostOptionCategory'
})(OptionCategoryForm);