import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    models: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
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
                activePage: action.models.current_page,
                sending: false
            })
        
        case types.REQUEST_MODEL_SUBMIT:
            return  Object.assign({}, state, {
                sending: true
            })
        
        case types.UPDATE_MODEL_SUCCESS:
            return {
                ...state, 
                models: state.models.map(model => {
                    if (model.id === action.resp.id) {
                    return action.resp;
                    }
                    return model;
                })
            };
        case types.MODEL_STATUS_SUCCESS:
            return {
                ...state,
                models: state.models.map(model => {
                    if(model.id === action.resp.id) {
                        return action.resp;
                    }
                    return model;
                })
            }
        case types.REQUEST_MODEL_DELETE: 
            return {...state, fetching: true}
        case types.DELETE_MODEL_SUCCESS:
            const newModel = _.filter(state.models, model => model.id !== action.modelId);
            return Object.assign({}, state, {
                models: newModel,
                fetching: false
            });

        default: 
        return state;
    }
}

export default modelReducer;