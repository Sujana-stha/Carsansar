import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import MakesList from '../../components/makes/makes';
import store from '../../store';
import { requestMakes, requestDeleteMakes, requestSubmitMake, requestMakesPages,requestUpdateMakes, requestMakesStatus } from  '../../actions/makes-action';


//COMPONENT
import MakeForm from './makes-form';
import EditMake from '../../components/makes/makes-edit';

var globalId = null

class MakesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editMakes = this.editMakes.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }

    hideMessage (e) {
        e.preventDefault();
        this.setState ({
            hide: false
        })
    }

    componentDidMount() {
        // call action to run the relative saga
        this.props.requestMakes();
    }

    // submit function for new data
    submitMake(values) {
        this.props.requestSubmitMake(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditMake(values) {
        this.props.requestUpdateMakes(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editMakes(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteMakeAction(makeId) {
        this.props.requestDeleteMakes(makeId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestMakesPages(pageNumber)
        
    }
    
    toggleStatus (makeId, status) {
        console.log('id', makeId)
        console.log('val', status)
        const newMakesStatus = {
            status: !status
        }
        this.props.requestMakesStatus(makeId, newMakesStatus)
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
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditMake onSubmit = {this.submitEditMake.bind(this)} editId = {globalId} />
                        ): (
                            <MakeForm onSubmit = { this.submitMake.bind(this) }/>
                        )}
                       
                    </div>
                    <div className="col s12 m9 l9">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Title</th>
                                    <th>Added by</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {this.props.makes.length ? (
                                <MakesList makes= {this.props.makes} onEdit = {this.editMakes} deleteMake = {this.props.requestDeleteMakes} makeStatus = {this.toggleStatus}/>

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
                </div>
            </div>
        );
    }
};

function mapStateToProps(store) {
    return {
        makes: store.makeState.makes,
        message: store.makeState.message,
        activePage: store.makeState.activePage,
        itemsCountPerPage: store.makeState.itemsCountPerPage,
        totalItemsCount: store.makeState.totalItemsCount,
        pageRangeDisplayed: store.makeState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestMakes, requestMakesPages, requestDeleteMakes, requestSubmitMake, requestUpdateMakes, requestMakesStatus})(MakesListContainer);