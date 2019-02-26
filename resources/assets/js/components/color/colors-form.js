import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

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

const ColorForm =props => {
        const { handleSubmit } = props;
        return (
            <div>
                <h4 className="header2 wr-header2">Add New Color</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Color Code"
                                name="color_cd"
                                type="text"
                                component={renderInputField} 
                            />
                            <Field 
                                label="Color Desciption"
                                name="color_desc"
                                type="text"
                                component={renderInputField} 
                            />
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    {props.sending ? (
                                        <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Sending...
                                        </button>
                                    ): (
                                        <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Save
                                            <i className="material-icons right">send</i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    
}

const validate=(values)=> {
    const errors = {}
    if(!values.color_cd) {
        errors.color_cd = "The Field is Empty!"
    } else if (values.color_cd.length > 20) {
        errors.color_cd = "Must be 20 Character or less!"
    }
    if(!values.color_desc) {
        errors.color_desc = "The Field is empty"
    } else if (values.color_desc.length > 20) {
        errors.color_desc = "Must be 20 Character or less!"
    }
    return errors;
}
function mapStateToProps(store) {
    return {
        sending: store.colorState.sending
    }
}

export default reduxForm({
    validate,
    form: 'PostColors'
})(connect(mapStateToProps, null)(ColorForm));