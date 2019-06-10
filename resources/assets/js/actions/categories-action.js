import * as types from './action-types';


export function requestCategories(pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_CATEGORIES,
        pageNumber,sorted_column, order
    }
}
export function requestSubmitCategories(values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_CATEGORIES_SUBMIT,
        values, pageNumber,sorted_column, order
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

export function requestUpdateCategories( values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_CATEGORIES_UPDATE,
        values, pageNumber,sorted_column, order
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

export function requestCategoriesStatus (categoryId,values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_CATEGORIES_STATUS,
        values,
        categoryId, pageNumber,sorted_column, order  
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