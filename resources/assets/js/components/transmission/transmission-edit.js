import React, { Component } from 'react';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';


var globalData = null;


class EditTransmission extends Component {
    componentDidMount() {
        this.handleInitialize();
    }
    
    handleInitialize() {
        const id = this.props.editId;
        // console.log('length',this.props.drives[0].id);

        for (var i = 0; i < this.props.transmissions.length; i++ ) {
            if(this.props.transmissions[i].id == id) {
                globalData = this.props.transmissions[i]
            }
        }
        this.props.initialize(globalData);
    }
    renderInputField({input, label, type, meta: {touched, error}}) {
        return (
            <div>
                <div className="row">
					<div className="input-field col s12">
                        <input type={type} {...input}/>
                        <label className="active">{label}</label>
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
                
                <h4 className="header2">Update Transmission</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Transmission Desciption"
                            name="transmission_desc"
                            type="text"
                            value="transmission_desc"
                            component={this.renderInputField} 
                        />
                        
                        <div className="row">
								<div className="input-field col s12">
									<button className="btn cyan waves-effect waves-light right" type="submit" name="action">Update
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

    if(!values.transmission_desc) {
        errors.transmission_desc = "The Field is empty"
    }
    
    return errors;
}
function mapStateToProps(store) {
    return {
        transmissions: store.transmissionState.transmissions
    }
}
export default reduxForm({
    validate,
    form: 'EditTransmissions'
})(connect(mapStateToProps, null)(EditTransmission));