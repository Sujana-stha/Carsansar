import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import FueltypesList from '../../components/fueltypes/fueltypes';
import store from '../../store';
import { requestFueltypes, requestDeleteFueltypes, requestSubmitFueltypes, requestFueltypesPages,requestUpdateFueltypes, requestFueltypesStatus } from  '../../actions/fueltypes-action';


//COMPONENT
import FueltypeForm from '../../components/fueltypes/fueltypes-form';
import EditFueltype from '../../components/fueltypes/fueltypes-edit';
import Loading from '../../components/loading';


class FueltypesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editFueltype = this.editFueltype.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }

    // hideMessage (e) {
    //     e.preventDefault();
    //     this.setState ({
    //         hide: false
    //     })
    // }

    componentDidMount() {
        // call action to run the relative saga
        this.props.requestFueltypes();
    }

    // submit function for new data
    submitFueltype(values) {
        this.props.requestSubmitFueltypes(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditFueltypes(values) {
        const page = this.props.activePage;
        this.props.requestUpdateFueltypes(values, page);
        this.setState({
            isEditing : false
        })
    }

    //function to call form of edit
    editFueltype(values) {
        
        this.setState ({
            isEditing : values
        })
        
    }

    deleteFueltypeAction(fueltypeId) {
        this.props.requestDeleteFueltypes(fueltypeId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestFueltypesPages(pageNumber)
        
    }
    
    toggleStatus (fueltypeId, status) {
        const page = this.props.activePage;       
        const newFueltypeStatus = {
            status: !status
        }
        this.props.requestFueltypesStatus(fueltypeId, newFueltypeStatus, page)
    }
    // renderList() {
    //     if(this.props.fetching) {
    //         return (
    //             <tbody>
    //                 <tr><td></td></tr>
    //             </tbody>
    //         )
    //     } else {
    //         if(this.props.fueltypes.length) {
    //             return (
    //                 <FueltypesList fueltypes= {this.props.fueltypes} onEditFueltype = {this.editFueltype} deleteFueltype = {this.props.requestDeleteFueltypes} fueltypeStatus = {this.toggleStatus}/>
    //             )
    //         } else {
    //             return (
    //                 <tbody>
    //                     <tr><td>No Results Found !</td></tr>
    //                 </tbody>
    //             )
    //         }
    //     }
    // }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditFueltype onSubmit = {this.submitEditFueltypes.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <FueltypeForm onSubmit = { this.submitFueltype.bind(this) }/>
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
                                    <th>S.N</th>
                                    <th>Title</th>
                                    <th>Added by</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {/* {this.renderList()} */}
                            {this.props.fueltypes.length ? (
                                <FueltypesList fueltypes= {this.props.fueltypes} onEditFueltype = {this.editFueltype} deleteFueltype = {this.props.requestDeleteFueltypes} fueltypeStatus = {this.toggleStatus}/>

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
        fueltypes: store.fueltypeState.fueltypes,
        fetching: store.fueltypeState.fetching,
        activePage: store.fueltypeState.activePage,
        itemsCountPerPage: store.fueltypeState.itemsCountPerPage,
        totalItemsCount: store.fueltypeState.totalItemsCount,
        pageRangeDisplayed: store.fueltypeState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestFueltypes, requestDeleteFueltypes, requestSubmitFueltypes, requestFueltypesPages,requestUpdateFueltypes, requestFueltypesStatus })(FueltypesListContainer);