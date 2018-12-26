import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    makes: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
}

const makeReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_MAKES: 
            return {...state, fetching: true};
           
        case types.GET_MAKES_SUCCESS:
            return Object.assign({}, state, {
                makes: action.makes.data,
                fetching: false,
                itemsCountPerPage: action.makes.per_page,
                totalItemsCount: action.makes.total,
                activePage: action.makes.current_page
            })
        
        case types.GET_MAKES_PAGES:
            return Object.assign({}, state, {
                makes: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_MAKES_SUCCESS:
            return  Object.assign({}, state, {
                makes:  [...state.makes],
                message: action.message
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
                message: action.message
            };
        case types.MAKES_STATUS_SUCCESS:
          console.log('tion', action)
            return {
                ...state,
                makes: state.makes.map(make => {
                    if(make.id === action.resp.id) {
                        return action.resp;
                    }
                    return make;
                }),
                message: action.message
            }
        case types.DELETE_MAKES_SUCCESS:
            const newMake = _.filter(state.makes, make => make.id !== action.makeId);
            return Object.assign({}, state, {
                makes: newMake,
                message: action.message
            });

        default: 
        return state;
    }
}

export default makeReducer;