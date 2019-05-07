import React from 'react';

const ColorsList =(props)=> {
    return (
        <tbody>
            {props.colors.map((color, index) => {
                return (
                    <tr key={color.id} className={`row-${color.id}`}>                  
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{color.color_desc ==null ? '-': color.color_desc}</td>
                        <td>{color.created_by.name}</td>
                        <td>99</td>
                        <td className="action">
                            <a href="javascript:void(0);" onClick={props.onEditColor.bind(null, color.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                            <a className="tooltip" href="javascript:void(0);" onClick={props.showConfirmBox.bind(null,color.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                            {props.confirmText==color.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteColor.bind(null, color.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                    <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ): null}
                        </td>
                        <td>
                            <div className="switch">
                                <label>
                                    {color.status=== 1 ? (
                                        <input onClick = {()=> props.colorStatus(color.id, color.status) } defaultChecked type="checkbox" value={color.status}/>
                                    ):
                                        <input onClick = {()=> props.colorStatus(color.id, color.status) }  type="checkbox" value={color.status}/>
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

export default ColorsList

