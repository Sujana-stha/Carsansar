import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import MakesList from '../../components/categories/categories';
import store from '../../store';
import { requestCategories, requestDeleteCategories, requestSubmitCategories, requestCategoriesPages,requestUpdateCategories, requestCategoriesStatus } from  '../../actions/categories-action';


//COMPONENT
import CategoryForm from '../../components/categories/categories-form';
import EditCategory from '../../components/categories/categories-edit';
import CategoriesList from '../../components/categories/categories';
import Loading from '../../components/loading';


var globalId = null

class CategoriesListContainer extends Component {
    constructor() {
        super();
        this.state= {
            hide: true,
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editCategories = this.editCategories.bind(this)
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
        this.props.requestCategories();
    }

    // submit function for new data
    submitCategory(values) {
        this.props.requestSubmitCategories(values);
        this.setState ({
            hide: true
        })
    }

    // submit function to update data
    submitEditCategory(values) {
        this.props.requestUpdateCategories(values);
        this.setState({
            isEditing : false,
            hide: true
        })
    }

    //function to call form of edit
    editCategories(values) {
        globalId = values
        this.setState ({
            isEditing : true
        })
        
    }

    deleteCategoryAction(makeId) {
        this.props.requestDeleteCategories(categoryId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestCategoriesPages(pageNumber)
        
    }
    
    toggleStatus (categoryId, status) {
        const newCategoriesStatus = {
            status: !status
        }
        this.props.requestCategoriesStatus(categoryId, newCategoriesStatus)
    }
    // renderList() {
    //     if(this.props.fetching) {
    //         return (
    //             <tbody>
    //                 <tr><td></td></tr>
    //             </tbody>
    //         )
    //     } else {
    //         if(this.props.categories.length) {
    //             return (
    //                 <CategoriesList categories= {this.props.categories} onEditCategory = {this.editCategories} deleteCategory = {this.props.requestDeleteCategories} categoryStatus = {this.toggleStatus}/>
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
        console.log('prop', this.props)
        return (
            <div>
                
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditCategory onSubmit = {this.submitEditCategory.bind(this)} editId = {globalId} />
                        ): (
                            <CategoryForm onSubmit = { this.submitCategory.bind(this) }/>
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
                            {this.props.categories.length ? (
                                <CategoriesList categories= {this.props.categories} onEditCategory = {this.editCategories} deleteCategory = {this.props.requestDeleteCategories} categoryStatus = {this.toggleStatus}/>

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
        categories: store.categoryState.categories,
        fetching: store.categoryState.fetching,
        activePage: store.categoryState.activePage,
        itemsCountPerPage: store.categoryState.itemsCountPerPage,
        totalItemsCount: store.categoryState.totalItemsCount,
        pageRangeDisplayed: store.categoryState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestCategories, requestDeleteCategories, requestSubmitCategories, requestCategoriesPages,requestUpdateCategories, requestCategoriesStatus})(CategoriesListContainer);