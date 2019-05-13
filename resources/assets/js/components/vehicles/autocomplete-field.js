import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/lib/Creatable';
import Select from 'react-select';
import {requestVehicleAttrCreate} from '../../actions/deals-action';
import {requestLoggedUser} from '../../actions/users-action';

import store from '../../store';

class AutocompleteField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            value: undefined,
            loading: false,
            placeholderText: 'Select one...'
        }
    }
    componentDidMount() {
        this.props.requestLoggedUser();
    }
    handleFocus(itemList) {
        const option = Object.keys(itemList).map((item) => ({label:itemList[item], value: item }))
        const optionsList = [...option, this.props.newOptions]
        this.setState({
            options: optionsList,
            placeholderText: 'Type new here...'
        })
    }
    handleBlur() {
        this.setState({
            placeholderText: 'Select one...'
        })
    }
    handleChange(newValue) {
        this.setState({ value: newValue });
        if(newValue) {
            this.props.input.onChange(newValue.value)
        } else {
            this.props.input.onChange(null)
        }
    }
    handleCreate(inputValue) {
        this.setState({ loading: true });
        this.props.requestVehicleAttrCreate(inputValue, this.props.apiName)
        setTimeout(()=> {
            const{options} = this.state
            const newOptions = this.props.newOptions
            this.setState({
                loading: false,
                options: [...options, newOptions],
                value: newOptions
            });
            if(newOptions) {
                this.props.input.onChange(newOptions.value)
            } else {
                this.props.input.onChange(null)
            }
        }, 8000);
    }   
    render() {
        const authUser = window.Laravel.super_admin
        const { itemList, input, loggedUser } = this.props
        if(loggedUser.name == authUser || loggedUser.role == "Manager") {
            return (
                <div className="col s12 wr-select-field">
                    <label className="col s12 m4">{this.props.label} :</label>
                    
                    <div className="col s12 m8">
                        <CreatableSelect
                        className="wr-select-box"
                        {...input}
                        isClearable
                        placeholder={this.state.placeholderText}
                        onFocus={() => this.handleFocus(itemList)}
                        onBlur={() => this.handleBlur()}
                        isDisabled={this.state.loading}
                        isLoading={this.state.loading}
                        onChange={this.handleChange.bind(this)}
                        onCreateOption={this.handleCreate.bind(this)}
                        options={this.state.options}
                        value={this.state.value ? this.state.value : input.value }
                        /> 
                    </div> 
                </div>
            );
        } else {
            return (
                <div className="col s12 wr-select-field">
                    <label className="col s12 m4">{this.props.label} :</label>
                    <div className="col s12 m8">
                        <Select
                        {...input}
                        className="wr-select-box"
                        isClearable
                        placeholder={this.state.placeholderText}
                        onFocus={() => this.handleFocus(itemList)}
                        onBlur={() => this.handleBlur()}
                        isDisabled={this.state.loading}
                        isLoading={this.state.loading}
                        onChange={this.handleChange.bind(this)}
                        options={this.state.options}
                        value={this.state.value ? this.state.value : input.value }
                        />
                    </div>
                </div>
            )
        }
    }
}
function mapStateToProps(store) {
    return {
        loggedUser: store.userState.loggedUser,
        newOptions: store.dealState.optionList
    }
}
export default connect(mapStateToProps, { requestLoggedUser,requestVehicleAttrCreate})(AutocompleteField);