import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    categories: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
}

const categoriesReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_CATEGORIES: 
            return {...state, fetching: true};
           
        case types.GET_CATEGORIES_SUCCESS:
            console.log('action', action)
            return Object.assign({}, state, {
                categories: action.categories.data,
                fetching: false,
                itemsCountPerPage: action.categories.per_page,
                totalItemsCount: action.categories.total,
                activePage: action.categories.current_page
            })
        
        case types.GET_CATEGORIES_PAGES:
            return Object.assign({}, state, {
                categories: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_CATEGORIES_SUCCESS:
            return  Object.assign({}, state, {
                categories:  [...state.categories],
                message: action.message
            })
        
        case types.UPDATE_CATEGORIES_SUCCESS:
            return {
                ...state, 
                categories: state.categories.map(category => {
                    if (category.id === action.resp.id) {
                    return action.resp;
                    }
                    return category;
                }),
                message: action.message
            };
        case types.CATEGORIES_STATUS_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.resp.id) {
                        return action.resp;
                    }
                    return category;
                }),
                message: action.message
            }
        case types.DELETE_CATEGORIES_SUCCESS:
            const newCategory = _.filter(state.categories, category => category.id !== action.categoryId);
            return Object.assign({}, state, {
                categories: newCategory,
                message: action.message
            });

        default: 
        return state;
    }
}

export default categoriesReducer;