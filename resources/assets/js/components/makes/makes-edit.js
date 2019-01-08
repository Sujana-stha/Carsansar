import React, { Component } from 'react';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import * as makeApi from '../../api/makes-api';


class EditMake extends Component {
    componentDidMount() {
        const id =  this.props.editId;
        makeApi.getSingleMakes(id).then((response)=> {
            console.log('respp',response);
            const data =  response.data;
            this.props.initialize(data);
        })
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
                <h4 className="header2">Update Make</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Make Desciption"
                            name="make_desc"
                            type="text"
                            value="make_desc"
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

    if(!values.make_desc) {
        errors.make_desc = "The Field is empty"
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditMakes',
})(EditMake);