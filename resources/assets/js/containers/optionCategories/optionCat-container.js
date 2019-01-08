import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import OptionCategoryList from '../../components/OptionCategory/optionCategory';
import store from '../../store';
import { requestOptionCategories, requestDeleteOptionCategories, requestSubmitOptionCategories, requestUpdateOptionCategories, requestOptionCategoriesStatus } from  '../../actions/option_cat-action';


//COMPONENT
import OptionCategoryForm from '../../components/OptionCategory/optionCategory-form';
import EditOptionCategory from '../../components/OptionCategory/optionCategory-edit';

var globalId = null

class OptionCategoryListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        // this.handlePageChange = this.handlePageChange.bind(this)
        this.editOptionCategory = this.editOptionCategory.bind(this)
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
        this.props.requestOptionCategories();
    }

    // submit function for new data
    submitOptionCategory(values) {
        this.props.requestSubmitOptionCategories(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditOptionCategory(values) {
        console.log('vvv', values)
        this.props.requestUpdateOptionCategories(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editOptionCategory(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteOptionCategoryAction(optCatId) {
        this.props.requestDeleteOptionCategories(optCatId);
    }

    // pagination function
    // handlePageChange(pageNumber) {
    //     console.log(`active page is ${pageNumber}`);
    //     this.props.requestOptionCategoriesPages(pageNumber)
        
    // }
    // toggle status value
    toggleStatus (optCatId, status) {
        console.log('id', optCatId)
        console.log('val', status)
        const newOptCatStatus = {
            status: !status
        }
        this.props.requestOptionCategoriesStatus(optCatId, newOptCatStatus)
    }
    render() {
        console.log('prop', this.props)
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditOptionCategory onSubmit = {this.submitEditOptionCategory.bind(this)} editId = {globalId} />
                        ): (
                            <OptionCategoryForm onSubmit = { this.submitOptionCategory.bind(this) }/>
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
                            {this.props.optionCategories.length ? (
                                <OptionCategoryList optionCategories= {this.props.optionCategories} onEditOptionCategory = {this.editOptionCategory} deleteOptionCategory = {this.props.requestDeleteOptionCategories} optionCategoryStatus={this.toggleStatus}/>

                            ) : (
                                <tbody>
                                    <tr>
                                        <td >No Results Found !</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        {/* <div className="col s12 mt-2 mb-2 left-align">
                            <Pagination
                            activePage={this.props.activePage}
                            itemsCountPerPage={this.props.itemsCountPerPage}
                            totalItemsCount={this.props.totalItemsCount}
                            pageRangeDisplayed={this.props.pageRangeDisplayed}
                            onChange={this.handlePageChange}
                            firstPageText='First'
                            lastPageText='Last'
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(store) {
    return {
        optionCategories: store.OptCatState.optionCategories,
        message: store.OptCatState.message,
        // activePage: store.OptCatState.activePage,
        // itemsCountPerPage: store.OptCatState.itemsCountPerPage,
        // totalItemsCount: store.OptCatState.totalItemsCount,
        // pageRangeDisplayed: store.OptCatState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, {requestOptionCategories, requestDeleteOptionCategories, requestSubmitOptionCategories, requestUpdateOptionCategories, requestOptionCategoriesStatus })(OptionCategoryListContainer);