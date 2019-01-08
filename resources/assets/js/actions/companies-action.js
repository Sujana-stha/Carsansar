import * as types from '../actions/action-types';


export function requestCompanies(values) {
    return {
        type: types.REQUEST_COMPANIES,
        values
    }
}
export function requestSubmitCompanies(values) {
    return {
        type: types.REQUEST_COMPANIES_SUBMIT,
        values
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
export function requestCompaniesPages(pageNumber) {
    return {
        type: types.REQUEST_COMPANIES_PAGES,
        pageNumber
    }
}
export function getCompaniesPages(companies) {
    return {
        type: types.GET_COMPANIES_PAGES,
        companies
    }
}
export function addCompaniesSuccess(values, message) {
    return {
        type: types.ADD_COMPANIES_SUCCESS,
        values,
        message
    }
}

export function requestDeleteCompanies(companyId) {
    return {
        type: types.REQUEST_COMPANIES_DELETE,
        companyId
    }
}

export function deleteCompaniesSuccess(companyId, message) {
    return {
        type: types.DELETE_COMPANIES_SUCCESS,
        companyId, message
    }
}

export function requestUpdateCompanies( values) {
    return {
        type: types.REQUEST_COMPANIES_UPDATE,
        values
    }
}

export function updateDrivesSuccess(companyId, values, message) {
    return {
        type: types.UPDATE_COMPANIES_SUCCESS,
        values,
        companyId,
        message
    }
}

export function requestCompaniesStatus (companyId,values) {
    return {
        type: types.REQUEST_COMPANIES_STATUS,
        values,
        companyId  
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