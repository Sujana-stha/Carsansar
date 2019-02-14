import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/color-api';
import * as colorAction from '../actions/color-actions'
import {notify} from 'react-notify-toast';

//Get colors data in table
export function* ColorWatcher() {
    yield takeLatest(types.REQUEST_COLORS, ColorSaga)
}
function* ColorSaga() {
    const response = yield call(api.getColors);
    const colors = response.data
    yield put({type: types.GET_COLORS_SUCCESS, colors});
}

// Get Colors pagination in table
export function* colorsPagesWatcher() {
    yield takeLatest(types.REQUEST_COLORS_PAGES, callColorsPages)
}
function* callColorsPages(action) {
    const result =  yield call(api.getColorsPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_COLORS_FAILED});
    } else {
        yield put({type: types.GET_COLORS_PAGES, resp});
        
    }
}

// Submit form data of colors
export function* submitColorsSaga() {
    yield takeLatest(types.REQUEST_COLORS_SUBMIT, callColorsSubmit)
}
function* callColorsSubmit(action) {
    yield put(startSubmit('PostColors'));
    const result =  yield call(api.addColors, action.values);
    const resp = result.data
    let error = {};
    if (result.errors) {
        yield put({ type: types.REQUEST_COLORS_FAILED});
        notify.show("Cannot Add Colors!","error", 5000);
        error = result.errors
    } else {
        // yield put({type: types.ADD_MAKES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_COLORS});
        notify.show("Color Added Successfully!", "success", 5000);

    }
    yield put(stopSubmit('PostColors', error));
    yield put(reset('PostColors'));
}

//edit form data of makes
export function* editColorSaga() {
    yield takeLatest(types.REQUEST_COLORS_UPDATE, callEditColor);
}

function* callEditColor (action) {
    yield put(startSubmit('EditColors'));
    let error = {};
    const result =  yield call(api.updateColors, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.page
    if (result.errors) {
        yield put({ type: types.REQUEST_COLORS_FAILED, errors: result.errors});
        notify.show(`Cannot Update ${resp.color_desc}!`,"error", 5000);
        error = result.errors

    } else {
        // yield put({type: types.UPDATE_MAKES_SUCCESS, resp, message: result.statusText});
        yield put ({type: types.REQUEST_COLORS_PAGES, pageNumber})
        notify.show(`${resp.color_desc} Color Updated Successfully!`, "success", 5000);

    }
    yield put(stopSubmit('EditColors', error));
    yield put(reset('EditColors'));

}

// change status value
export function* toggleColorStatusSaga() {
    yield takeLatest(types.REQUEST_COLORS_STATUS, callColorToggleStatus);
}

function* callColorToggleStatus(action) {
    const result =  yield call(api.updateColorsStatus, action.colorId, action.values);
    const resp = result.data;
    const pageNumber = action.page
    console.log('are', resp)
    if (result.errors) {
        yield put({ type: types.REQUEST_COLORS_FAILED, errors: result.error});
        notify.show(`Cannot Change Status of ${resp.color_desc}!`,"error", 5000);

    } else {
        // yield put({type: types.MAKES_STATUS_SUCCESS, resp});
        yield put ({type: types.REQUEST_COLORS_PAGES, pageNumber})
        notify.show(`Status of ${resp.color_desc} Updated!`, "success",5000);
    }

}


// delete makes data from table
export function* deleteColorSaga() {
    yield takeLatest(types.REQUEST_COLORS_DELETE, callDeleteColor)
}

function* callDeleteColor(action) {
    const result = yield call(api.deleteColors, action.colorId);

    if(result.errors) {
        yield put({ type: types.REQUEST_COLORS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Delete Color!","error", 5000);

    } else {
        yield put(colorAction.deleteColorsSuccess(action.colorId));
        notify.show("Color Deleted Successfully!", "error", 5000);

    }
} 
