import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import store from '../../store';
import { connect } from 'react-redux';

class MakeForm extends Component {
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
                <h4 className="header2">Add New Make</h4>

                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  } >
                            <Field 
                                label="Make Desciption"
                                name="make_desc"
                                type="text"
                                component={this.renderInputField} 
                            />
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    {this.props.sending ? (
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
}

function validate(values) {
    const errors = {}
    if(!values.make_desc) {
        errors.make_desc = "The Field is empty"
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