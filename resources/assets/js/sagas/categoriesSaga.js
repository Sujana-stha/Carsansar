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
function* CategorySaga() {
    const response = yield call(api.getCategories);
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
        notify.show("Cannot Add Categories!", "error", 5000)
    } else {
        yield put({type: types.ADD_CATEGORIES_SUCCESS, resp, message: result.statusText});
        notify.show("Categories Added Successfully!", "success", 5000)

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

    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Update ${resp.category_desc}`, "error", 5000)
    } else {
        yield put({type: types.UPDATE_CATEGORIES_SUCCESS, resp, message: result.statusText});
        notify.show("Categories Updated Successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditCategories', error));
    yield put(reset('EditCategories'));

}

// change status value
export function* toggleCategoriesStatusSaga() {
    yield takeLatest(types.REQUEST_CATEGORIES_STATUS, callCategoryToggleStatus);
}

function* callCategoryToggleStatus(action) {
    let error = {};
    const result =  yield call(api.updateCategoriesStatus, action.categoryId, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Change Status of ${resp.category_desc}`, "error", 5000)

    } else {
        yield put({type: types.CATEGORIES_STATUS_SUCCESS, resp, message: result.statusText});
        notify.show("Status Updated Successfully!", "success", 5000)
        
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
        notify.show("Cannot Delere Category", "error", 5000)
    } else {
        yield put(categoryAction.deleteCategoriesSuccess(action.categoryId, result.statusText));
        notify.show("Categories Deleted Successfully!", "error", 5000)
        
    }

} 

