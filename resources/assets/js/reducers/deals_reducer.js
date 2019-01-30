import * as types from '../actions/action-types';

const initialState = {
    vehicleList: [],
    fetching: false
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
            })
        default: 
        return state;
    }
}

export default dropdownList;