import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

var makeId = null

class MakesList extends Component {
    constructor() {
        super();
        this.state = {
            confirm: false,
            showItem: null
        };
        // this.deleteItem = this.deleteItem.bind(this);
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
        
        this.setState({showItem: id})
        
    }
    componentDidMount() {
        this.setState({
            confirm: false
        })
    }
    hideDiv(e) {
        e.preventDefault();
        this.setState({showItem: null})
    }
    render() {
        console.log('tab', this.props)
    return (
        <tbody>
            {
                this.props.makes.map((make) => {
                    return (
                        <tr key={make.id} className={`row-${make.id}`}>
                                        
                            <td>{make.id}</td>
                            <td>{make.make_desc}</td>
                            <td>{make.created_by}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={this.props.onEdit.bind(null, make.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(make.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                {this.state.showItem==make.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                        <a onClick={this.props.deleteMake.bind(null, make.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>{make.status}</td>
                        </tr>
                    )
                })
            }
            
        </tbody>
    );
    }
};

export default MakesList;