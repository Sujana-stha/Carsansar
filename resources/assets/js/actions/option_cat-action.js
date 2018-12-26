import * as types from '../actions/action-types';


export function requestOptionCategories(values) {
    return {
        type: types.REQUEST_OPTION_CATEGORIES,
        values
    }
}
export function requestSubmitOptionCategories(values) {
    return {
        type: types.REQUEST_OPT_CAT_SUBMIT,
        values
    }
}

export function requestOptionCategoriesFailed() {
    return {
        type: types.REQUEST_OPT_CAT_FAILED
    }
}
export function getOptionCategoriesSuccess(optCat) {
    return {
        type: types.GET_OPT_CAT_SUCCESS,
        optCat
    }
}
export function requestOptionCategoriesPages(pageNumber) {
    return {
        type: types.REQUEST_OPT_CAT_PAGES,
        pageNumber
    }
}
export function getOptionCategoriesPages(optCat) {
    return {
        type: types.GET_OPT_CAT_PAGES,
        optCat
    }
}
export function addOptionCategoriesSuccess(values, message) {
    return {
        type: types.ADD_OPT_CAT_SUCCESS,
        values,
        message
    }
}

export function requestDeleteOptionCategories(optCatId) {
    return {
        type: types.REQUEST_OPT_CAT_DELETE,
        optCatId
    }
}

export function deleteOptionCategoriesSuccess(optCatId, message) {
    return {
        type: types.DELETE_OPT_CAT_SUCCESS,
        optCatId, message
    }
}

export function requestUpdateOptionCategories( values) {
    return {
        type: types.REQUEST_OPT_CAT_UPDATE,
        values
    }
}

export function updateOptionCategoriesSuccess(optCatId, values, message) {
    return {
        type: types.UPDATE_OPT_CAT_SUCCESS,
        values,
        optCatId,
        message
    }
}

export function requestOptionCategoriesStatus (optCatId,values) {
    return {
        type: types.REQUEST_OPT_CAT_STATUS,
        values,
        optCatId  
    }
}

export function OptionCategoriesStatusSuccess (optCatId, values, message) {
    return {
        type: types.OPT_CAT_STATUS_SUCCESS,
        values,
        optCatId,
        message
    }
}