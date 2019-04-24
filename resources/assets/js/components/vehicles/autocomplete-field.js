import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/lib/Creatable'
import {requestVehicleAttrCreate} from '../../actions/deals-action'
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
            console.log(newOptions)
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
        const { itemList, input } = this.props
        return (
            <div className="col s12 wr-select-field">
                <label>{this.props.label}</label>
                <CreatableSelect
                className="wr-select-box"
                {...input}
                isClearable
                placeholder={this.state.placeholderText}
                onFocus={() => {
                    const option = Object.keys(itemList).map((item) => ({label:itemList[item], value: item }))
                    const optionsList = [...option, this.props.newOptions]
                    this.setState({
                        options: optionsList,
                        placeholderText: 'Type new here...'
                    })
                }}
                onBlur={() => {
                    this.setState({
                        placeholderText: 'Select one...'
                    })
                }}
                isDisabled={this.state.loading}
                isLoading={this.state.loading}
                onChange={this.handleChange.bind(this)}
                onCreateOption={this.handleCreate.bind(this)}
                options={this.state.options}
                defaultValue={input.value =="" ? this.state.value : input.value}
                />
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
        newOptions: store.dealState.optionList
    }
}
export default connect(mapStateToProps, {requestVehicleAttrCreate})(AutocompleteField);