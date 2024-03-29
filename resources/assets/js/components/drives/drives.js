import React from 'react';


const DrivesList = (props) => {
    const authUser = process.env.MIX_SUPER_ADMIN_NAME
    return (
        <tbody>
            {
                props.drives.map((drive, index) => {
                    return (
                        <tr key={drive.id} className={`row-${drive.id}`}>
                            <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                            <td>{drive.drive_desc}</td>
                            <td>{drive.created_by.first_name} {drive.created_by.last_name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditDrive.bind(null, drive.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                {props.userRole.username == authUser ? (
                                    <a className="tooltip" href="javascript:void(0);" onClick={() => props.showConfirmBox(drive.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                ): null }
                                {props.confirmText == drive.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp;
                                            <a onClick={props.deleteDrive.bind(null, drive.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                            <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                    </span>
                                ) : null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>
                                        {drive.status == 1 ? (
                                            <input onClick={() => props.driveStatus(drive.id, drive.status)} defaultChecked type="checkbox" value={drive.status} />

                                        ) :
                                            <input onClick={() => props.driveStatus(drive.id, drive.status)} type="checkbox" value={drive.status} />
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

export default DrivesList;