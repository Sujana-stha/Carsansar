import React from 'react';


const OptionsList = (props) => {
    return (
        <tbody>
            {props.options.map((option) => {
                return (
                    <tr key={option.id} className={`row-${option.id}`}>
                        <td>{option.id}</td>
                        <td>{option.option_desc== null ? '-': option.option_desc}</td>
                        <td>{option.oc_id == null ? '-': option.oc_id.optioncategory_desc}</td>
                        <td>{option.created_by.name}</td>
                        <td className="action">
                            <a href="javascript:void(0);" onClick={props.onEditOptions.bind(null, option.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                            <a className="tooltip" href="javascript:void(0);" onClick={() => props.showConfirmBox(option.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                            {props.confirmText == option.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp;
                                    <a onClick={props.deleteOption.bind(null, option.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                    <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(this)}>No</a>
                                </span>
                            ) : null}
                        </td>
                        <td>
                            <div className="switch">
                                <label>Inactive
                                    {option.status == 1 ? (
                                        <input onClick={() => props.optionStatus(option.id, option.status)} defaultChecked type="checkbox" value={option.status} />

                                    ) :
                                        <input onClick={() => props.optionStatus(option.id, option.status)} type="checkbox" value={option.status} />
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
};

export default OptionsList;