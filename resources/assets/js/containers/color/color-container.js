
import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import store from '../../store';
import { requestColors, requestDeleteColors, requestSubmitColor,requestUpdateColors, requestColorStatus } from  '../../actions/color-actions';


//COMPONENTS
import ColorList from '../../components/color/color';
import ColorForm from '../../components/color/colors-form';
import EditColor from '../../components/color/colors-edit';
import Loading from '../../components/loading';

class ColorListContainer extends Component {
    constructor() {
        super();
        this.state= {
            isEditing: false
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.editColors = this.editColors.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)

    }

    componentDidMount(){
        // call action to run the relative saga
        const page = this.props.activePage;
        this.props.requestColors(page);         
    } 

    // submit function for new data
    submitColor(values) {
        this.props.requestSubmitColor(values);
    }

    // submit function to update data
    submitEditColor(values) {
        const page = this.props.activePage;
        this.props.requestUpdateColors(values, page);
        this.setState({
            isEditing : false
        })
    }
    
    //function to call form of edit
    editColors(values) {
        this.setState ({
            isEditing : values
        })
    }

    deleteColorAction(colorId) {
        this.props.requestDeleteColors(colorId);
    }

    // pagination function
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.requestColors(pageNumber)
        
    }
    
    toggleStatus (colorId, status) {
        const page = this.props.activePage;
        const newColorsStatus = {
            status: !status
        }
        console.log('status', newColorsStatus)
        this.props.requestColorStatus(colorId, newColorsStatus, page)
    }

    render(){
        return(
            <div className="row"> 
                
                <div className="col s12 m3 l3 mt-3">
                    {this.state.isEditing ? (
                        <EditColor onSubmit = {this.submitEditColor.bind(this)} editId = {this.state.isEditing} />
                    ): (
                        <ColorForm onSubmit = { this.submitColor.bind(this) }/>
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
                                <th>Hex Code</th>
                                <th>Description</th>                        
                                <th>User/Added By</th>
                                <th>Count</th>
                                <th>Action</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {/* <ColorList colors={this.props.colors}/>    */}
                        {this.props.colors.length ? (
                            <ColorList colors= {this.props.colors} onEditColor = {this.editColors} deleteColor = {this.props.requestDeleteColors} colorStatus = {this.toggleStatus}/>

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
                    
         )
    }
}

function mapStateToProps(store) {
    return {
        colors: store.colorState.colors,
        activePage: store.colorState.activePage,
        itemsCountPerPage: store.colorState.itemsCountPerPage,
        totalItemsCount: store.colorState.totalItemsCount,
        pageRangeDisplayed: store.colorState.pageRangeDisplayed,
        fetching: store.colorState.fetching
        
    }
}

export default connect(mapStateToProps, {requestColors, requestDeleteColors, requestSubmitColor,requestUpdateColors, requestColorStatus})(ColorListContainer);