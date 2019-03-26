import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as api from '../../api/deals-api';

//COMPONENTS
import VehicleLists from '../../components/vehicles/vehicles-listing';
import VehicleSearchComponent from '../../components/vehicles/vehicles-search-form';

class VehiclesListingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [
                { id: 1, 
                    title:'2013 | Hyundai | Elantra | GLS SUNROOF BLUETOOTH LOW MILEAGE 66,353 KMS',
                    type: 'Car' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 1
                },
                {id: 2, 
                    title:'2015 | Chevrolet | TRax | LT call for an Appointment',
                    type: 'Jeep' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 1
                },
                {id: 7, 
                    title:'2008 | KIA | RONDO | EX HEATED SEATS KEYLESS ENTRY 164,128 KM',
                    type: 'Van' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 1
                },
                {id: 8, 
                    title:'2015 | HONDA | CIVIC COUPE | SI COMING SOON TO WRIGHT AUTO SALES',
                    type: 'Van' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 0
                },
                {id: 11, 
                    title:'2013 | NISSAN | ALTIMA | 2.5 SV COMING SOON TO WRIGHT AUTO SALES',
                    type: 'Car' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 1
                },
                {id: 14, 
                    title:'2013 | MITSUBISHI | LANCER | SE CALL FOR AN APPOINTMENT',
                    type: 'Jeep' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 0
                }
            ],
            filtered: [
                { id: 1, 
                    title:'2013 | Hyundai | Elantra | GLS SUNROOF BLUETOOTH LOW MILEAGE 66,353 KMS',
                    type: 'Car' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 1
                },
                {id: 2, 
                    title:'2015 | Chevrolet | TRax | LT call for an Appointment',
                    type: 'Jeep' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 1
                },
                {id: 7, 
                    title:'2008 | KIA | RONDO | EX HEATED SEATS KEYLESS ENTRY 164,128 KM',
                    type: 'Van' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 1
                },
                {id: 8, 
                    title:'2015 | HONDA | CIVIC COUPE | SI COMING SOON TO WRIGHT AUTO SALES',
                    type: 'Van' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 0
                },
                {id: 11, 
                    title:'2013 | NISSAN | ALTIMA | 2.5 SV COMING SOON TO WRIGHT AUTO SALES',
                    type: 'Car' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 1
                },
                {id: 14, 
                    title:'2013 | MITSUBISHI | LANCER | SE CALL FOR AN APPOINTMENT',
                    type: 'Jeep' ,
                    stock_number: 'P6820',
                    price: 11997,
                    created_by: 'UserName',
                    created_at: '2019/03/08',
                    status: 0
                }
            ],
            keyword: ''
        }
    }
    
    searchVehicle(event) {
        const keyword = event.target.value
        if(keyword !== '') {
            const list = this.state.vehicles.filter((vehicle) => {
                return (
                    vehicle.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                    // vehicle.type.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
                    // vehicle.stock_number.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                )
            })
            this.setState({
                filtered: list,
                keyword
            })
        } else {
            this.setState({
                filtered: this.state.vehicles,
                keyword
            })
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m4 mt-2 mb-2 left-align">
                        <input value={this.state.keyword}
                        type="text"
                        placeholder="Search Title.."
                        onChange={e=>this.searchVehicle(e)}
                        />
                    </div>
					<div className="col s12 m8 mt-2 mb-2 right-align">
						<NavLink to="/dashboard/insert-vehicle" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add Vehicle</span></NavLink>
					</div>
                    
				</div>
                <div className="row">
                    <VehicleSearchComponent/>                        
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Stock Number</th>
                            <th>Price</th>
                            <th>User/Added By</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <VehicleLists vehicles={this.state.filtered}/>
                </table>
            </div>
        );
    }
}

export default VehiclesListingContainer;