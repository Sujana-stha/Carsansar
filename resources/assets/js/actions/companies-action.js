import * as types from '../actions/action-types';


export function requestCompanies(pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_COMPANIES,
        pageNumber,sorted_column, order
    }
}
export function requestSubmitCompanies(values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_COMPANIES_SUBMIT,
        values, pageNumber,sorted_column, order
    }
}

export function requestCompaniesFailed() {
    return {
        type: types.REQUEST_COMPANIES_FAILED
    }
}
export function getCompaniesSuccess(companies) {
    return {
        type: types.GET_COMPANIES_SUCCESS,
        companies
    }
}

export function addCompaniesSuccess(values) {
    return {
        type: types.ADD_COMPANIES_SUCCESS,
        values
    }
}

export function requestDeleteCompanies(companyId) {
    return {
        type: types.REQUEST_COMPANIES_DELETE,
        companyId
    }
}

export function deleteCompaniesSuccess(companyId) {
    return {
        type: types.DELETE_COMPANIES_SUCCESS,
        companyId
    }
}

export function requestUpdateCompanies( values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_COMPANIES_UPDATE,
        values, pageNumber,sorted_column, order
    }
}

export function updateCompaniesSuccess(companyId, values) {
    return {
        type: types.UPDATE_COMPANIES_SUCCESS,
        values,
        companyId
    }
}

export function requestCompaniesStatus (companyId,values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_COMPANIES_STATUS,
        values,
        companyId, pageNumber,sorted_column, order
    }
}

export function CompaniesStatusSuccess (companyId, values, message) {
    return {
        type: types.COMPANIES_STATUS_SUCCESS,
        values,
        companyId,
        message
    }
}