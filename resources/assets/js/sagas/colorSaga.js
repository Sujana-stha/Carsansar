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
function* ColorSaga(action) {
    const response = yield call(api.getColors,action.pageNumber, action.sorted_column, action.order);
    const colors = response.data
    if (response.errors) {
        yield put({ type: types.REQUEST_COLORS_FAILED});
        notify.show("Cannot get all colors!", "error",5000)
    } else {
        yield put({type: types.GET_COLORS_SUCCESS, colors});
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
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    let error ={}
    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_COLORS_FAILED});
        error = result.errors || resp.errormsg
        if(resp.errorcode==23000) {
            notify.show("Color Description already exists!","error", 5000);
        }
        notify.show("Cannot create new color!","error", 5000);
    } else {
        // yield put({type: types.ADD_MAKES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_COLORS, pageNumber, sorted_column, order});
        notify.show("Color created successfully!", "success", 5000);
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
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_COLORS_FAILED, errors: result.errors});
        notify.show(`Update failed!`,"error", 5000);
        error = result.errors

    } else {
        // yield put({type: types.UPDATE_MAKES_SUCCESS, resp, message: result.statusText});
        yield put ({type: types.REQUEST_COLORS, pageNumber, sorted_column, order})
        notify.show(`Updated successfully!`, "success", 5000);

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
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_COLORS_FAILED, errors: result.error});
        notify.show(`Status update failed!`,"error", 5000);

    } else {
        // yield put({type: types.MAKES_STATUS_SUCCESS, resp});
        yield put ({type: types.REQUEST_COLORS, pageNumber, sorted_column, order})
        notify.show(`Status Updated!`, "success",5000);
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
        notify.show("Delete failed","error", 5000);

    } else {
        yield put(colorAction.deleteColorsSuccess(action.colorId));
        notify.show("Deleted successfully!", "error", 5000);

    }
} 
