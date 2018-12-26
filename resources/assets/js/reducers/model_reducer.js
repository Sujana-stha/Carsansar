import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    models: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
}

const modelReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_MODEL: 
            return {...state, fetching: true};
           
        case types.GET_MODEL_SUCCESS:
            return Object.assign({}, state, {
                models: action.models.data,
                fetching: false,
                itemsCountPerPage: action.models.per_page,
                totalItemsCount: action.models.total,
                activePage: action.models.current_page
            })
        
        case types.GET_MODEL_PAGES:
            return Object.assign({}, state, {
                models: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_MODEL_SUCCESS:
            return  Object.assign({}, state, {
                models:  [...state.models],
                message: action.message
            })
        
        case types.UPDATE_MODEL_SUCCESS:
            return {
                ...state, 
                models: state.models.map(model => {
                    if (model.id === action.resp.id) {
                    return action.resp;
                    }
                    return model;
                }),
                message: action.message
            };
        case types.MODEL_STATUS_SUCCESS:
            console.log('tion', action)
            return {
                ...state,
                models: state.models.map(model => {
                    if(model.id === action.resp.id) {
                        return action.resp;
                    }
                    return model;
                }),
                message: action.message
            }
        case types.DELETE_MODEL_SUCCESS:
            const newModel = _.filter(state.models, model => model.id !== action.modelId);
            return Object.assign({}, state, {
                models: newModel,
                message: action.message
            });

        default: 
        return state;
    }
}

export default modelReducer;