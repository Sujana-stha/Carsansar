import * as types from '../actions/action-types';

const initialState = {
    vehicleList: [],
    fetching: false,
    optionList: [],
    sending: false
}


const dropdownList =  function(state = initialState, action) {
    switch(action.type) {
        //reducer to get vehicles
        case types.REQUEST_VEHICLES:
            return {...state, fetching: true}
        
        case types.GET_VEHICLES_SUCCESS:
            return Object.assign({}, state, {
                vehicleList: action.vehicles,
                fetching: false
            });
        
        //reducer to add vehicles
        case types.REQUEST_VEHICLES_SUBMIT:
            return {...state, sending: true}
        case types.ADD_VEHICLES_SUCCESS:
            return Object.assign({}, state, {
                vehicleList: [...state.vehicleList, action.resp],
                sending: false
            });
        
        //reducer to update vehicles
        case types.REQUEST_VEHICLES_UPDATE:
            return Object.assign({}, state, {
                sending: true
            })

        case types.UPDATE_VEHICLES_SUCCESS:
            return {
                ...state, 
                vehicleList: state.vehicleList.map(vehicle => {
                    if (vehicle.id === action.resp.id) {
                    return action.resp;
                    }
                    return vehicle;
                }),
                sending: false
            };

        // reducer to search vehicles by title
        case types.SEARCH_VEHICLE_BY_TITLE:{
            console.log('act=', action.values)
            return {
                ...state, 
                vehicleList: action.values
            }
        }

        //reducer to add vehicles attributes
        case types.ADD_VEHICLES_ATTR_SUCCESS:
            var newOption = null
            if(action.apiName=="makes") {
                newOption = new Object({label: action.resp.make_desc, value:action.resp.id})
            }
            if(action.apiName == "models") {
                newOption = new Object({label: action.resp.model_desc, value:action.resp.id})
            }
            if(action.apiName == "bodies") {
                newOption = new Object ({label: action.resp.body_desc, value: action.resp.id})
            }
            if(action.apiName == "enginesizes") {
                newOption = new Object ({label: action.resp.enginesize_desc, value: action.resp.id})
            }
            if(action.apiName == "transmissions") {
                newOption = new Object ({label: action.resp.transmission_desc, value: action.resp.id})
            }
            if(action.apiName == "fueltypes") {
                newOption = new Object ({label: action.resp.fueltype_desc, value: action.resp.id})
            }
            if(action.apiName == "drives") {
                newOption = new Object ({label: action.resp.drive_desc, value: action.resp.id})
            }
            console.log('neww', newOption)
            return Object.assign({}, state, {
                optionList: newOption
            })
        default: 
        return state;
    }
}

export default dropdownList;