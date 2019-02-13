import * as types from '../actions/action-types';

const initialState = {
    requesting: false,
    successful: false,
    errors: [],
    token: []
}

const loginReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_REQUEST:
            return {
                requesting: true,
                successful: false,
                errors: []
            }
        case types.LOGIN_SUCCESS:
            console.log('action', action)
            return {
                requesting: false,
                successful: true,
                errors: [],
                token: action.data.token
            }
        case types.LOGIN_ERROR:
            return {
                requesting: false,
                successful: false,
                errors: state.errors.concat([
                    {body: action.error.toString()}
                ])
            }
        case types.LOGOUT_SUCCESS:
            return {
                requesting: false,
                successful: false,
                errors: []
            }
        default:
        return state;
    }
}

export default loginReducer;