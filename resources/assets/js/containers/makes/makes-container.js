import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import * as makeApi from '../../api/makes-api';
import MakesList from '../../components/makes/makes';
import store from '../../store';
import { requestMakes, requestDeleteMakes } from  '../../actions/makes-action';
import { bindActionCreators } from 'redux';

class MakesListContainer extends Component {
    componentDidMount() {
        // makeApi.getMakes();
        this.props.requestMakes();
    }
    
    render() {
        console.log('app',this.props.makes)
        return (
            <div>
                {this.props.message.trim().length ? (
                   
                    <div id="card-alert" className="card green">
                        <div className="card-content white-text">
                            <p>{this.props.message}</p>
                        </div>
                        <button type="button" className="close white-text" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                ): (
                    <div></div>
                )}
                <div id="confirm-box" className="modal">
                    <div className="modal-content">
                        
                        <p>Do you want to permanently delete this item?</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Delete</a>
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">close</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 mt-2 mb-2 right-align">
                        <NavLink to="/add-make" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add Makes</span></NavLink>
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
                        <MakesList makes= {this.props.makes} deleteMake = {makeApi.deleteMake}/>

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
    console.log('mae', store.makeState)
    return {
        makes: store.makeState.makes,
        message: store.makeState.message
    }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestMakes, requestDeleteMakes }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MakesListContainer);