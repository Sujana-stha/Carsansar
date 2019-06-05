import React from 'react';
import { Link } from 'react-router-dom';

const VehiclesListing = (props) => {
    const authUser = window.Laravel.super_admin
    return (
        <tbody>
            {props.vehicles.map((vehicle, index)=> {
                    return (
                    <tr key={vehicle.id}>
                        <td>{vehicle.id}</td>
                        <td>{vehicle.title}</td>
                        <td>{vehicle.stock_number}</td>
                        <td>{vehicle.price===null? '-': vehicle.price}</td>
                        <td>{vehicle.vehicle_status === null ? '-': vehicle.vehicle_status}</td>
                        <td>{vehicle.images == null ? '-': vehicle.images.map((image)=> {
                            if(image.main_flag == 1) {
                                return (
                                    <img key={image.id} alt="vehicle Images" src={`/storage/`+image.path} className="wr-vehicles-image-thumbnail"/>
                                )
                            } else {
                                return null;
                            }
                            
                        })}</td>
                        
                        <td>{vehicle.created_by.name}</td>
                        <td>{vehicle.created_at}</td>
                        <td>
                            <div className="switch">
                                <label>
                                {vehicle.status ===1 ? (
                                    <input onClick = {()=> props.vehicleStatus(vehicle.id, vehicle.status) } defaultChecked type="checkbox" value={vehicle.status}/>
                                ): (
                                    <input onClick = {()=> props.vehicleStatus(vehicle.id, vehicle.status) } type="checkbox" value={vehicle.status}/>
                                )}
                                <span className="lever"></span>
                                </label>
                            </div>
                        </td>
                        <td className="action">
                            <Link to={'/dashboard/edit-vehicle/'+vehicle.id} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></Link>
                            {props.userRole.name == authUser ? (
                                <a className="tooltip" href="javascript:void(0);" onClick={()=>props.deleteItem(vehicle.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                            ): null }
                            {props.confirmText==vehicle.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                <a href="javascript:void(0);">Yes</a> &nbsp;
                                <a href="javascript:void(0);" >No</a>
                                </span>
                            ): null}
                        </td>
                    </tr> )
                
            })}
        </tbody>
    );
};

export default VehiclesListing;