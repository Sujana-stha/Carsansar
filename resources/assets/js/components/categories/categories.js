import React, {Component} from 'react';

class CategoriesList extends Component {
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
        console.log('tab', this.props)
        return (
            <tbody>
                {this.props.categories.map((category) => {
                    return (
                        <tr key={category.id} className={`row-${category.id}`}>
                                        
                            <td>{category.id}</td>
                            <td>{category.category_desc}</td>
                            <td>{category.created_by.name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={this.props.onEditCategory.bind(null, category.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(category.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                {this.state.showItem==category.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                        <a onClick={this.props.deleteCategory.bind(null, category.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>Inactive
                                        {category.status== 1 ? (
                                            <input onClick = {()=> this.props.categoryStatus(category.id, category.status) } defaultChecked type="checkbox" value={category.status}/>

                                        ):
                                            <input onClick = {()=> this.props.categoryStatus(category.id, category.status) }  type="checkbox" value={category.status}/>
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

export default CategoriesList;