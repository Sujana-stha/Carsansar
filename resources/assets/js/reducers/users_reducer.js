import * as types from '../actions/action-types';

const initialState = {
    users: [],
    sending: false
}

const UsersReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.REGISTER_REQUEST:
            return Object.assign({}, state, {
                sending: true
                
            }) 
        case types.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                users: action.users,
                sending: false
            }) 
        default: 
        return state;
    }

}
export default UsersReducer;