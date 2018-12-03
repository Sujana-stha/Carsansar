import React from 'react';
import { NavLink } from 'react-router-dom';


const MakesList = (props) => {
    console.log('prop',props)
    return (
        <tbody>
            {
                props.makes.map((make) => {
                    return (
                        <tr key={make.id}>
                                    
                            <td>{make.id}</td>
                            <td>{make.make_desc}</td>
                            <td>{make.status}</td>
                            <td>{make.created_by}</td>
                            <td>
                                {/* <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a> */}
                                <NavLink to={`/edit-make/${make.id}`} data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></NavLink>
                                {/* <span onClick={props.deleteMake.bind(null, make.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Delete"><i className="material-icons">delete</i></span> */}
                                <a onClick = {props.deleteMake.bind(null, make.id)} className="modal-trigger" href="#confirm-box" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">delete</i></a>
                            </td>
                                    
                        </tr>
                    )
                })
            }
        </tbody>
    );
};

export default MakesList;