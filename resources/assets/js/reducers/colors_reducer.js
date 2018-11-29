import * as types from '../actions/action-types';

const initialState = {
    colors: []
    
  };
  
  const colorReducer = function(state = initialState, action) {
  
    switch(action.type) {
  
      case types.GET_COLORS_SUCCESS:
        return Object.assign({}, state, { colors: action.colors });     
  
    }
  
    return state;
  
  }
  
  export default colorReducer;

