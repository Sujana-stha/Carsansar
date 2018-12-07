import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    makes: [],
    fetching: false,
    message: ''
}

const makeReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_MAKES: 
            return {...state, fetching: true};
           
        case types.REQUEST_SUBMIT:   
            // return {...state, fetching: true};
            // console.log('action', action)
            // return  Object.assign({}, state, {
            //     makes:[...state, action.values]
            // })
        case types.GET_MAKES_SUCCESS:
            console.log('actionlist', action);
            return Object.assign({}, state, {
                makes: action.makes,
                fetching: false
            })

        case types.ADD_MAKES_SUCCESS:
            console.log('action', action)
            // console.log('ini', initialState)
            return  Object.assign({}, state, {
                makes:[...state, action.resp],
                message: action.message
            })
            // return {...state, fetching: true};

            // return [...state.filter(make => make.id !== action.payload.id ),
            // Object.assign({}, action.payload)]
        case types.UPDATE_MAKES_SUCCESS:
            
            // return [...state.makes.filter(make => make.id !== action.makeId), 
            //     Object.assign({}, action.values)]
            const updateMake = _.filter(state.makes, make => make.id !== action.makeId);
            return Object.assign({}, state, {
                makes: updateMake,
                message: action.message
            });

        case types.DELETE_MAKES_SUCCESS:
            const newMake = _.filter(state.makes, make => make.id !== action.makeId);
            return Object.assign({}, state, {
                makes: newMake,
                message: action.message
            });

        default: 
        return state;
    }
}

export default makeReducer;