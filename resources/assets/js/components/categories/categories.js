import React from 'react';

const CategoriesList = (props) => {
    return (
        <tbody>
            {props.categories.map((category, index) => {
                return (
                    <tr key={category.id} className={`row-${category.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{category.category_desc == null ? '-': category.category_desc}</td>
                        <td>{category.created_by.name}</td>
                        <td className="action">
                            <a href="javascript:void(0);" onClick={props.onEditCategory.bind(null, category.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                            <a className="tooltip" href="javascript:void(0);" onClick={()=>props.showConfirmBox( category.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                            {props.confirmText==category.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteCategory.bind(null, category.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                    <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ): null}
                        </td>
                        <td>
                            <div className="switch">
                                <label>
                                    {category.status== 1 ? (
                                        <input onClick = {()=> props.categoryStatus(category.id, category.status) } defaultChecked type="checkbox" value={category.status}/>

                                    ):
                                        <input onClick = {()=> props.categoryStatus(category.id, category.status) }  type="checkbox" value={category.status}/>
                                    }
                                    <span className="lever"></span>
                                </label>
                            </div>
                        </td>
                    </tr>
                )
            })}
            
        </tbody>
    );
};

export default CategoriesList;