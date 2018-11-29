import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'; 
import { requestSubmitMakes } from '../../actions/makes-action'
// import * as makeApi from '../../api/makes-api';
import store from '../../store';
// import { bindActionCreators } from 'redux'


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
    
    // onSubmit(values) {
    //     // makeApi.addMakes(values);
    //     // this.props.history.push('/makes');
    //     // this.props.addMakesSuccess(values, ()=> {
    //     //     this.props.history.push('/makes')
    //     // })
    // }
    onSubmit(values) {
        // this.props.requestSubmitMakes(values, ()=> {
        //     this.props.history.push('/makes');
        // })
        this.props.requestSubmitMakes(values);
        // this.props.addMakesSuccess(values);
        // console.log(values)
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 mt-2 mb-2 right-align">
                        <NavLink to="/makes" className="btn waves-effect waves-light"><i className="material-icons left">view_list</i><span> All Make</span></NavLink>
                    </div>
                </div>
                <h4 className="header2">Add New Make</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                            <Field 
                                label="Make Desciption"
                                name="make_desc"
                                type="text"
                                component={this.renderInputField} 
                            />
                            {/* <Field 
                                label="Created By"
                                name="created_by"
                                type="text"
                                component={this.renderInputField} 
                            /> */}
                            <div className="row">
                                <div className="input-field col s12">
                                    <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Save
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
    //console.log(values);
    
    const errors = {}

    if(!values.make_desc) {
        errors.make_desc = "The Field is empty"
    }
    
    return errors;
}

function mapStateToProps(store) {
    return {
        makes: store.makeState.makes
    }
}
// const mapDispatchToProps = dispatch => {
//     bindActionCreators( {addMakesSuccess} , dispatch);
// } 
export default reduxForm({
    validate,
    form: 'PostMakes'
})(connect(mapStateToProps, {requestSubmitMakes})(MakeForm));