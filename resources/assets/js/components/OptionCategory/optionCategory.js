import React, {Component} from 'react';

class OptionCategoryList extends Component {
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
                    this.props.optionCategories.map((optionCategory) => {
                        return (
                            <tr key={optionCategory.id} className={`row-${optionCategory.id}`}>
                                            
                                <td>{optionCategory.id}</td>
                                <td>{optionCategory.optioncategory_desc}</td>
                                <td>{optionCategory.created_by.name}</td>
                                <td className="action">
                                    <a href="javascript:void(0);" onClick={this.props.onEditOptionCategory.bind(null, optionCategory.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                    <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(optionCategory.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                    {this.state.showItem==optionCategory.id ? (
                                        <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                            <a onClick={this.props.deleteOptionCategory.bind(null, optionCategory.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                            <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                        </span>
                                    ): null}
                                </td>
                                <td>
                                    <div className="switch">
                                        <label>Inactive
                                            {optionCategory.status== 1 ? (
                                                <input onClick = {()=> this.props.optionCategoryStatus(optionCategory.id, optionCategory.status) } defaultChecked type="checkbox" value={optionCategory.status}/>

                                            ):
                                                <input onClick = {()=> this.props.optionCategoryStatus(optionCategory.id, optionCategory.status) }  type="checkbox" value={optionCategory.status}/>
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

export default OptionCategoryList;