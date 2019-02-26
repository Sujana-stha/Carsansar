import * as types from '../actions/action-types';

const initialState = {
    requesting: false,
    isAuthenticated: false,
}

const loginReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                requesting: true,
                isAuthenticated: false
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                isAuthenticated: true,
            }
        case types.LOGIN_ERROR:
            return {
                ...state,
                requesting: false,
                isAuthenticated: false,
                // errors: state.errors.concat([
                //     {body: action.error.toString()}
                // ])
            }
        
        case types.LOGOUT_SUCCESS:
            return {
                requesting: false,
                isAuthenticated: false,
            }
        case types.LOGOUT_ERROR:
            return {
                requesting: false,
                isAuthenticated: true,
            }
        default:
        return state;
    }
}

export default loginReducer;