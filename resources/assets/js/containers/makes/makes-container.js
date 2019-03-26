import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import MakesList from '../../components/makes/makes';
import store from '../../store';
import { requestMakes, requestDeleteMakes, requestSubmitMake,requestUpdateMakes, requestMakesStatus } from  '../../actions/makes-action';

//COMPONENT
import MakeForm from './makes-form';
import EditMake from '../../components/makes/makes-edit';
import Loading from '../../components/loading';

class MakesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            sorted_column: 'id',
            order: 'desc',
            current_page: 1
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editMakes = this.editMakes.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)

    }

    componentDidMount() {
        // call action to run the relative saga
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        let pageNumber = this.state.current_page
        this.props.requestMakes(pageNumber,sorted_column, order);
    }

    // submit function for new data
    submitMake(values) {
        const page = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitMake(values,page,sorted_column,order);
    }

    // submit function to update data
    submitEditMake(values) {
        const page = this.props.activePage;
        this.props.requestUpdateMakes(values, page);
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
        const page = this.props.activePage;
        const newMakesStatus = {
            status: !status
        }
        this.props.requestMakesStatus(makeId, newMakesStatus, page)
    }
    sortByColumn(column) {
        console.log('col', column)
        if (column === this.state.sorted_column) {
           this.state.order === 'desc' ? this.setState({order: 'asc'}, ()=>{
               this.props.requestMakes(this.state.current_page, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestMakes(this.state.current_page, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc', current_page: 1}, ()=>{
                this.props.requestMakes(this.state.current_page, this.state.sorted_column, this.state.order)
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
                        <table className="Highlight bordered responsive-table">
                            <thead>
                                <tr>
                                    <th onClick={()=>this.sortByColumn('id')}>S.N 
                                        {this.state.order==='desc'?
                                            <i className="material-icons">arrow_drop_down</i>
                                        :<i className="material-icons">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={()=>this.sortByColumn('make_desc')}>Title
                                        {this.state.order==='desc'?
                                            <i className="material-icons">arrow_drop_down</i>
                                        :<i className="material-icons">arrow_drop_up</i>}
                                    </th>
                                    <th onClick={()=>this.sortByColumn('created_by')}>Added by
                                        {this.state.order==='desc'?
                                            <i className="material-icons">arrow_drop_down</i>
                                        :<i className="material-icons">arrow_drop_up</i>}
                                    </th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {this.props.makes.length ? (
                                <MakesList makes= {this.props.makes} onEdit = {this.editMakes} deleteMake = {this.props.requestDeleteMakes} makeStatus = {this.toggleStatus}/>

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
        makes: store.makeState.makes,
        activePage: store.makeState.activePage,
        itemsCountPerPage: store.makeState.itemsCountPerPage,
        totalItemsCount: store.makeState.totalItemsCount,
        pageRangeDisplayed: store.makeState.pageRangeDisplayed,
        fetching: store.makeState.fetching,
        token: store.loginState.token
    }
}

export default connect(mapStateToProps, {requestMakes,requestDeleteMakes, requestSubmitMake, requestUpdateMakes, requestMakesStatus})(MakesListContainer);