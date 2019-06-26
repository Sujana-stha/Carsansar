import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    companies: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 3,
    totalItemsCount: 1,
    pageRangeDisplayed: 3,
    sending: false
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
                activePage: action.companies.current_page,
                sending: false
            })
        
        case types.REQUEST_COMPANIES_SUBMIT:
            return {...state, sending: true}
        
        case types.REQUEST_COMPANIES_UPDATE:
            return {...state, sending: true}

        case types.UPDATE_COMPANIES_SUCCESS:
            return {
                ...state, 
                companies: state.companies.map(company => {
                    if (company.id === action.resp.id) {
                    return action.resp;
                    }
                    return company;
                }),
                sending: false
            };
        case types.REQUEST_COMPANIES_STATUS:
            return {...state, fetching: true}

        case types.COMPANIES_STATUS_SUCCESS:
            return {
                ...state,
                companies: state.companies.map(company => {
                    if(company.id === action.resp.id) {
                        return action.resp;
                    }
                    return company;
                }),
                fetching: false
            }
        case types.DELETE_COMPANIES_SUCCESS:
            const newCompany= _.filter(state.companies, company => company.id !== action.companyId);
            return Object.assign({}, state, {
                companies: newCompany,
                fetching: false
            });

        default: 
        return state;
    }
}

export default companyReducer;