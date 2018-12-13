import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
// import * as makeAction from '../../actions/makes-action';
import axios from 'axios';
// import * as makeApi from '../../api/makes-api';
import MakesList from '../../components/makes/makes';
import store from '../../store';
import { requestMakes, requestDeleteMakes, requestSubmitMake, requestMakesPages } from  '../../actions/makes-action';
import { bindActionCreators } from 'redux';


//COMPONENT
import MakeForm from './makes-form';

class MakesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            
        }
        this.handlePageChange = this.handlePageChange.bind(this)
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
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestMakesPages(pageNumber)
        // this.setState({activePage: pageNumber});
        // axios.get('http://127.0.0.1:8000/api/makes?page='+pageNumber)
        // .then(response => {
        //     this.setState({
        //         itemsCountPerPage: response.data.per_page,
        //         totalItemsCount: response.data.total,
        //         activePage: response.data.current_page
        //     })
        // })
    }
    
    render() {
        console.log('prop', this.props.makes)
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
                <div className="col s12 mt-2 mb-2 left-align">
                    <Pagination
                    activePage={this.props.activePage}
                    itemsCountPerPage={this.props.itemsCountPerPage}
                    totalItemsCount={this.props.totalItemsCount}
                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                    onChange={this.handlePageChange}
                    firstPageText='First'
                    lastPageText='Last'
                    />
                </div>
            </div>
        );
    }
};

function mapStateToProps(store) {
    console.log('sss', store.makeState)
    return {
        makes: store.makeState.makes,
        message: store.makeState.message,
        activePage: store.makeState.activePage,
        itemsCountPerPage: store.makeState.itemsCountPerPage,
        totalItemsCount: store.makeState.totalItemsCount,
        pageRangeDisplayed: store.makeState.pageRangeDisplayed
    }
}
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ requestMakes, requestDeleteMakes, requestSubmitMakes }, dispatch);
export default connect(mapStateToProps, {requestMakes, requestMakesPages, requestDeleteMakes, requestSubmitMake})(MakesListContainer);