import React from 'react';

const TransmissionList = (props) => {
    const authUser = process.env.MIX_SUPER_ADMIN_NAME
    return (
        <tbody>
            {
                props.transmissions.map((transmission, index) => {
                    return (
                        <tr key={transmission.id} className={`row-${transmission.id}`}>
                            <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                            <td>{transmission.transmission_desc == null ? '-': transmission.transmission_desc}</td>
                            <td>{transmission.created_by.first_name} {transmission.created_by.last_name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditTransmission.bind(null, transmission.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                
                                {props.userRole.username == authUser ? (
                                <a href="javascript:void(0);" onClick={props.showConfirmBox.bind(null,transmission.id)} className="tooltip"  data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                ): null }

                                {props.confirmText==transmission.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                        <a onClick={props.deleteTransmission.bind(null, transmission.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>
                                        {transmission.status== 1 ? (
                                            <input onClick = {()=> props.transmissionStatus(transmission.id, transmission.status) } defaultChecked type="checkbox" value={transmission.status}/>

                                        ):
                                            <input onClick = {()=> props.transmissionStatus(transmission.id, transmission.status) }  type="checkbox" value={transmission.status}/>
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
}


export default TransmissionList;