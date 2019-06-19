// Users Listing
import React from 'react';

const UsersListing = (props) => {
    return (
        <tbody>
            {props.users.map((user, index) => {
                return (
                    <tr key={user.id} >
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.company_id == null ? '-': user.company_id.name}</td>
                        <td className="action">
                            <a href="javascript:void(0);" className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                            <a href="javascript:void(0);" onClick={props.showConfirmBox.bind(null,user.id)} className="tooltip" data-tooltip="Delete"><i className="material-icons">delete</i></a>
                            {props.confirmText == user.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp;
                                    <a href="javascript:void(0);">Yes</a> &nbsp;
                                    <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ) : null}
                        </td>
                        
                    </tr>
                )
            })}
        </tbody>
    )
}

export default UsersListing;