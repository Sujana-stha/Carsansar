import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    colors: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
}

const colorReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_COLORS: 
            return {...state, fetching: true};
           
        case types.GET_COLORS_SUCCESS:
            return Object.assign({}, state, {
                colors: action.colors.data,
                fetching: false,
                itemsCountPerPage: action.colors.per_page,
                totalItemsCount: action.colors.total,
                activePage: action.colors.current_page,
                sending: false
            })
        
        case types.REQUEST_COLORS_SUBMIT:
            return Object.assign({}, state, {
                sending: true
            })

        case types.ADD_COLORS_SUCCESS:
            return  Object.assign({}, state, {
                colors:  [...state.colors]
            })
        
        case types.REQUEST_COLORS_UPDATE:
            return Object.assign({}, state, {
                sending: true
            })

        case types.UPDATE_COLORS_SUCCESS:
            return {
                ...state, 
                colors: state.colors.map(color => {
                    if (color.id === action.resp.id) {
                    return action.resp;
                    }
                    return color;
                }),
                sending: false
            };

        case types.COLORS_STATUS_SUCCESS:
            return {
                ...state,
                colors: state.colors.map(color => {
                    if(color.id === action.resp.id) {
                        return action.resp;
                    }
                    return color;
                }),
            }

        
        case types.DELETE_COLORS_SUCCESS:
            const newColor = _.filter(state.colors, color => color.id !== action.colorId);
            return Object.assign({}, state, {
                colors: newColor,
                fetching: false
            });

        default: 
        return state;
    }
}

export default colorReducer;