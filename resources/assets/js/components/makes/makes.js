import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

var makeId = null

class MakesList extends Component {
    constructor() {
        super();
        this.state = {
            confirm: false,
            showItem: false
        };
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    onClicked(e) {
        // e.preventDefault();
        makeId = e;
        console.log(makeId);

        this.setState({confirm: true})
    }

    deleteItem(id){
        // e.preventDefault();
        console.log(id);
        // return false;
        
        this.setState({showItem: true})
        
    }
    componentDidMount() {
        this.setState({
            confirm: false
        })
    }
    hideDiv(e) {
        e.preventDefault();
        this.setState({confirm: false})
    }
    render() {
    return (
        <tbody>
            {
                this.props.makes.map((make) => {
                    return (
                            <tr key={make.id} className={`row-${make.id}`}>
                                        
                                <td>{make.id}</td>
                                <td>{make.make_desc}</td>
                                <td>{make.status}</td>
                                <td>{make.created_by}</td>
                                <td className={`action-col-${make.id}`}>
                                    {/* <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a> */}
                                    <NavLink to={`/edit-make/${make.id}`} data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></NavLink>
                                    {/* <span onClick={()=> window.confirm('Are you sure you want to delete this item?') && this.props.deleteMake.bind(null, make.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Delete"><i className="material-icons">delete</i></span> */}
                                    {/* <a data-makeid={make.id} onClick={this.onClicked.bind(this, make.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a> */}
                                    <a data-makeid={make.id} onClick={this.deleteItem} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                    {this.state.showItem ? (
                                    <span className="red-text confirm">Are you sure? <a href="javascript:void();">Yes</a><a href="javascript:void();">No</a></span>
                                    ): null}
                                </td>
                                    
                            </tr>
                    )
                })
            }
            {this.state.confirm ? (
                <tr>
                    <td>
                        Are you sure you want to permanently delete this item ?
                        <span onClick={this.props.deleteMake.bind(null, makeId)}>Yes</span> &nbsp;&nbsp; 
                        <span onClick={this.hideDiv.bind(this)}>No</span>
                    </td>
                </tr>  
            ): null }
        </tbody>
    );
    }
};

export default MakesList;