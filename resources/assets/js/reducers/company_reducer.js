import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    companies: [],
    fetching: false,
    message: '',
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
}

const companyReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_COMPANIES: 
            return {...state, fetching: true};
           
        case types.GET_COMPANIES_SUCCESS:
            return Object.assign({}, state, {
                companies: action.companies.data,
                fetching: false,
                itemsCountPerPage: action.companies.per_page,
                totalItemsCount: action.companies.total,
                activePage: action.companies.current_page
            })
        
        case types.GET_COMPANIES_PAGES:
            return Object.assign({}, state, {
                companies: action.resp.data,
                itemsCountPerPage: action.resp.per_page,
                totalItemsCount: action.resp.total,
                activePage: action.resp.current_page
            })

        case types.ADD_COMPANIES_SUCCESS:
            return  Object.assign({}, state, {
                companies:  [...state.companies],
                message: action.message
            })
        
        case types.UPDATE_COMPANIES_SUCCESS:
            return {
                ...state, 
                companies: state.companies.map(company => {
                    if (company.id === action.resp.id) {
                    return action.resp;
                    }
                    return company;
                }),
                message: action.message
            };
        case types.COMPANIES_STATUS_SUCCESS:
          console.log('tion', action)
            return {
                ...state,
                companies: state.companies.map(company => {
                    if(company.id === action.resp.id) {
                        return action.resp;
                    }
                    return company;
                }),
                message: action.message
            }
        case types.DELETE_COMPANIES_SUCCESS:
            const newCompany= _.filter(state.companies, company => company.id !== action.companyId);
            return Object.assign({}, state, {
                companies: newCompany,
                message: action.message
            });

        default: 
        return state;
    }
}

export default companyReducer;