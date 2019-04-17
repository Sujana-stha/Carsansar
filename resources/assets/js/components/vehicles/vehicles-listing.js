// Vehicles Listing
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import * as api from '../../api/deals-api';

class VehiclesListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showItem: null, 
      options: ''
    }
  }
  componentDidMount() {
    console.log('fdf', this.props.vehicles)
  }
  deleteItem(id){
    this.setState({showItem: id})
  }
  hideDiv() {
    this.setState({showItem: null})
  }
  optionDesc(options) {
    
    var opt = options.split(',')
    var result = []

      for(var i=0; i< opt.length-1; i++) {
        api.getOptionsDesc(opt[i]).then(response=> {
          // result= response.data;
          var res = response.data
         result.push(res)
         debugger;
          console.log('abc', result)
        })
      }
      debugger;
      console.log('opt', result);

      // opt.map((optid)=> {
      //   console.log(optid)
      //   api.getOptionsDesc(optid).then((response)=>{
      //     console.log(response.data)
      //      return result = response.data
      //   })
      // })
  }
  render() {
    return(
        <tbody>
          {this.props.vehicles.map((vehicle)=> {
            return (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.title}</td>
                <td>{vehicle.vehicle_info.vin}</td>
                <td>{vehicle.stock_number}</td>
                <td>{vehicle.price}</td>
                <td>{vehicle.vehicle_status}</td>
                <td>{vehicle.vehicle_info.category_id.category_desc}</td>
                <td>{vehicle.vehicle_info.make_id.make_desc}</td>
                <td>{vehicle.vehicle_info.model_id.model_desc}</td>
                <td>{vehicle.vehicle_info.year}</td>
                <td>{vehicle.vehicle_info.drive_id.drive_desc}</td>
                <td>{vehicle.vehicle_info.enginesize_id.enginesize_desc}</td>
                <td>{vehicle.vehicle_info.transmission_id.transmission_desc}</td>
                <td>{vehicle.vehicle_info.fueltype_id.fueltype_desc}</td>
                <td>{vehicle.warranty_desc}</td>
                <td>{this.optionDesc(vehicle.attribute.option_ids)}</td>
                <td>{vehicle.attribute.body_id.body_desc}</td>
                <td>{vehicle.vehicle_info.mfgexteriorcolor_id.color_desc}</td>
                <td>{vehicle.attribute.exteriorcolor_id.color_desc}</td>
                <td>{vehicle.attribute.interiorcolor_id.color_desc}</td>
                <td>{vehicle.available_flag}</td>
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
                  <NavLink to="/dashboard/edit-vehicle" className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></NavLink>
                  <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(transmission.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                  {this.state.showItem==vehicle.id ? (
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
	    	    
    )
  }
}

export default VehiclesListing;