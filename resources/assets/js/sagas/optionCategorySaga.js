import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/option_cat-api';
import {notify} from "react-notify-toast"

//Get makes data in table
export function* optCatWatcher() {
    yield takeLatest(types.REQUEST_OPTION_CATEGORIES, OptCatSaga)
}
function* OptCatSaga() {
    const response = yield call(api.getOptionsCategories);
    console.log('resp', response)
    const optionCategories = response.data
    yield put({type: types.GET_OPT_CAT_SUCCESS, optionCategories});
}

// Get Makes pagination in table
// export function* OptCatPagesWatcher() {
//     yield takeLatest(types.REQUEST_OPT_CAT_PAGES, callOptCatPages)
// }
// function* callOptCatPages(action) {
//     const result =  yield call(api.getOptionsCategoriesPages, action.pageNumber);
//     const resp = result.data

//     if (result.errors) {
//         yield put({ type: types.REQUEST_OPT_CAT_FAILED, errors: result.error});
//         error = result.error;
//     } else {
//         yield put({type: types.GET_OPT_CAT_PAGES, resp});
//     }
// }


// Submit form data of makes
export function* submitOptCatSaga() {
    yield takeLatest(types.REQUEST_OPT_CAT_SUBMIT, callOptCatSubmit)
}
function* callOptCatSubmit(action) {
    yield put(startSubmit('PostOptionCategory'));
    let error = {};
    const result =  yield call(api.addOptionsCategories, action.values);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_OPT_CAT_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Add Option Categories!", "error", 5000)
    } else {
        // yield put({type: types.ADD_OPT_CAT_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_OPTION_CATEGORIES})
        notify.show("Option Category Added Successfully!", "success", 5000)
    }
    yield put(stopSubmit('PostOptionCategory', error));
    yield put(reset('PostOptionCategory'));

}

//edit form data of makes
export function* editOptCatSaga() {
    yield takeLatest(types.REQUEST_OPT_CAT_UPDATE, callEditOptCat);
}

function* callEditOptCat (action) {
    yield put(startSubmit('EditOptionCategory'));
    let error = {};
    const result =  yield call(api.updateOptionsCategories, action.values.id, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_OPT_CAT_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Update ${resp.optioncategory_desc}`, "error", 5000)
    } else {
        // yield put({type: types.UPDATE_OPT_CAT_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_OPTION_CATEGORIES});
        notify.show(`${resp.optioncategory_desc} Updated Successfully!`, "success", 5000)
    }
    yield put(stopSubmit('EditOptionCategory', error));
    yield put(reset('EditOptionCategory'));

}

// change status value
export function* toggleOptCatStatusSaga() {
    yield takeLatest(types.REQUEST_OPT_CAT_STATUS, callToggleOptCatStatus);
}

function* callToggleOptCatStatus(action) {
    let error = {};
    console.log('action', action)
    const result =  yield call(api.updateOptionsCategoriesStatus, action.optCatId, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_OPT_CAT_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Change Status of ${resp.optioncategory_desc}`, "error", 5000)
    } else {
        // yield put({type: types.OPT_CAT_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_OPTION_CATEGORIES})
        notify.show(`Status of ${resp.optioncategory_desc} Updated!`, "success", 5000)

    }
}


// delete makes data from table
export function* deleteOptCatSaga() {
    yield takeLatest(types.REQUEST_OPT_CAT_DELETE, callDeleteOptCat)
}

function* callDeleteOptCat(action) {
    const result = yield call(api.deleteOptionsCategories, action.optCatId);
    const optCatId= action.optCatId
    console.log('res', result)
    if(result.errors) {
        yield put({ type: types.REQUEST_OPT_CAT_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Delete Option Categories", "error", 5000)
    } else {
        // yield put(makeOptCatAction.deleteOptionCategoriesSuccess(action.optCatId, result.statusText));
        yield put({type: types.DELETE_OPT_CAT_SUCCESS, optCatId, message: result.statusText});
        notify.show("Option Category Deleted Successfully", "error", 5000)
        
    }
} 

