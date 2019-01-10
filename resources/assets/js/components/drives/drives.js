import React, {Component} from 'react';


class DrivesList extends Component {
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
                    this.props.drives.map((drive) => {
                        return (
                            <tr key={drive.id} className={`row-${drive.id}`}>
                                            
                                <td>{drive.id}</td>
                                <td>{drive.drive_desc}</td>
                                <td>{drive.created_by}</td>
                                <td className="action">
                                    <a href="javascript:void(0);" onClick={this.props.onEditDrive.bind(null, drive.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                    <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(drive.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                    {this.state.showItem==drive.id ? (
                                        <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                            <a onClick={this.props.deleteDrive.bind(null, drive.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                            <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                        </span>
                                    ): null}
                                </td>
                                <td>
                                    <div className="switch">
                                        <label>Inactive
                                            {drive.status== 1 ? (
                                                <input onClick = {()=> this.props.driveStatus(drive.id, drive.status) } defaultChecked type="checkbox" value={drive.status}/>

                                            ):
                                                <input onClick = {()=> this.props.driveStatus(drive.id, drive.status) }  type="checkbox" value={drive.status}/>
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

export default DrivesList;