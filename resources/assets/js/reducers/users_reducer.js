import * as types from '../actions/action-types';

const initialState = {
    users: [],
    requesting: false,
    fetching: false,
    loggedUser: {},
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3
}

const UsersReducer = function(state = initialState, action) {
    switch(action.type) {
        //to get list of users
        case types.REQUEST_USERS:
            return {...state, fetching: true};
        case types.GET_USERS_SUCCESS:
            console.log('user-action', action)
            return Object.assign({}, state, {
                users: action.users.data,
                fetching: false,
                requesting: false,
                itemsCountPerPage: action.users.per_page,
                totalItemsCount: action.users.total,
                activePage: action.users.current_page
            })

        // to add new user
        case types.REGISTER_REQUEST:
            return Object.assign({}, state, {
                requesting: true
                
            }) 
        case types.REGISTER_SUCCESS:
            console.log('action-register', action)
            return Object.assign({}, state, {
                users: action.resp.data,
                requesting: false
            }) 
        //to get logged user details
        case types.REQUEST_LOGGED_USER:
            return Object.assign({}, state, {
                requesting: true
            })
        case types.GET_LOGGED_USER:
            return Object.assign({}, state, {
                loggedUser: action.resp
            })
        default: 
        return state;
    }

}
export default UsersReducer;