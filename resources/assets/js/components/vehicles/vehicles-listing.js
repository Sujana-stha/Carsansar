import React from 'react';
import { Link } from 'react-router-dom';

const VehiclesListing = (props) => {
    return (
        <tbody>
            {props.vehicles.map((vehicle)=> {
                return (
                    <tr key={vehicle.id}>
                        <td>{vehicle.id}</td>
                        <td>{vehicle.title}</td>
                        <td>{vehicle.vehicle_info === null ? '-': vehicle.vehicle_info.vin}</td>
                        <td>{vehicle.stock_number}</td>
                        <td>{vehicle.price===null? '-': vehicle.price}</td>
                        <td>{vehicle.vehicle_status === null ? '-': vehicle.vehicle_status}</td>
                        <td>{vehicle.vehicle_info.category_id === null ? '-':vehicle.vehicle_info.category_id.category_desc }</td>
                        <td>{vehicle.vehicle_info.make_id===null ? '-': vehicle.vehicle_info.make_id.make_desc}</td>
                        <td>{vehicle.vehicle_info.model_id === null ? '-' : vehicle.vehicle_info.model_id.model_desc }</td>
                        <td>{vehicle.vehicle_info.year ===null ? '-': vehicle.vehicle_info.year}</td>
                        <td>{vehicle.vehicle_info.drive_id ===null? '-': vehicle.vehicle_info.drive_id.drive_desc}</td>
                        <td>{vehicle.vehicle_info.enginesize_id===null ?'-' : vehicle.vehicle_info.enginesize_id.enginesize_desc}</td>
                        <td>{vehicle.vehicle_info.transmission_id===null ? '-': vehicle.vehicle_info.transmission_id.transmission_desc}</td>
                        <td>{vehicle.vehicle_info.fueltype_id===null ? '-': vehicle.vehicle_info.fueltype_id.fueltype_desc}</td>
                        <td>{vehicle.warranty_desc===null ? '-': vehicle.warranty_desc}</td>
                        <td>{vehicle.option_desc ? vehicle.option_desc: '-'}</td>
                        <td>{vehicle.attribute.body_id===null ? '-': vehicle.attribute.body_id.body_desc}</td>
                        <td>{vehicle.vehicle_info.mfgexteriorcolor_id ? vehicle.vehicle_info.mfgexteriorcolor_id.color_desc: '-'}</td>
                        <td>{vehicle.attribute.exteriorcolor_id? vehicle.attribute.exteriorcolor_id.color_desc: '-'}</td>
                        <td>{vehicle.attribute.interiorcolor_id ? vehicle.attribute.interiorcolor_id.color_desc: '-'}</td>
                        <td>{vehicle.images ===null ? '-': vehicle.images.map((image)=> {
                        return (
                            <img key={image.id} alt="vehicle Images" src={`/storage/`+image.path} className="wr-vehicles-image-thumbnail"/>
                        )
                        })}</td>
                        <td>{vehicle.available_flag ===null ? '-': vehicle.available_flag}</td>
                        <td>{vehicle.created_by.name}</td>
                        <td>{vehicle.created_at}</td>
                        <td>
                            <div className="switch">
                                <label> InActive
                                {vehicle.status ===1 ? (
                                    <input  defaultChecked type="checkbox" value={vehicle.status}/>
                                ): (
                                    <input type="checkbox" value={vehicle.status}/>
                                )}
                                <span className="lever"></span>Active
                                </label>
                            </div>
                        </td>
                        <td className="action">
                            <Link to={'/dashboard/edit-vehicle/'+vehicle.id} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></Link>
                            <a className="tooltip" href="javascript:void(0);" onClick={()=>props.deleteItem(transmission.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                            {props.confirmText==vehicle.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                <a href="javascript:void(0);">Yes</a> &nbsp;
                                <a href="javascript:void(0);" >No</a>
                                </span>
                            ): null}
                        </td>
                    </tr>
                )
            })}
        </tbody>
    );
};

export default VehiclesListing;