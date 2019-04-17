import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import EnginesizesList from '../../components/enginesizes/enginesizes';
import store from '../../store';
import { requestEnginesizes, requestDeleteEnginesizes, requestSubmitEnginesizes,requestUpdateEnginesizes, requestEnginesizesStatus } from  '../../actions/enginesizes-action';


//COMPONENT
import EnginesizeForm from '../../components/enginesizes/enginesizes-form';
import EditEnginesize from '../../components/enginesizes/enginesizes-edit';
import Loading from '../../components/loading';



class EnginesizesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editEnginesizes = this.editEnginesizes.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }
    
    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestEnginesizes(pageNumber, sorted_column, order);
    }

    // submit function for new data
    submitEnginesize(values) {
        const pageNumber = this.props.activePage
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitEnginesizes(values, pageNumber, sorted_column, order);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditEnginesize(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestUpdateEnginesizes(values, pageNumber, sorted_column, order);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editEnginesizes(values) {
        this.setState ({
            isEditing : values
        })
    }

    deleteEnginesizeAction(enginesizeId) {
        this.props.requestDeleteDrives(enginesizeId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestEnginesizes(pageNumber, sorted_column, order)
    }
    
    toggleStatus (enginesizeId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order       
        const newEnginesizesStatus = {
            status: !status
        }
        this.props.requestEnginesizesStatus(enginesizeId, newEnginesizesStatus, pageNumber, sorted_column, order)
    }

    sortByColumn(column) {
        const pageNumber = this.props.activePage
        if (column === this.state.sorted_column) {
           this.state.order === 'desc' ? this.setState({order: 'asc'}, ()=>{
               this.props.requestEnginesizes(pageNumber, this.state.sorted_column, this.state.order)
            }):this.setState({order: 'desc'}, ()=>{
                this.props.requestEnginesizes(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({sorted_column: column, order: 'desc'}, ()=>{
                this.props.requestEnginesizes(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3 mt-3">
                        {this.state.isEditing ? (
                            <EditEnginesize onSubmit = {this.submitEditEnginesize.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <EnginesizeForm onSubmit = { this.submitEnginesize.bind(this) }/>
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
                                    <th onClick={()=>this.sortByColumn('enginesize_desc')}>Title
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
                            {this.props.enginesizes.length ? (
                                <EnginesizesList enginesizes= {this.props.enginesizes} onEditEnginesize = {this.editEnginesizes} deleteEnginesize = {this.props.requestDeleteEnginesizes} enginesizeStatus = {this.toggleStatus}/>

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
        enginesizes: store.enginesizeState.enginesizes,
        fetching: store.enginesizeState.fetching,
        activePage: store.enginesizeState.activePage,
        itemsCountPerPage: store.enginesizeState.itemsCountPerPage,
        totalItemsCount: store.enginesizeState.totalItemsCount,
        pageRangeDisplayed: store.enginesizeState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestEnginesizes, requestDeleteEnginesizes, requestSubmitEnginesizes,requestUpdateEnginesizes, requestEnginesizesStatus })(EnginesizesListContainer);