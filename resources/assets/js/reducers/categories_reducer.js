import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    categories: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
}

const categoriesReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_CATEGORIES: 
            return {...state, fetching: true};
           
        case types.GET_CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                categories: action.categories.data,
                fetching: false,
                itemsCountPerPage: action.categories.per_page,
                totalItemsCount: action.categories.total,
                activePage: action.categories.current_page,
                sending: false
            })
        
        case types.REQUEST_CATEGORIES_SUBMIT:
            return {...state, sending: true}

        case types.REQUEST_CATEGORIES_UPDATE:
            return {...state, sending: true}

        case types.UPDATE_CATEGORIES_SUCCESS:
            return {
                ...state, 
                categories: state.categories.map(category => {
                    if (category.id === action.resp.id) {
                    return action.resp;
                    }
                    return category;
                }),
                sending: false
            };
        case types.REQUEST_CATEGORIES_STATUS:
            return {...state, fetching: true}
        case types.CATEGORIES_STATUS_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.resp.id) {
                        return action.resp;
                    }
                    return category;
                }),
                fetching: false
            }
        case types.DELETE_CATEGORIES_SUCCESS:
            const newCategory = _.filter(state.categories, category => category.id !== action.categoryId);
            return Object.assign({}, state, {
                categories: newCategory
            });

        default: 
        return state;
    }
}

export default categoriesReducer;