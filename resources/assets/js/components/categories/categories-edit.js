import React, { Component } from 'react';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as categoryApi from '../../api/categories-api';


var globalData = null;


class EditCategory extends Component {
    componentDidMount() {
        this.handleInitialize();
        categoryApi.getCategories();
    }
    
    handleInitialize() {
        const id = this.props.editId;
        
        console.log('length',this.props.categories[0].id);
        for (var i = 0; i < this.props.categories.length; i++ ) {
            if(this.props.categories[i].id == id) {
                globalData = this.props.categories[i]
            }
        }
        this.props.initialize(globalData);
    }
    renderInputField({input, label, value, type, meta: {touched, error}}) {
        return (
            <div>
                <div className="row">
					<div className="input-field col s12">
                        <input value={value} type={type} {...input}/>
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
                
                <h4 className="header2">Update Category</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit= { handleSubmit  }>
                        <Field 
                            label="Category Desciption"
                            name="category_desc"
                            type="text"
                            value="category_desc"
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

    if(!values.category_desc) {
        errors.category_desc = "The Field is empty"
    }
    
    return errors;
}
function mapStateToProps(store) {
    return {
        categories: store.categoryState.categories
    }
}
export default reduxForm({
    validate,
    form: 'EditCategories'
})(connect(mapStateToProps, null)(EditCategory));