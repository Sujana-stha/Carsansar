import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    optionCategories: [],
    fetching: false,
    sending: false
    // activePage: 1,
    // itemsCountPerPage: 3,
    // totalItemsCount: 1,
    // pageRangeDisplayed: 3,
}

const optionCategoriesReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_OPTION_CATEGORIES: 
            return {...state, fetching: true};
           
        case types.GET_OPT_CAT_SUCCESS:
            return Object.assign({}, state, {
                optionCategories: action.optionCategories,
                fetching: false,
                sending: false
                // itemsCountPerPage: action.optionCategories.per_page,
                // totalItemsCount: action.optionCategories.total,
                // activePage: action.optionCategories.current_page
            })
        
        // case types.GET_OPT_CAT_PAGES:
        //     return Object.assign({}, state, {
        //         optionCategories: action.resp.data,
        //         itemsCountPerPage: action.resp.per_page,
        //         totalItemsCount: action.resp.total,
        //         activePage: action.resp.current_page
        //     })
        case types.REQUEST_OPT_CAT_SUBMIT: 
            return {...state, sending: true};
       
        case types.ADD_OPT_CAT_SUCCESS:
            console.log('act', action)
            return  Object.assign({}, state, {
                optionCategories:  [...state.optionCategories, action.resp],
                fetching: false,
                sending: false
            })
        case types.REQUEST_OPT_CAT_UPDATE: 
            return {...state, sending: true};
       
        case types.UPDATE_OPT_CAT_SUCCESS:
            console.log('op', action)
            return {
                ...state, 
                optionCategories: state.optionCategories.map(optionCategory => {
                    if (optionCategory.id === action.resp.id) {
                        return action.resp;
                    }
                    return optionCategory;
                }),
                sending: false,
                fetching: false
            };
        case types.REQUEST_OPT_CAT_STATUS: 
            return {...state, fetching: true};
          
        case types.OPT_CAT_STATUS_SUCCESS:
          console.log('tion', action)
            return {
                ...state,
                optionCategories: state.optionCategories.map(optionCategory => {
                    if(optionCategory.id === action.resp.id) {
                        return action.resp;
                    }
                    return optionCategory;
                }),
                fetching: false
            }
        case types.DELETE_OPT_CAT_SUCCESS:
            const newOptCat = _.filter(state.optionCategories, optionCategory => optionCategory.id !== action.optCatId);
            return Object.assign({}, state, {
                optionCategories: newOptCat,
            });

        default: 
        return state;
    }
}

export default optionCategoriesReducer;