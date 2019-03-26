import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as bodyApi from '../../api/bodies-api';

class EditBody extends Component {
    componentDidMount() {
        const id =  this.props.editId;
        bodyApi.getSingleBodies(id).then((response)=> {
            const data =  response.data;
            this.props.initialize(data);
        })
    }
    
    renderInputField({input, label, type, meta: {touched, error}}) {
        return (
            <div className="row">
				<div className="input-field col s12">
                    <input type={type} {...input}/>
                    <label className="active">{label}</label>
                    <div className="error">
                        {touched ? error: ''}
                    </div>
                </div>
            </div>
        )
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h4 className="wr-header2">Edit Body</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Enter Body style"
                            name="body_desc"
                            type="text"
                            value="body_desc"
                            component={this.renderInputField} 
                        />
                        
                        <div className="row">
								<div className="col s12">
									<button className="btn cyan waves-effect waves-light" type="submit" name="action">Update
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

    if(!values.body_desc) {
        errors.body_desc = "The Field is empty"
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditBodies'
})(EditBody);