import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    transmissions: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
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
                activePage: action.transmissions.current_page
            })
        
        case types.GET_TRANSMISSONS_PAGES:
            return Object.assign({}, state, {
                transmissions: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_TRANSMISSONS_SUCCESS:
            return  Object.assign({}, state, {
                transmissions:  [...state.transmissions],
                message: action.message
            })
        
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
                message: action.message
            };
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
                message: action.message
            }
        case types.DELETE_TRANSMISSONS_SUCCESS:
            const newTransmission= _.filter(state.transmissions, transmission => transmission.id !== action.transmissionId);
            return Object.assign({}, state, {
                transmissions: newTransmission,
                message: action.message
            });

        default: 
        return state;
    }
}

export default transmissionReducer;