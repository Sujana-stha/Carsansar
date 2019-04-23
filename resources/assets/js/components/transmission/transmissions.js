import React from 'react';

const TransmissionList = (props) => {
    return (
        <tbody>
            {
                props.transmissions.map((transmission) => {
                    return (
                        <tr key={transmission.id} className={`row-${transmission.id}`}>
                            <td>{transmission.id}</td>
                            <td>{transmission.transmission_desc}</td>
                            <td>{transmission.created_by.name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditTransmission.bind(null, transmission.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                <a href="javascript:void(0);" onClick={props.showConfirmBox.bind(null,transmission.id)} className="tooltip"  data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                {props.confirmText==transmission.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                        <a onClick={props.deleteTransmission.bind(null, transmission.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>Inactive
                                        {transmission.status== 1 ? (
                                            <input onClick = {()=> props.transmissionStatus(transmission.id, transmission.status) } defaultChecked type="checkbox" value={transmission.status}/>

                                        ):
                                            <input onClick = {()=> props.transmissionStatus(transmission.id, transmission.status) }  type="checkbox" value={transmission.status}/>
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


export default TransmissionList;