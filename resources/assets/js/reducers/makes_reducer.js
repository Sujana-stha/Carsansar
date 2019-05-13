import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    makes: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false,
}

const makeReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_MAKES: 
            return {...state, fetching: true, sending: false };
           
        case types.GET_MAKES_SUCCESS:
            return Object.assign({}, state, {
                makes: action.makes.data,
                fetching: false,
                itemsCountPerPage: action.makes.per_page,
                totalItemsCount: action.makes.total,
                activePage: action.makes.current_page,
                sending: false,
            })
        
        
        case types.REQUEST_SUBMIT:
            return Object.assign({}, state, {
                sending: true
            })

        case types.ADD_MAKES_SUCCESS:
            return  Object.assign({}, state, {
                makes:  [...state.makes]
            })
        
        case types.REQUEST_UPDATE:
            return Object.assign({}, state, {
                sending: true
            })

        case types.UPDATE_MAKES_SUCCESS:
            return {
                ...state, 
                makes: state.makes.map(make => {
                    if (make.id === action.resp.id) {
                    return action.resp;
                    }
                    return make;
                }),
                sending: false
            };
        case types.REQUEST_MAKES_STATUS:
            return Object.assign({}, state, {
                fetching: true
            })
        case types.MAKES_STATUS_SUCCESS:
            return {
                ...state,
                makes: state.makes.map(make => {
                    if(make.id === action.resp.id) {
                        return action.resp;
                    }
                    return make;
                }),
                fetching: false
            }

        
        case types.DELETE_MAKES_SUCCESS:
            const newMake = _.filter(state.makes, make => make.id !== action.makeId);
            return Object.assign({}, state, {
                makes: newMake,
                fetching: false
            });

        default: 
        return state;
    }
}

export default makeReducer;