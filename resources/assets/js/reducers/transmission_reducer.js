import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    transmissions: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
}

const transmissionReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_TRANSMISSONS: 
            return {...state, fetching: true};
           
        case types.GET_TRANSMISSONS_SUCCESS:
            return Object.assign({}, state, {
                transmissions: action.transmissions.data,
                fetching: false,
                itemsCountPerPage: action.transmissions.per_page,
                totalItemsCount: action.transmissions.total,
                activePage: action.transmissions.current_page,
                sending: false
            })

        case types.REQUEST_TRANSMISSONS_PAGES: 
            return {...state, fetching: true};
           
        case types.GET_TRANSMISSONS_PAGES:
            return Object.assign({}, state, {
                transmissions: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page,
                sending: false,
                fetching: false
            })

        case types.REQUEST_TRANSMISSONS_SUBMIT: 
            return {...state, sending: true};
           
        case types.REQUEST_TRANSMISSONS_UPDATE: 
            return {...state, sending: true};
           
        case types.UPDATE_TRANSMISSONS_SUCCESS:
        console.log('acc', action)
            return {
                ...state, 
                transmissions: state.transmissions.map(transmission => {
                    if (transmission.id === action.resp.id) {
                    return action.resp;
                    }
                    return transmission;
                }),
                sending:false
            };
        case types.REQUEST_TRANSMISSONS_STATUS: 
            return {...state, fetching: true};
           
        case types.TRANSMISSONS_STATUS_SUCCESS:
          console.log('tion', action)
            return {
                ...state,
                transmissions: state.transmissions.map(transmission => {
                    if(transmission.id === action.resp.id) {
                        return action.resp;
                    }
                    return transmission;
                }),
                fetching: false
            }
        case types.DELETE_TRANSMISSONS_SUCCESS:
            const newTransmission= _.filter(state.transmissions, transmission => transmission.id !== action.transmissionId);
            return Object.assign({}, state, {
                transmissions: newTransmission,
            });

        default: 
        return state;
    }
}

export default transmissionReducer;