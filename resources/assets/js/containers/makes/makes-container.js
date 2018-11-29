import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import * as makeApi from '../../api/makes-api';
import MakesList from '../../components/makes/makes';
import store from '../../store';
import { requestMakes } from  '../../actions/makes-action';
import { bindActionCreators } from 'redux';

class MakesListContainer extends Component {
    componentDidMount() {
        // makeApi.getMakes();
        this.props.requestMakes();
    }
    
    render() {
        console.log('app',this.props.makes)
        const { makes=[]} = this.props.makes;
        return (
            <div>
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
    return {
        makes: store.makeState.makes
    }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestMakes }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MakesListContainer);