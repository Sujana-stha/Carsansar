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

        //to update users
        case types.REQUEST_USERS_UPDATE: 
            return {...state, sending: true};
           
        case types.USERS_UPDATE_SUCCESS:
            return {
                ...state, 
                users: state.users.map(user => {
                    if (user.id === action.resp.id) {
                    return action.resp;
                    }
                    return user;
                }),
                sending:false
            };
        default: 
        return state;
    }

}
export default UsersReducer;