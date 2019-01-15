import React, {Component} from 'react';


class EnginesizesList extends Component {
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
                    this.props.enginesizes.map((enginesize) => {
                        return (
                            <tr key={enginesize.id} className={`row-${enginesize.id}`}>
                                            
                                <td>{enginesize.id}</td>
                                <td>{enginesize.enginesize_desc}</td>
                                <td>{enginesize.created_by.name}</td>
                                <td className="action">
                                    <a href="javascript:void(0);" onClick={this.props.onEditEnginesize.bind(null, enginesize.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                    <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(enginesize.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                    {this.state.showItem==enginesize.id ? (
                                        <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                            <a onClick={this.props.deleteEnginesize.bind(null, enginesize.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                            <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                        </span>
                                    ): null}
                                </td>
                                <td>
                                    <div className="switch">
                                        <label>Inactive
                                            {enginesize.status== 1 ? (
                                                <input onClick = {()=> this.props.enginesizeStatus(enginesize.id, enginesize.status) } defaultChecked type="checkbox" value={enginesize.status}/>

                                            ):
                                                <input onClick = {()=> this.props.enginesizeStatus(enginesize.id, enginesize.status) }  type="checkbox" value={enginesize.status}/>
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

export default EnginesizesList;