import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    options: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
}

const optionReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_OPTIONS: 
            return {...state, fetching: true};
           
        case types.GET_OPTIONS_SUCCESS:
            return Object.assign({}, state, {
                options: action.options.data,
                fetching: false,
                itemsCountPerPage: action.options.per_page,
                totalItemsCount: action.options.total,
                activePage: action.options.current_page,
                sending: false
            })
        
        case types.REQUEST_OPTIONS_SUBMIT: 
            return {...state, sending: true};
          
        
        case types.REQUEST_OPTIONS_UPDATE: 
            return {...state, sending: true};
          
        case types.UPDATE_OPTIONS_SUCCESS:
            return {
                ...state, 
                options: state.options.map(option => {
                    if (option.id === action.resp.id) {
                    return action.resp;
                    }
                    return option;
                })
            };
        case types.REQUEST_OPTIONS_STATUS: 
            return {...state, fetching: true};
          
        case types.OPTIONS_STATUS_SUCCESS:
            return {
                ...state,
                options: state.options.map(option => {
                    if(option.id === action.resp.id) {
                        return action.resp;
                    }
                    return option;
                }),
                fetching: false
            }
        case types.DELETE_OPTIONS_SUCCESS:
            const newOption = _.filter(state.options, option => option.id !== action.optionId);
            return Object.assign({}, state, {
                options: newOption
            });

        default: 
        return state;
    }
}

export default optionReducer;