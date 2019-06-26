import React from 'react';

const EnginesizesList = (props) => {
    const authUser = process.env.MIX_SUPER_ADMIN_NAME
    return (
        <tbody>
            {
                props.enginesizes.map((enginesize, index) => {
                    return (
                        <tr key={enginesize.id} className={`row-${enginesize.id}`}>
                            <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                            <td>{enginesize.enginesize_desc == null ? '-': enginesize.enginesize_desc}</td>
                            <td>{enginesize.created_by.first_name} {enginesize.created_by.last_name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditEnginesize.bind(null, enginesize.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                {props.userRole.username == authUser ? (
                                    <a className="tooltip" href="javascript:void(0);" onClick={() => props.showConfirmBox(enginesize.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                ): null }

                                {props.confirmText == enginesize.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp;
                                        <a onClick={props.deleteEnginesize.bind(null, enginesize.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                    </span>
                                ) : null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>
                                        {enginesize.status == 1 ? (
                                            <input onClick={() => props.enginesizeStatus(enginesize.id, enginesize.status)} defaultChecked type="checkbox" value={enginesize.status} />

                                        ) :
                                            <input onClick={() => props.enginesizeStatus(enginesize.id, enginesize.status)} type="checkbox" value={enginesize.status} />
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

export default EnginesizesList;