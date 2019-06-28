
import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import store from '../../store';
import { requestColors, requestDeleteColors, requestSubmitColor, requestUpdateColors, requestColorStatus } from '../../actions/color-actions';
import { requestLoggedUser } from '../../actions/users-action';

//COMPONENTS
import ColorList from '../../components/color/color';
import ColorForm from '../../components/color/colors-form';
import EditColor from '../../components/color/colors-edit';
import Loading from '../../components/loading';

class ColorListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            sorted_column: 'id',
            order: 'desc'
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editColors = this.editColors.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestColors(pageNumber, sorted_column, order);
    }

    // submit function for new data
    submitColor(values) {
        let formValues = {
            color_desc: values.color_desc.toLowerCase(),
            color_cd: values.color_cd
        }
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestSubmitColor(formValues, pageNumber, sorted_column, order);
        this.props.requestLoggedUser();
    }

    // submit function to update data
    submitEditColor(values) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.
        values.color_cd = values.color_cd.toLowerCase()
        values.color_desc = values.color_desc.toLowerCase()

        this.props.requestUpdateColors(values, pageNumber, sorted_column, order);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editColors(values) {
        this.setState({
            isEditing: values
        })
    }

    deleteColorAction(colorId) {
        this.props.requestDeleteColors(colorId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        this.props.requestColors(pageNumber, sorted_column, order)
    }

    toggleStatus(colorId, status) {
        const pageNumber = this.props.activePage;
        let sorted_column = this.state.sorted_column
        let order = this.state.order
        const newColorsStatus = {
            status: !status
        }
        this.props.requestColorStatus(colorId, newColorsStatus, pageNumber, sorted_column, order)
    }
    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    sortByColumn(column) {
        const pageNumber = this.props.activePage
        if (column === this.state.sorted_column) {
            this.state.order === 'desc' ? this.setState({ order: 'asc' }, () => {
                this.props.requestColors(pageNumber, this.state.sorted_column, this.state.order)
            }) : this.setState({ order: 'desc' }, () => {
                this.props.requestColors(pageNumber, this.state.sorted_column, this.state.order)
            })
        } else {
            this.setState({ sorted_column: column, order: 'desc' }, () => {
                this.props.requestColors(pageNumber, this.state.sorted_column, this.state.order)
            })
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m3 l3 mt-3">
                    {this.state.isEditing ? (
                        <EditColor onSubmit={this.submitEditColor.bind(this)} editId={this.state.isEditing} />
                    ) : (
                            <ColorForm onSubmit={this.submitColor.bind(this)} />
                        )}
                </div>

                <div className="col s12 m9 l9">
                    {this.props.fetching ? (
                        <Loading />
                    ) : (
                            <div className="wr-not-loading"></div>
                        )}

                    <table className="wr-master-table">
                        <thead>
                            <tr>
                                <th>S.N</th>

                                <th onClick={() => this.sortByColumn('color_desc')}>Color Name
                                    {this.state.order === 'desc' ?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th onClick={() => this.sortByColumn('created_by')}>Added By
                                    {this.state.order === 'desc' ?
                                        <i className="material-icons wr-sorting-icon">arrow_drop_down</i>
                                        : <i className="material-icons wr-sorting-icon">arrow_drop_up</i>}
                                </th>
                                <th>Count</th>
                                <th>Action</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {/* <ColorList colors={this.props.colors}/>    */}
                        {this.props.colors.length ? (
                            <ColorList
                                colors={this.props.colors}
                                userRole={this.props.loggedUser}
                                onEditColor={this.editColors}
                                confirmText={this.state.confirmText}
                                showConfirmBox={this.deleteItem}
                                hideConfirmBox={this.hideDiv}
                                deleteColor={this.props.requestDeleteColors}
                                colorStatus={this.toggleStatus}
                                activePage={this.props.activePage}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                            />

                        ) : (
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

        )
    }
}

function mapStateToProps(store) {
    return {
        loggedUser: store.userState.loggedUser,
        colors: store.colorState.colors,
        activePage: store.colorState.activePage,
        itemsCountPerPage: store.colorState.itemsCountPerPage,
        totalItemsCount: store.colorState.totalItemsCount,
        pageRangeDisplayed: store.colorState.pageRangeDisplayed,
        fetching: store.colorState.fetching

    }
}

export default connect(mapStateToProps, { requestLoggedUser, requestColors, requestDeleteColors, requestSubmitColor, requestUpdateColors, requestColorStatus })(ColorListContainer);