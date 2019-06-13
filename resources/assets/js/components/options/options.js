import React from 'react';


const OptionsList = (props) => {
    const authUser = window.Laravel.super_admin
    return (
        <tbody>
            {props.options.map((option, index) => {
                return (
                    <tr key={option.id} className={`row-${option.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{option.option_desc== null ? '-': option.option_desc}</td>
                        <td>{option.oc_id == null ? '-': option.oc_id.optioncategory_desc}</td>
                        <td>{option.created_by.first_name} {option.created_by.last_name}</td>
                        <td className="action">
                            <a href="javascript:void(0);" onClick={props.onEditOptions.bind(null, option.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                            {props.userRole.username == authUser ? (
                            <a className="tooltip" href="javascript:void(0);" onClick={() => props.showConfirmBox(option.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                            ) :  null }
                            {props.confirmText == option.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp;
                                    <a onClick={props.deleteOption.bind(null, option.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                    <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(this)}>No</a>
                                </span>
                            ) : null}
                        </td>
                        <td>
                            <div className="switch">
                                <label>
                                    {option.status == 1 ? (
                                        <input onClick={() => props.optionStatus(option.id, option.status)} defaultChecked type="checkbox" value={option.status} />

                                    ) :
                                        <input onClick={() => props.optionStatus(option.id, option.status)} type="checkbox" value={option.status} />
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

export default OptionsList;