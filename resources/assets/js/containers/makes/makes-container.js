import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import MakesList from '../../components/makes/makes';
import store from '../../store';
import { requestMakes, requestDeleteMakes, requestSubmitMake, requestMakesPages,requestUpdateMakes, requestMakesStatus } from  '../../actions/makes-action';

//COMPONENT
import MakeForm from './makes-form';
import EditMake from '../../components/makes/makes-edit';

class MakesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editMakes = this.editMakes.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)

    }

    componentDidMount() {
        // call action to run the relative saga
        this.props.requestMakes();
        // page = this.props.activePage;

    }

    // submit function for new data
    submitMake(values) {
        this.props.requestSubmitMake(values);
    }

    // submit function to update data
    submitEditMake(values) {
        
        this.props.requestUpdateMakes(values);
        this.setState({
            isEditing : false
        })
    }
    
    //function to call form of edit
    editMakes(values) {
        this.setState ({
            isEditing : values
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
        const newMakesStatus = {
            status: !status
        }
        this.props.requestMakesStatus(makeId, newMakesStatus)
    }
    renderList() {
        if(this.props.fetching) {
            return (
                <tbody>
                    <tr><td>LOADING...</td></tr>
                </tbody>
            )
        } else {
            if(this.props.makes.length) {
                return (
                    <MakesList makes= {this.props.makes} onEdit = {this.editMakes} deleteMake = {this.props.requestDeleteMakes} makeStatus = {this.toggleStatus}/>
                )
            } else {
                return (
                    <tbody>
                        <tr><td>No Results Found !</td></tr>
                    </tbody>
                )
            }
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditMake onSubmit = {this.submitEditMake.bind(this)} editId = {this.state.isEditing} />
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
                            {this.renderList()}
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
        fetching: store.makeState.fetching
    }
}

export default connect(mapStateToProps, {requestMakes, requestMakesPages, requestDeleteMakes, requestSubmitMake, requestUpdateMakes, requestMakesStatus})(MakesListContainer);