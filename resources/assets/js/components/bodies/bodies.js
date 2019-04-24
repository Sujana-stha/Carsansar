import React from 'react';

const BodiesList =(props)=> {
    return (
        <tbody>
            {
                props.bodies.map((body) => {
                    return (
                        <tr key={body.id} className={`row-${body.id}`}>
                                        
                            <td>{body.id}</td>
                            <td>{body.body_desc== null ? '-': body.body_desc}</td>
                            <td>{body.created_by.name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditBody.bind(null, body.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                <a className="tooltip" href="javascript:void(0);" onClick={()=>props.showConfirmBox(body.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                {props.confirmText==body.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                        <a onClick={props.deleteBody.bind(null, body.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>Inactive
                                        {body.status== 1 ? (
                                            <input onClick = {()=> props.bodyStatus(body.id, body.status) } defaultChecked type="checkbox" value={body.status}/>

                                        ):
                                            <input onClick = {()=> props.bodyStatus(body.id, body.status) }  type="checkbox" value={body.status}/>
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
    
};

export default BodiesList;