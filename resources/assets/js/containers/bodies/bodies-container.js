import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import BodiesList from '../../components/bodies/bodies';
import store from '../../store';
import { requestBodies, requestDeleteBodies, requestSubmitBodies,requestUpdateBodies, requestBodiesStatus } from  '../../actions/bodies-action';


//COMPONENT
import BodyForm from '../../components/bodies/bodies-form';
import EditBody from '../../components/bodies/bodies-edit';
import Loading from '../../components/loading';

class BodiesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc',
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editBodies = this.editBodies.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestBodies(pageNumber, sorted_column, order);
    }

    // submit function for new data
    submitBody(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitBodies(values, pageNumber, sorted_column, order);
    }

    // submit function to update data
    submitEditBody(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUpdateBodies(values, pageNumber, sorted_column, order);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editBodies(values) {
        this.setState ({
            isEditing : values
        })
        
    }

    deleteBodyAction(bodyId) {
        this.props.requestDeleteBodies(bodyId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestBodies(pageNumber, sorted_column, order)
    }
    
    toggleStatus (bodyId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const newBodyStatus = {
            status: !status
        }
        this.props.requestBodiesStatus(bodyId, newBodyStatus, pageNumber, sorted_column, order)
    }
    deleteItem(id){
        this.setState ({
            confirmText: id
        })
    }
    
    hideDiv() {
        this.setState({confirmText: null})
    }
    sortByColumn(column) {
        const pageNumber = this.props.activePage
        if (column === this.state.sorted_column) {
           this.state.order === 'desc' ? this.setState({order: 'asc'}, ()=>{
               this.props.requestBodies(pageNumber, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestBodies(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc'}, ()=>{
                this.props.requestBodies(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
                        {this.state.isEditing ? (
                            <EditBody onSubmit = {this.submitEditBody.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <BodyForm onSubmit = { this.submitBody.bind(this) }/>
                        )}
                       
                    </div>
                    <div className="col s12 m9 l9">
                        {this.props.fetching ? (
                            <Loading/>
                        ): (
                            <div className="wr-not-loading"></div>
                        )}
                        <table>
                            <thead>
                                <tr>
                                    <th onClick={()=>this.sortByColumn('id')}>S.N
                                        {this.state.order==='desc'?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={()=>this.sortByColumn('body_desc')}>Title
                                        {this.state.order==='desc'?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={()=>this.sortByColumn('created_by')}>Added by
                                        {this.state.order==='desc'?
                                            <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        :<i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                    </th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {this.props.bodies.length ? (
                                <BodiesList 
                                    bodies= {this.props.bodies} 
                                    onEditBody = {this.editBodies} 
                                    confirmText={this.state.confirmText} 
                                    showConfirmBox={this.deleteItem} 
                                    hideConfirmBox={this.hideDiv} 
                                    deleteBody = {this.props.requestDeleteBodies} 
                                    bodyStatus = {this.toggleStatus}
                                />

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
        bodies: store.bodyState.bodies,
        fetching: store.bodyState.fetching,
        activePage: store.bodyState.activePage,
        itemsCountPerPage: store.bodyState.itemsCountPerPage,
        totalItemsCount: store.bodyState.totalItemsCount,
        pageRangeDisplayed: store.bodyState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestBodies, requestDeleteBodies, requestSubmitBodies,requestUpdateBodies, requestBodiesStatus})(BodiesListContainer);