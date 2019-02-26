// Vehicles Listing

import React from 'react';


const VehicleAttributes = () => {
    return(
	    <div>
	    	


      <table>
        <thead>
          <tr>
          	  <th>#</th>
              <th>Attribute Name</th>
              <th>Attribute Plural Name</th>
              <th>Attribute Remarks</th>
              <th>User/Added By</th>
              <th>Action</th>
              <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>99</td>
            <td>Year</td>
            <td>Years</td>
            <td>Launched Year</td>
            <td>UserName</td>
            <td>Edit Delete</td>
            <td><div className="switch"><label>Off<input type="checkbox" /><span className="lever"></span>On</label></div></td>
          </tr>
        </tbody>
      </table>
            

	   </div>
	    	    
    )
}

export default VehicleAttributes;