import * as types from '../actions/action-types';

const initialState = {
    vehicleList: [],
    fetching: false,
    optionList: []
}


const dropdownList =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_VEHICLES:
            return {...state, fetching: true}
        
        case types.GET_VEHICLES_SUCCESS:
            return Object.assign({}, state, {
                vehicleList: action.vehicles.data
            });
        case types.ADD_VEHICLES_SUCCESS:
            console.log("action", action)
            return Object.assign({}, state, {
                vehicleList: [...state.vehicleList, action.resp]
            });
        case types.VEHICLES_ATTR_SEARCH_SUCCESS:
            return Object.assign({}, state, {
                vehicleList: [...state.vehicleList, action.resp]
            })

        case types.ADD_VEHICLES_ATTR_SUCCESS:
            console.log("actRed", action)
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