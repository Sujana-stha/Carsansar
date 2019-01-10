import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    bodies: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
}

const bodyReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_BODIES: 
            return {...state, fetching: true};
           
        case types.GET_BODIES_SUCCESS:
            return Object.assign({}, state, {
                bodies: action.bodies.data,
                fetching: false,
                itemsCountPerPage: action.bodies.per_page,
                totalItemsCount: action.bodies.total,
                activePage: action.bodies.current_page
            })
        case types.REQUEST_BODIES_PAGES:
            return {...state, fetching: true}

        case types.GET_BODIES_PAGES:
            return Object.assign({}, state, {
                bodies: action.resp.data,
                fetching: false,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_BODIES_SUCCESS:
            return  Object.assign({}, state, {
                bodies:  [...state.bodies],
                message: action.message
            })
        
        case types.UPDATE_BODIES_SUCCESS:
            return {
                ...state, 
                bodies: state.bodies.map(body => {
                    if (body.id === action.resp.id) {
                    return action.resp;
                    }
                    return body;
                }),
                message: action.message
            };
        case types.BODIES_STATUS_SUCCESS:
          console.log('tion', action)
            return {
                ...state,
                bodies: state.bodies.map(body => {
                    if(body.id === action.resp.id) {
                        return action.resp;
                    }
                    return body;
                }),
                message: action.message
            }
        case types.DELETE_BODIES_SUCCESS:
            const newBody = _.filter(state.bodies, body => body.id !== action.bodyId);
            return Object.assign({}, state, {
                bodies: newBody,
                message: action.message
            });

        default: 
        return state;
    }
}

export default bodyReducer;