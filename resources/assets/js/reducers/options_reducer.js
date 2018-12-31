import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    options: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
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
                activePage: action.options.current_page
            })
        
        case types.GET_OPTIONS_PAGES:
            return Object.assign({}, state, {
                options: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_OPTIONS_SUCCESS:
            return  Object.assign({}, state, {
                options:  [...state.options],
                message: action.message
            })
        
        case types.UPDATE_OPTIONS_SUCCESS:
            return {
                ...state, 
                options: state.options.map(option => {
                    if (option.id === action.resp.id) {
                    return action.resp;
                    }
                    return option;
                }),
                message: action.message
            };
        case types.OPTIONS_STATUS_SUCCESS:
          console.log('tion', action)
            return {
                ...state,
                options: state.options.map(option => {
                    if(option.id === action.resp.id) {
                        return action.resp;
                    }
                    return option;
                }),
                message: action.message
            }
        case types.DELETE_OPTIONS_SUCCESS:
            const newOption = _.filter(state.options, option => option.id !== action.optionId);
            return Object.assign({}, state, {
                options: newOption,
                message: action.message
            });

        default: 
        return state;
    }
}

export default optionReducer;