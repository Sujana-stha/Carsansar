import * as types from '../actions/action-types';

const initialState = {
    users: [],
    requesting: false,
    loggedUser: {}
}

const UsersReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.REGISTER_REQUEST:
            return Object.assign({}, state, {
                requesting: true
                
            }) 
        case types.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                users: action.users,
                requesting: false
            }) 
        case types.REQUEST_LOGGED_USER:
            return Object.assign({}, state, {
                requesting: true
            })
        case types.GET_LOGGED_USER:
            console.log('a', action)
            return Object.assign({}, state, {
                loggedUser: action.resp
            })
        default: 
        return state;
    }

}
export default UsersReducer;