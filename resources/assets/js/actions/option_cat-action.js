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

export function addOptionCategoriesSuccess(values) {
    return {
        type: types.ADD_OPT_CAT_SUCCESS,
        values
    }
}

export function requestDeleteOptionCategories(optCatId) {
    return {
        type: types.REQUEST_OPT_CAT_DELETE,
        optCatId
    }
}

export function deleteOptionCategoriesSuccess(optCatId) {
    return {
        type: types.DELETE_OPT_CAT_SUCCESS,
        optCatId
    }
}

export function requestUpdateOptionCategories( values) {
    return {
        type: types.REQUEST_OPT_CAT_UPDATE,
        values
    }
}

export function updateOptionCategoriesSuccess(optCatId, values) {
    return {
        type: types.UPDATE_OPT_CAT_SUCCESS,
        values,
        optCatId
    }
}

export function requestOptionCategoriesStatus (optCatId,values) {
    return {
        type: types.REQUEST_OPT_CAT_STATUS,
        optCatId, values
    }
}

export function OptionCategoriesStatusSuccess (optCatId, values) {
    return {
        type: types.OPT_CAT_STATUS_SUCCESS,
        values,
        optCatId
    }
}