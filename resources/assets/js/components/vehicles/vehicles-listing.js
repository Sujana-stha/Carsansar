// Vehicles Listing
import React from 'react';
import { NavLink } from 'react-router-dom';

const VehiclesListing = () => {
    return(
	    <div>
	    <div className="row">
						<div className="col s12 mt-2 mb-2 right-align">
								<NavLink to="/dashboard/insert-vehicle" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add Vehicle</span></NavLink>
						</div>
				</div>	


      <table>
        <thead>
          <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Stock Number</th>
              <th>Price</th>
              <th>User/Added By</th>
              <th>Date</th>
              <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
          	<td>1</td>
            <td>2013 | Hyundai | Elantra | GLS SUNROOF BLUETOOTH LOW MILEAGE 66,353 KMS</td>
            <td>Car</td>
            <td>P6820</td>
            <td>11997</td>
            <td>UserName</td>
            <td>2018/07/23</td>
            <td>												
              <div className="switch"><label>Inactive<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
            </td>
          </tr>
          <tr>
          	<td>2</td>
            <td>2013 | Hyundai | Elantra | GLS SUNROOF BLUETOOTH LOW MILEAGE 66,353 KMS</td>
            <td>Car</td>
            <td>P6820</td>
            <td>11997</td>
            <td>UserName</td>
            <td>2018/07/23</td>
            <td>												
              <div className="switch"><label>Inactive<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
            </td>
          </tr>
          <tr>
          	<td>3</td>
            <td>2013 | Hyundai | Elantra | GLS SUNROOF BLUETOOTH LOW MILEAGE 66,353 KMS</td>
            <td>Car</td>
            <td>P6820</td>
            <td>11997</td>
            <td>UserName</td>
            <td>2018/07/23</td>
            <td>												
              <div className="switch"><label>Inactive<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
            </td>
          </tr>
          <tr>
          	<td>999</td>
            <td>2013 | Hyundai | Elantra | GLS SUNROOF BLUETOOTH LOW MILEAGE 66,353 KMS</td>
            <td>Car</td>
            <td>P6820</td>
            <td>11997</td>
            <td>UserName</td>
            <td>2018/07/23</td>
            <td>												
              <div className="switch"><label>Inactive<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
            </td>
          </tr>
        </tbody>
      </table>
            

	   </div>
	    	    
    )
}

export default VehiclesListing;