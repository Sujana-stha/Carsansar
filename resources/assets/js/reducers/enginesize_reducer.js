import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    enginesizes: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
}

const enginesizeReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_ENGINESIZES: 
            return {...state, fetching: true};
           
        case types.GET_ENGINESIZES_SUCCESS:
            return Object.assign({}, state, {
                enginesizes: action.enginesizes.data,
                fetching: false,
                itemsCountPerPage: action.enginesizes.per_page,
                totalItemsCount: action.enginesizes.total,
                activePage: action.enginesizes.current_page
            })
        
        case types.GET_ENGINESIZES_PAGES:
            return Object.assign({}, state, {
                enginesizes: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_ENGINESIZES_SUCCESS:
            return  Object.assign({}, state, {
                enginesizes:  [...state.enginesizes],
                message: action.message
            })
        
        case types.UPDATE_ENGINESIZES_SUCCESS:
            return {
                ...state, 
                enginesizes: state.enginesizes.map(enginesize => {
                    if (enginesize.id === action.resp.id) {
                    return action.resp;
                    }
                    return enginesize;
                }),
                message: action.message
            };
        case types.ENGINESIZES_STATUS_SUCCESS:
          console.log('tion', action)
            return {
                ...state,
                enginesize: state.enginesizes.map(enginesize => {
                    if(enginesize.id === action.resp.id) {
                        return action.resp;
                    }
                    return enginesize;
                }),
                message: action.message
            }
        case types.DELETE_ENGINESIZES_SUCCESS:
        console.log('aa', action)
            const newEnginesize = _.filter(state.enginesizes, enginesize => enginesize.id !== action.enginesizeId);
            return Object.assign({}, state, {
                enginesizes: newEnginesize,
                message: action.message
            });

        default: 
        return state;
    }
}

export default enginesizeReducer;