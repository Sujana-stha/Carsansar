import React from 'react';

const ModelList = (props) => {
    const authUser = window.Laravel.super_admin
    return (
        <tbody>
            {
                props.models.map((model, index) => {
                    return (
                        <tr key={model.id} className={`row-${model.id}`}>
                            <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                            <td>{model.model_desc== null? '-': model.model_desc}</td>
                            <td>{model.created_by.first_name} {model.created_by.last_name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditModel.bind(null, model.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                {props.userRole.username == authUser ? (
                                    <a className="tooltip" href="javascript:void(0);" onClick={props.showConfirmBox.bind(null,model.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                ): null }
                                {props.confirmText == model.id ? (
                                    <span className="confirm tooltip-text">Are you sure?&nbsp;
                                        <a onClick={props.deleteModel.bind(null, model.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                    </span>
                                ) : null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>
                                        {model.status == 1 ? (
                                            <input onClick={() => props.modelStatus(model.id, model.status)} defaultChecked type="checkbox" value={model.status} />

                                        ) :
                                            <input onClick={() => props.modelStatus(model.id, model.status)} type="checkbox" value={model.status} />
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

export default ModelList;