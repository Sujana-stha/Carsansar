import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import store from '../../store';
import MakesList from '../../components/makes/makes';
import { requestMakes, requestDeleteMakes, requestSubmitMake,requestUpdateMakes, requestMakesStatus } from  '../../actions/makes-action';
import {requestLoggedUser} from '../../actions/users-action';

//COMPONENT
import MakeForm from '../../components/makes/makes-form';
import EditMake from '../../components/makes/makes-edit';
import Loading from '../../components/loading';

class MakesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editMakes = this.editMakes.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        let pageNumber = this.props.activePage
        this.props.requestMakes(pageNumber,sorted_column, order);
        this.props.requestLoggedUser();
    }

    // submit function for new data
    submitMake(values) {
        let formValues = {
            make_desc : values.make_desc.toLowerCase()
        }
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitMake(formValues, pageNumber, sorted_column,order);
    }

    // submit function to update data
    submitEditMake(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUpdateMakes(values, pageNumber, sorted_column, order);
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
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestMakes(pageNumber, sorted_column,order)
    }
    
    toggleStatus (makeId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const newMakesStatus = {
            status: !status
        }
        this.props.requestMakesStatus(makeId, newMakesStatus, pageNumber, sorted_column, order)
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
               this.props.requestMakes(pageNumber, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestMakes(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc'}, ()=>{
                this.props.requestMakes(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
                        {this.state.isEditing ? (
                            <EditMake onSubmit = {this.submitEditMake.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <MakeForm onSubmit = { this.submitMake.bind(this) }/>
                        )}
                       
                    </div>
                    
                    <div className="col s12 m9 l9">
                        {this.props.fetching ? (
                            <Loading/>
                        ): (
                            <div className="wr-not-loading"></div>
                        )}
                        <table className="Highlight bordered responsive-table wr-master-table">
                            <thead>
                                <tr>
                                    <th>S.N </th>
                                    <th onClick={()=>this.sortByColumn('make_desc')}>Title
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
                            {this.props.makes.length ? (
                                <MakesList 
                                makes= {this.props.makes} 
                                userRole ={ this.props.loggedUser}
                                onEdit = {this.editMakes} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv}
                                deleteMake = {this.props.requestDeleteMakes}
                                makeStatus = {this.toggleStatus}
                                activePage={this.props.activePage}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                />
                            ): (
                                <tbody>
                                    <tr><td>No Results Found!</td></tr>
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
        loggedUser: store.userState.loggedUser,
        makes: store.makeState.makes,
        activePage: store.makeState.activePage,
        itemsCountPerPage: store.makeState.itemsCountPerPage,
        totalItemsCount: store.makeState.totalItemsCount,
        pageRangeDisplayed: store.makeState.pageRangeDisplayed,
        fetching: store.makeState.fetching,
    }
}

export default connect(mapStateToProps, { requestLoggedUser, requestMakes, requestDeleteMakes, requestSubmitMake, requestUpdateMakes, requestMakesStatus})(MakesListContainer);