import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField= ({input, label, type, meta: {touched, error}})=> {
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

const CategoryForm = props => {
        const { handleSubmit } = props;
        return (
            <div>
                <h4 className="wr-header2">Add Categories</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Enter Category"
                                name="category_desc"
                                type="text"
                                component={renderInputField} 
                            />
                            
                            <div className="row">
                                <div className="col s12">
                                    <button className="btn cyan waves-effect waves-light" type="submit" name="action">Save
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

const validate =(values) => {
    const errors = {}
    if(!values.category_desc) {
        errors.category_desc = "This field is empty."
    } else if(values.category_desc.length > 30) {
        errors.category_desc = "Must be 30 character or less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'PostCategories'
})(CategoryForm);