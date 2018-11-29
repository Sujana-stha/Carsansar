// Vehicles Listing

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import * as colorApi from '../../api/color-api';
//import { bindActionCreators } from 'redux';
//import store from '../../store';
import ColorList from '../../components/color/color';

class ColorListContainer extends Component {

    componentDidMount(){
        colorApi.getColors();          
    } 

    render(){
        return(
            <div> 
                <div className="row">
                    <div className="col s12 mt-2 mb-2 right-align">
                        <NavLink to="/insert-color" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add Color</span></NavLink>
                    </div>
                </div>
                
                        
                 <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hex Code</th>
                            <th>Description</th>                        
                            <th>User/Added By</th>
                            <th>Count</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    
                        <ColorList colors={this.props.colors}/>   
                                    
                              
                     
                 </table> 
                 <div className="divider"></div>
                <div className="row" style={{marginBottom:50 + 'px'}}>
                    <div className="col s12 mt-2 mb-2 right-align">
                        <ul className="pagination">
                            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                            <li className="active"><a href="#!">1</a></li>
                            <li className="waves-effect"><a href="#!">2</a></li>
                            <li className="waves-effect"><a href="#!">3</a></li>
                            <li className="waves-effect"><a href="#!">4</a></li>
                            <li className="waves-effect"><a href="#!">5</a></li>
                            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                        </ul>
                    </div>
                </div>  
                       
                 

             </div>
                    
         )
    }
}

function mapStateToProps(store) {
    return {
        colors: store.colorState.colors
        
    }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({}, dispatch);
// }

export default connect(mapStateToProps)(ColorListContainer);