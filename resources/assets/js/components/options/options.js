import React, {Component} from 'react';


var makeId = null

class OptionsList extends Component {
    constructor() {
        super();
        this.state = {
            confirm: false,
            showItem: null
        };
    }
    
    onClicked(e) {
        optionId = e;
        console.log(optionId);

        this.setState({confirm: true})
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

    hideDiv(e) {
        e.preventDefault();
        this.setState({showItem: null})
    }

    render() {
        console.log('tab', this.props)
        return (
            <tbody>
                {this.props.options.map((option) => {
                    return (
                        <tr key={option.id} className={`row-${option.id}`}>
                                        
                            <td>{option.id}</td>
                            <td>{option.option_desc}</td>
                            <td>{option.oc_id.id}</td>

                            <td>{option.created_by.name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={this.props.onEditOptions.bind(null, option.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(option.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                {this.state.showItem==option.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                        <a onClick={this.props.deletOption.bind(null, option.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>Inactive
                                        {option.status== 1 ? (
                                            <input onClick = {()=> this.props.optionStatus(option.id, option.status) } defaultChecked type="checkbox" value={option.status}/>

                                        ):
                                            <input onClick = {()=> this.props.optionStatus(option.id, option.status) }  type="checkbox" value={option.status}/>
                                        }
                                        <span className="lever"></span>Active
                                    </label>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        );
    }
};

export default OptionsList;