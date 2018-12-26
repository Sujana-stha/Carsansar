import React, {Component} from 'react';

var modelId = null
class OptionCategoryList extends Component {
    constructor() {
        super();
        this.state = {
            confirm: false,
            showItem: null
        };
    }
    
    onClicked(e) {
        modeloptCatIdId = e;
        console.log(optCatId);
        this.setState({confirm: true})
    }

    deleteItem(id){
        console.log('id',id);
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
                this.props.optionCategories.map((optionCategory) => {
                    return (
                        <tr key={optionCategory.oc_id} className={`row-${optionCategory.id}`}>
                                        
                            <td>{optionCategory.oc_id}</td>
                            <td>{optionCategory.oc_desc}</td>
                            <td>{optionCategory.created_by}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={this.props.onEditOptionCategory.bind(null, optionCategory.oc_id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(optionCategory.oc_id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                {this.state.showItem==optionCategory.oc_id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                        <a onClick={this.props.deleteOptionCategory.bind(null, optionCategory.oc_id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>Inactive
                                        <input onClick = {()=> this.props.optionCategoryStatus(optionCategory.id, optionCategory.status) } defaultChecked type="checkbox" value={optionCategory.status}/>
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

export default OptionCategoryList;