import React, {Component} from 'react';

class TransmissionList extends Component {
    constructor() {
        super();
        this.state = {
            confirm: false,
            showItem: null
        };
    }

    deleteItem(id){
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
                    this.props.transmissions.map((transmission) => {
                        return (
                            <tr key={transmission.id} className={`row-${transmission.id}`}>
                                <td>{transmission.id}</td>
                                <td>{transmission.transmission_desc}</td>
                                <td>{transmission.created_by.name}</td>
                                <td className="action">
                                    <a href="javascript:void(0);" onClick={this.props.onEditTransmission.bind(null, transmission.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                    <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(transmission.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                    {this.state.showItem==transmission.id ? (
                                        <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                            <a onClick={this.props.deleteTransmission.bind(null, transmission.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                            <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                        </span>
                                    ): null}
                                </td>
                                <td>
                                    <div className="switch">
                                        <label>Inactive
                                            {transmission.status== 1 ? (
                                                <input onClick = {()=> this.props.transmissionStatus(transmission.id, transmission.status) } defaultChecked type="checkbox" value={transmission.status}/>

                                            ):
                                                <input onClick = {()=> this.props.transmissionStatus(transmission.id, transmission.status) }  type="checkbox" value={transmission.status}/>
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

export default TransmissionList;