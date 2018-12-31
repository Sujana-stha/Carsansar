import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    drives: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
}

const driveReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_DRIVES: 
            return {...state, fetching: true};
           
        case types.GET_DRIVES_SUCCESS:
            return Object.assign({}, state, {
                drives: action.drives.data,
                fetching: false,
                itemsCountPerPage: action.drives.per_page,
                totalItemsCount: action.drives.total,
                activePage: action.drives.current_page
            })
        
        case types.GET_DRIVES_PAGES:
            return Object.assign({}, state, {
                drives: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_DRIVES_SUCCESS:
            return  Object.assign({}, state, {
                drives:  [...state.drives],
                message: action.message
            })
        
        case types.UPDATE_DRIVES_SUCCESS:
            return {
                ...state, 
                drives: state.drives.map(drive => {
                    if (drive.id === action.resp.id) {
                    return action.resp;
                    }
                    return drive;
                }),
                message: action.message
            };
        case types.DRIVES_STATUS_SUCCESS:
          console.log('tion', action)
            return {
                ...state,
                drives: state.drives.map(drive => {
                    if(drive.id === action.resp.id) {
                        return action.resp;
                    }
                    return drive;
                }),
                message: action.message
            }
        case types.DELETE_DRIVES_SUCCESS:
            const newDrive= _.filter(state.drives, drive => drive.id !== action.driveId);
            return Object.assign({}, state, {
                drives: newDrive,
                message: action.message
            });

        default: 
        return state;
    }
}

export default driveReducer;