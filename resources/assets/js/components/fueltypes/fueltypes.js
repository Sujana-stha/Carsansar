import React from 'react';

const FueltypesList = (props) => {
    const authUser = window.Laravel.super_admin
    return (
        <tbody>
            {
                props.fueltypes.map((fueltype, index) => {
                    return (
                        <tr key={fueltype.id} className={`row-${fueltype.id}`}>

                            <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                            <td>{fueltype.fueltype_desc == null ? '-': fueltype.fueltype_desc}</td>
                            <td>{fueltype.created_by.first_name} {fueltype.created_by.last_name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditFueltype.bind(null, fueltype.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>

                                {props.userRole.username == authUser ? (
                                <a className="tooltip" href="javascript:void(0);" onClick={() => props.showConfirmBox(fueltype.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                ): null }

                                {props.confirmText == fueltype.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp;
                                        <a onClick={props.deleteFueltype.bind(null, fueltype.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                    </span>
                                ) : null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>
                                        {fueltype.status == 1 ? (
                                            <input onClick={() =>props.fueltypeStatus(fueltype.id, fueltype.status)} defaultChecked type="checkbox" value={fueltype.status} />

                                        ) :
                                            <input onClick={() => props.fueltypeStatus(fueltype.id, fueltype.status)} type="checkbox" value={fueltype.status} />
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

export default FueltypesList;