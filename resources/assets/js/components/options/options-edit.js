import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as Api from '../../api/options-api'


class EditOption extends Component {
    
    componentDidMount() {
        const id =  this.props.editId;
        Api.getSingleOptions(id).then((response)=> {
            console.log('respp',response);
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
                <h4 className="wr-header2">Edit Options</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Enter Options"
                            name="option_desc"
                            type="text"
                            value="option_desc"
                            component={this.renderInputField} 
                        />
                        <div>
                            <label>Option Categories</label>
                            <Field 
                                name="oc_id"
                                component="select"
                                className="browser-default"
                                value="oc_id"
                            >
                                {this.props.optionLists.map((optionList) => {
                                    return (
                                        <option key= {optionList.id} value={optionList.id}>{optionList.optioncategory_desc}</option>
                                    )
                                })}
                            </Field>
                        </div>
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

    if(!values.option_desc) {
        errors.option_desc = "The Field is empty"
    }
    if(!values.oc_id) {
        errors.oc_id = "The Field is empty"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditOptions'
})(EditOption);