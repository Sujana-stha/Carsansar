import React, { Component } from 'react';
// import MakesForm from '../../containers/makes/makes-form';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as makeApi from '../../api/makes-api';
import { requestUpdateMakes } from '../../actions/makes-action';


var globalData = null;


class EditMake extends Component {
    componentDidMount() {
        // console.log('id',this.props.match.params.id);
        this.handleInitialize();
        makeApi.getMakes();
        console.log('mmm',this.props.makes);
    }
    
    handleInitialize() {
        const id = this.props.match.params.id;
        
        console.log('length',this.props.makes[0].id);
        for (var i = 0; i < this.props.makes.length; i++ ) {
            if(this.props.makes[i].id == id) {
                globalData = this.props.makes[i]
                console.log('ds',globalData)
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
                        <label>{label}</label>
                        <div className="error">
                            {touched ? error: ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    onSubmit(makeId, values) {
        // makeApi.updateMake(makeId, values);
        // this.props.history.push('/makes');
        // this.props.addMakesSuccess(values, ()=> {
        //     this.props.history.push('/makes')
        // })
        this.props.requestUpdateMakes(makeId, values)
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 mt-2 mb-2 right-align">
                        <NavLink to="/makes" className="btn waves-effect waves-light"><i className="material-icons left">view_list</i><span> All Make</span></NavLink>
                    </div>
                </div>
                <h4 className="header2">Update Make</h4>
                <div className="card-panel">
					<div className="row">
                        <form className="col s12" onSubmit={this.props.handleSubmit((event)=>this.onSubmit(globalData.id, event))}>
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
export default reduxForm({
    validate,
    form: 'EditMakes'
})(connect(mapStateToProps, {requestUpdateMakes})(EditMake));