import React from 'react';

const OptionCategoryList = (props) => {
    const authUser = process.env.MIX_SUPER_ADMIN_NAME
    return (
        <tbody>
            {
                props.optionCategories.map((optionCategory, index) => {
                    return (
                        <tr key={optionCategory.id} className={`row-${optionCategory.id}`}>

                            <td>{index+1}</td>
                            <td>{optionCategory.optioncategory_desc== null ? '-': optionCategory.optioncategory_desc}</td>
                            <td>{optionCategory.created_by.first_name} {optionCategory.created_by.last_name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditOptionCategory.bind(null, optionCategory.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                {props.userRole.username == authUser ? (
                                    <a className="tooltip" href="javascript:void(0);" onClick={() => props.showConfirmBox(optionCategory.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                ): null }

                                {props.confirmText == optionCategory.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; &nbsp;
                                        <a onClick={props.deleteOptionCategory.bind(null, optionCategory.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(this)}>No</a>
                                    </span>
                                ) : null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>
                                        {optionCategory.status == 1 ? (
                                            <input onClick={() => props.optionCategoryStatus(optionCategory.id, optionCategory.status)} defaultChecked type="checkbox" value={optionCategory.status} />

                                        ) :
                                            <input onClick={() => props.optionCategoryStatus(optionCategory.id, optionCategory.status)} type="checkbox" value={optionCategory.status} />
                                        }
                                        <span className="lever"></span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }

        </tbody>
    );
};

export default OptionCategoryList;