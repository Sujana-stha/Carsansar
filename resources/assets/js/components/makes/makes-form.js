import React from 'react';
import { Field, reduxForm } from 'redux-form';
import store from '../../store';
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


const MakeForm =props=> {
    const { handleSubmit } = props;
    return (
        <div>
            <h4 className="wr-header2">Add Make</h4>
            <div className="card-panel">
                <div className="row">
                    <form className="col s12" onSubmit= { handleSubmit  } >
                        <Field 
                            label="Enter Make"
                            name="make_desc"
                            type="text"
                            component={renderInputField} 
                        />
                        <div className="row">
                            <div className="col s12">
                                {props.sending ? (
                                    <button className="btn cyan waves-effect waves-light" type="submit" name="action">Sending...
                                    </button>
                                ): (
                                    <button className="btn cyan waves-effect waves-light" type="submit" name="action">Add <i className="material-icons right">send</i>
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

function validate(values) {
    const errors = {}
    if(!values.make_desc) {
        errors.make_desc = "This field is empty."
    } else if (values.make_desc.length > 30) {
        errors.make_desc = "Must be 30 character or less!"
    }
    return errors;
}
function mapStateToProps(store) {
    return {
        sending: store.makeState.sending
    }
}

export default reduxForm({
    validate,
    form: 'PostMakes'
})(connect(mapStateToProps, null)(MakeForm));