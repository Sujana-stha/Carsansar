import React, {Component} from 'react';

class FueltypesList extends Component {
    constructor() {
        super();
        this.state = {
            confirm: false,
            showItem: null
        };
        // this.deleteItem = this.deleteItem.bind(this);
    }
    
    deleteItem(id){
        console.log(id);
        this.setState({showItem: id})
    }
    componentDidMount() {
        this.setState({
            confirm: false
        })
    }
    hideDiv() {
        this.setState({showItem: null})
    }
    render() {
        return (
            <tbody>
                {
                    this.props.fueltypes.map((fueltype) => {
                        return (
                            <tr key={fueltype.id} className={`row-${fueltype.id}`}>
                                            
                                <td>{fueltype.id}</td>
                                <td>{fueltype.fueltype_desc}</td>
                                <td>{fueltype.created_by.name}</td>
                                <td className="action">
                                    <a href="javascript:void(0);" onClick={this.props.onEditFueltype.bind(null, fueltype.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>

                                    <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(fueltype.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                    {this.state.showItem==fueltype.id ? (
                                        <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                            <a onClick={this.props.deleteFueltype.bind(null, fueltype.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                            <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                        </span>
                                    ): null}
                                </td>
                                <td>
                                    <div className="switch">
                                        <label>Inactive
                                            {fueltype.status== 1 ? (
                                                <input onClick = {()=> this.props.fueltypeStatus(fueltype.id, fueltype.status) } defaultChecked type="checkbox" value={fueltype.status}/>

                                            ):
                                                <input onClick = {()=> this.props.fueltypeStatus(fueltype.id, fueltype.status) }  type="checkbox" value={fueltype.status}/>
                                            }
                                            <span className="lever"></span>Active
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        );
    }
};

export default FueltypesList;