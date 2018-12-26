import React, {Component} from 'react';

var modelId = null
class ModelList extends Component {
    constructor() {
        super();
        this.state = {
            confirm: false,
            showItem: null
        };
    }
    
    onClicked(e) {
        modelId = e;
        console.log(modelId);
        this.setState({confirm: true})
    }

    deleteItem(id){
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
    return (
        <tbody>
            {
                this.props.models.map((model) => {
                    return (
                        <tr key={model.id} className={`row-${model.id}`}>
                                        
                            <td>{model.id}</td>
                            <td>{model.model_desc}</td>
                            <td>{model.created_by}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={this.props.onEditModel.bind(null, model.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(model.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                {this.state.showItem==model.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                        <a onClick={this.props.deleteModel.bind(null, model.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>Inactive
                                        <input onClick = {()=> this.props.modelStatus(model.id, model.status) } defaultChecked type="checkbox" value={model.status}/>
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

export default ModelList;