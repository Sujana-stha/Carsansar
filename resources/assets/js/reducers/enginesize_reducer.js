import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    enginesizes: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
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
                activePage: action.enginesizes.current_page,
                sending: false
            })
        case types.REQUEST_ENGINESIZES_PAGES:
            return {...state, fetching: true}
            
        case types.GET_ENGINESIZES_PAGES:
            return Object.assign({}, state, {
                enginesizes: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page,
                sending: false,
                fetching: false
            })
        case types.REQUEST_ENGINESIZES_SUBMIT:
            return {...state, sending: true}

        
        case types.REQUEST_ENGINESIZES_UPDATE:
            return {...state, sending: true}

        case types.UPDATE_ENGINESIZES_SUCCESS:
            return {
                ...state, 
                enginesizes: state.enginesizes.map(enginesize => {
                    if (enginesize.id === action.resp.id) {
                    return action.resp;
                    }
                    return enginesize;
                })
            };

        case types.REQUEST_ENGINESIZES_STATUS:
            return {...state, fetching: true}
                
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
                fetching: false
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