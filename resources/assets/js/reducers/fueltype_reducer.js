import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    fueltypes: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
}

const fueltypeReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_FUELTYPES: 
            return {...state, fetching: true};
           
        case types.GET_FUELTYPES_SUCCESS:
            return Object.assign({}, state, {
                fueltypes: action.fueltypes.data,
                fetching: false,
                itemsCountPerPage: action.fueltypes.per_page,
                totalItemsCount: action.fueltypes.total,
                activePage: action.fueltypes.current_page,
                sending: false
            })

        case types.REQUEST_FUELTYPES_PAGES: 
            return {...state, fetching: true};

        case types.GET_FUELTYPES_PAGES:
            return Object.assign({}, state, {
                fueltypes: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page,
                fetching: false,
                sending: false
            })
        case types.REQUEST_FUELTYPES_SUBMIT: 
            return {...state, sending: true};

        case types.REQUEST_FUELTYPES_UPDATE: 
            return {...state, sending: true};

        case types.UPDATE_FUELTYPES_SUCCESS:
            return {
                ...state, 
                fueltypes: state.fueltypes.map(fueltype => {
                    if (fueltype.id === action.resp.id) {
                    return action.resp;
                    }
                    return fueltype;
                })
            };

        case types.REQUEST_FUELTYPES_STATUS: 
            return {...state, fetching: true};

        case types.FUELTYPES_STATUS_SUCCESS:
            return {
                ...state,
                fueltypes: state.fueltypes.map(fueltype => {
                    if(fueltype.id === action.resp.id) {
                        return action.resp;
                    }
                    return fueltype;
                }),
                fetching: false
            }
        case types.DELETE_FUELTYPES_SUCCESS:
            const newFueltype = _.filter(state.fueltypes, fueltype => fueltype.id !== action.fueltypeId);
            return Object.assign({}, state, {
                fueltypes: newFueltype,
            });

        default: 
        return state;
    }
}

export default fueltypeReducer;