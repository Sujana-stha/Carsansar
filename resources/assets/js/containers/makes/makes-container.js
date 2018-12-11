import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as makeAction from '../../actions/makes-action';
// import * as makeApi from '../../api/makes-api';
import MakesList from '../../components/makes/makes';
import store from '../../store';
import { requestMakes, requestDeleteMakes, requestSubmitMake } from  '../../actions/makes-action';
import { bindActionCreators } from 'redux';


//COMPONENT
import MakeForm from './makes-form';

class MakesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true
        }
    }
    hideMessage (e) {
        e.preventDefault();
        this.setState ({
            hide: false
        })
    }
    componentDidMount() {
        // makeApi.getMakes();
        this.props.requestMakes();
    }
    submitMake(values) {
        console.log('vaaa',values);
        
        this.props.requestSubmitMake(values);
    }
    deleteMakeAction(makeId) {
        this.props.requestDeleteMakes(makeId);
    }
    
    render() {
        return (
            <div>
                {this.props.message.trim().length && this.state.hide ? (
                   
                    <div id="card-alert" className="card green">
                        <div className="card-content white-text">
                            <p>{this.props.message}</p>
                        </div>
                        <button type="button" className="close white-text" data-dismiss="alert" aria-label="Close">
                            <span onClick={this.hideMessage.bind(this)} aria-hidden="true">×</span>
                        </button>
                    </div>
                ): (
                    <div></div>
                )}
                
                <div className="row">
                    <div className="col s12 mt-2 mb-2 ">
                        {/* <NavLink to="/add-make" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add Makes</span></NavLink> */}
                        <MakeForm onSubmit = { this.submitMake.bind(this) }/>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Added by</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {this.props.makes.length ? (
                        <MakesList makes= {this.props.makes} deleteMake = {this.props.requestDeleteMakes}/>

                    ) : (
                        <tbody>
                            <tr>
                                <td >No Results Found !</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }
};

function mapStateToProps(store) {
    return {
        makes: store.makeState.makes,
        message: store.makeState.message
    }
}
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ requestMakes, requestDeleteMakes, requestSubmitMakes }, dispatch);
export default connect(mapStateToProps, {requestMakes, requestDeleteMakes, requestSubmitMake})(MakesListContainer);