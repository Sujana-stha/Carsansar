import * as types from '../actions/action-types';

const initialState = {
    makesList: []
}


const dropdownList =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_MAKES_LIST:
            return {...state, fetching: true}
        
        case types.MAKES_LIST_SUCCESS:
            return Object.assign({}, state, {
                makesList: action.makes.data
            });
        
        default: 
        return state;
    }
}

export default dropdownList;