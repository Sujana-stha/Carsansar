import * as types from './action-types';


export function requestCategories(values) {
    return {
        type: types.REQUEST_CATEGORIES,
        values
    }
}
export function requestSubmitCategories(values) {
    return {
        type: types.REQUEST_CATEGORIES_SUBMIT,
        values
    }
}

export function requestCategoriesFailed() {
    return {
        type: types.REQUEST_CATEGORIES_FAILED
    }
}
export function getCategoriesSuccess(categories) {
    return {
        type: types.GET_CATEGORIES_SUCCESS,
        categories
    }
}
export function requestCategoriesPages(pageNumber) {
    return {
        type: types.REQUEST_CATEGORIES_PAGES,
        pageNumber
    }
}
export function getCategoriesPages(categories) {
    return {
        type: types.GET_CATEGORIES_SUCCESS,
        categories
    }
}
export function addCategoriesSuccess(values, message) {
    return {
        type: types.ADD_CATEGORIES_SUCCESS,
        values,
        message
    }
}

export function requestDeleteCategories(categoryId) {
    return {
        type: types.REQUEST_CATEGORIES_DELETE,
        categoryId
    }
}

export function deleteCategoriesSuccess(categoryId, message) {
    return {
        type: types.DELETE_CATEGORIES_SUCCESS,
        categoryId, message
    }
}

export function requestUpdateCategories( values, page) {
    return {
        type: types.REQUEST_CATEGORIES_UPDATE,
        values, page
    }
}

export function updateCategoriesSuccess(categoryId, values, message) {
    return {
        type: types.UPDATE_CATEGORIES_SUCCESS,
        values,
        categoryId,
        message
    }
}

export function requestCategoriesStatus (categoryId,values, page) {
    return {
        type: types.REQUEST_CATEGORIES_STATUS,
        values,
        categoryId, page  
    }
}

export function CategoriesStatusSuccess (categoryId, values, message) {
    return {
        type: types.CATEGORIES_STATUS_SUCCESS,
        values,
        categoryId,
        message
    }
}