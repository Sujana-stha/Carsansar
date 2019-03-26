// Vehicles Listing
import React, {Component} from 'react';


class VehiclesListing extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return(
        <tbody>
          {this.props.vehicles.map((vehicle)=> {
            return (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.title}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.stock_number}</td>
                <td>{vehicle.price}</td>
                <td>{vehicle.created_by}</td>
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
              </tr>
            )
          })}
          
        </tbody>
	    	    
    )
  }
}

export default VehiclesListing;