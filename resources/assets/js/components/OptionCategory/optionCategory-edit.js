import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as optionCatApi from '../../api/option_cat-api';


class EditOptionCategory extends Component {
    componentDidMount() {
        const id = this.props.editId;
        optionCatApi.getOptionsCategories(id).then((response)=> {
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
                
                <h4 className="wr-header2">Edit Option Categories</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                            <Field 
                                label="Enter Option Categories"
                                name="optioncategory_desc"
                                type="text"
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

    if(!values.optioncategory_desc) {
        errors.optioncategory_desc = "The Field is empty"
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditOptionCategory'
})(EditOptionCategory);