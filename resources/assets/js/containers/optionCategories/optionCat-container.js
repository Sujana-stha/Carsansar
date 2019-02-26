import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import OptionCategoryList from '../../components/OptionCategory/optionCategory';
import store from '../../store';
import { requestOptionCategories, requestDeleteOptionCategories, requestSubmitOptionCategories, requestUpdateOptionCategories, requestOptionCategoriesStatus } from  '../../actions/option_cat-action';


//COMPONENT
import OptionCategoryForm from '../../components/OptionCategory/optionCategory-form';
import EditOptionCategory from '../../components/OptionCategory/optionCategory-edit';
import Loading from '../../components/loading';


class OptionCategoryListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false
        }
        // this.handlePageChange = this.handlePageChange.bind(this)
        this.editOptionCategory = this.editOptionCategory.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)

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
        this.setState ({
            isEditing : values
        })
        
    }

    deleteOptionCategoryAction(optCatId) {
        this.props.requestDeleteOptionCategories(optCatId);
    }

    // toggle status value
    toggleStatus (optCatId, status) {
       
        const newOptCatStatus = {
            status: !status
        }
        this.props.requestOptionCategoriesStatus(optCatId, newOptCatStatus)
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        {this.state.isEditing ? (
                            <EditOptionCategory onSubmit = {this.submitEditOptionCategory.bind(this)} editId = {this.state.isEditing} />
                        ): (
                            <OptionCategoryForm onSubmit = { this.submitOptionCategory.bind(this) }/>
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
                        
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(store) {
    return {
        optionCategories: store.OptCatState.optionCategories,
        fetching: store.OptCatState.fetching,
        
    }
}

export default connect(mapStateToProps, {requestOptionCategories, requestDeleteOptionCategories, requestSubmitOptionCategories, requestUpdateOptionCategories, requestOptionCategoriesStatus })(OptionCategoryListContainer);