import {takeLatest, call, put, fork, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/categories-api';
import * as categoryAction from '../actions/categories-action';


//Get makes data in table
export function* CategoryWatcher() {
    yield takeLatest(types.REQUEST_CATEGORIES, CategorySaga)
}
function* CategorySaga() {
    const response = yield call(api.getCategories);
    console.log('resp', response);
    const categories = response.data
    yield put({type: types.GET_CATEGORIES_SUCCESS, categories});
}

// Get Makes pagination in table
export function* CategoriesPagesWatcher() {
    yield takeLatest(types.REQUEST_CATEGORIES_PAGES, callCategoriesPages)
}
function* callCategoriesPages(action) {
    const result =  yield call(api.getCategoriesPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.GET_CATEGORIES_PAGES, resp});
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

    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.ADD_CATEGORIES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('PostCategories', error));
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

    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.UPDATE_CATEGORIES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('EditCategories', error));
}

// change status value
export function* toggleCategoriesStatusSaga() {
    yield takeLatest(types.REQUEST_CATEGORIES_STATUS, callCategoryToggleStatus);
}

function* callCategoryToggleStatus(action) {
    let error = {};
    console.log('action', action)
    const result =  yield call(api.updateCategoriesStatus, action.categoryId, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.CATEGORIES_STATUS_SUCCESS, resp, message: result.statusText});
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
    } else {
        yield put(categoryAction.deleteCategoriesSuccess(action.categoryId, result.statusText));
    }
} 
