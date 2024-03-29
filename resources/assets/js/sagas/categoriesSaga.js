import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/categories-api';
import * as categoryAction from '../actions/categories-action';
import {notify} from 'react-notify-toast';


//Get makes data in table
export function* CategoryWatcher() {
    yield takeLatest(types.REQUEST_CATEGORIES, CategorySaga)
}
function* CategorySaga(action) {
    const response = yield call(api.getCategories, action.pageNumber, action.sorted_column, action.order);
    const categories = response.data
    if (response.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = response.error;
        notify.show("Cannot get all categories", "error", 5000)
    } else {
        yield put({type: types.GET_CATEGORIES_SUCCESS, categories});
    }
}

// Submit form data of makes
export function* submitCategoriesSaga() {
    yield takeLatest(types.REQUEST_CATEGORIES_SUBMIT, callCategoriesSubmit)
}
function* callCategoriesSubmit(action) {
    yield put(startSubmit('PostCategories'));
    let error = {};
    const result =  yield call(api.addCategories, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order

    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error || resp.errormsg});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Category Description already exists!","error", 5000);
        }
        notify.show("Cannot create new category!", "error", 5000)
    } else {
        // yield put({type: types.ADD_CATEGORIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_CATEGORIES, pageNumber, sorted_column, order})
        notify.show("Ctegories created successfully!", "success", 5000)
    }
    yield put(stopSubmit('PostCategories', error));
    yield put(reset('PostCategories'));
}

//edit form data of makes
export function* editCategoriesSaga() {
    yield takeLatest(types.REQUEST_CATEGORIES_UPDATE, callEditCategory);
}

function* callEditCategory (action) {
    yield put(startSubmit('EditCategories'));
    let error = {};
    const result =  yield call(api.updateCategories, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed", "error", 5000)
    } else {
        // yield put({type: types.UPDATE_CATEGORIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_CATEGORIES, pageNumber, sorted_column, order})
        notify.show("Updated successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditCategories', error));
    yield put(reset('EditCategories'));

}

// change status value
export function* toggleCategoriesStatusSaga() {
    yield takeLatest(types.REQUEST_CATEGORIES_STATUS, callCategoryToggleStatus);
}

function* callCategoryToggleStatus(action) {
    const result =  yield call(api.updateCategoriesStatus, action.categoryId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot update status`, "error", 5000)

    } else {
        // yield put({type: types.CATEGORIES_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_CATEGORIES, pageNumber, sorted_column, order})
        notify.show(`Status updated successfully!`, "success", 5000)
    }
}


// delete makes data from table
export function* deleteCategoriesSaga() {
    yield takeLatest(types.REQUEST_CATEGORIES_DELETE, callDeleteCategory)
}

function* callDeleteCategory(action) {
    const result = yield call(api.deleteCategories, action.categoryId);

    if(result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(categoryAction.deleteCategoriesSuccess(action.categoryId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

