import React from 'react';

const MakesList = (props) => {

    return (
        <tbody>
            {props.makes.map((make, index) => {
                return (
                    <tr key={make.id} className={`row-${make.id}`}>

                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{make.make_desc==null ? '-': make.make_desc}</td>
                        <td>{make.created_by.name}</td>
                        <td className="action">
                            <a href="javascript:void(0);" onClick={props.onEdit.bind(null, make.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                            <a className="tooltip" href="javascript:void(0);" onClick={() => props.showConfirmBox(make.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                            {props.confirmText == make.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp;
                                    <a onClick={props.deleteMake.bind(null, make.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                    <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ) : null}
                        </td>
                        <td>
                            <div className="switch">
                                <label>
                                    {make.status == 1 ? (
                                        <input onClick={() => props.makeStatus(make.id, make.status)} defaultChecked type="checkbox" value={make.status} />

                                    ) :
                                        <input onClick={() => props.makeStatus(make.id, make.status)} type="checkbox" value={make.status} />
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

export default MakesList;