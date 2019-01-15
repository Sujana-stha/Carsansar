import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    bodies: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
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
                activePage: action.bodies.current_page,
                sending: false
            })
        case types.REQUEST_BODIES_PAGES:
            return {...state, fetching: true}

        case types.GET_BODIES_PAGES:
            return Object.assign({}, state, {
                bodies: action.resp.data,
                fetching: false,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page,
                sending: false
            })
        case types.REQUEST_BODIES_SUBMIT:
            return {...state, sending: true}
        
        case types.REQUEST_BODIES_UPDATE:
            return {...state, sending: true}

        case types.UPDATE_BODIES_SUCCESS:
            return {
                ...state, 
                bodies: state.bodies.map(body => {
                    if (body.id === action.resp.id) {
                    return action.resp;
                    }
                    return body;
                }),
                sending: false
            };
        case types.REQUEST_BODIES_STATUS:
            return {...state, fetching: true}
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
                fetching: false
            }
        case types.DELETE_BODIES_SUCCESS:
            const newBody = _.filter(state.bodies, body => body.id !== action.bodyId);
            return Object.assign({}, state, {
                bodies: newBody
            });

        default: 
        return state;
    }
}

export default bodyReducer;