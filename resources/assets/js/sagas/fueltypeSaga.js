import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/fueltypes-api';
import * as fueltypeAction from '../actions/fueltypes-action'
import {notify} from 'react-notify-toast'

//Get makes data in table
export function* FueltypeWatcher() {
    yield takeLatest(types.REQUEST_FUELTYPES, FueltypeSaga)
}
function* FueltypeSaga(action) {
    const response = yield call(api.getFueltypes, action.pageNumber, action.sorted_column, action.order);
    const fueltypes = response.data
    
    if (response.errors) {
        yield put({ type: types.REQUEST_FUELTYPES_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot get all Fuels", "error", 5000)
    } else {
        yield put({type: types.GET_FUELTYPES_SUCCESS, fueltypes});
    }
}

// Submit form data of makes
export function* submitFueltypeSaga() {
    yield takeLatest(types.REQUEST_FUELTYPES_SUBMIT, callFueltypeSubmit)
}
function* callFueltypeSubmit(action) {
    yield put(startSubmit('PostFueltypes'));
    let error = {};
    const result =  yield call(api.addFueltypes, action.values);
    const resp = result.data;
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_FUELTYPES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Add FuelTypes!", "error", 5000)

    } else {
        // yield put({type: types.ADD_FUELTYPES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_FUELTYPES, pageNumber, sorted_column, order})
        notify.show(`${resp.fueltype_desc} Fuel Types Added Successfully!`, "success", 5000)
    }
    yield put(stopSubmit('PostFueltypes', error));
    yield put(reset('PostFueltypes'));
}

//edit form data of makes
export function* editFueltypeSaga() {
    yield takeLatest(types.REQUEST_FUELTYPES_UPDATE, callEditFueltype);
}

function* callEditFueltype (action) {
    yield put(startSubmit('EditFueltypes'));
    let error = {};
    const result =  yield call(api.updateFueltype, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_FUELTYPES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Update ${resp.fueltype_desc}!`, "error", 5000)

    } else {
        // yield put({type: types.UPDATE_FUELTYPES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_FUELTYPES, pageNumber, sorted_column, order})
        notify.show(`${resp.fueltype_desc} Updated Successfully!`, "success", 5000)

    }
    yield put(stopSubmit('EditFueltypes', error));
    yield put(reset('EditFueltypes'));
}

// change status value
export function* toggleFueltypeStatusSaga() {
    yield takeLatest(types.REQUEST_FUELTYPES_STATUS, callToggleFueltypeStatus);
}

function* callToggleFueltypeStatus(action) {
    const result =  yield call(api.updateFueltypeStatus, action.fueltypeId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_FUELTYPES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Change Status of ${resp.fueltype_desc}!`, "error", 5000)

    } else {
        // yield put({type: types.FUELTYPES_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_FUELTYPES, pageNumber, sorted_column, order})
        notify.show(`Status of ${resp.fueltype_desc} Changed`, "success", 5000)
    }
}

// delete makes data from table
export function* deleteFueltypeSaga() {
    yield takeLatest(types.REQUEST_FUELTYPES_DELETE, callDeleteFueltype)
}

function* callDeleteFueltype(action) {
    const result = yield call(api.deleteFueltype, action.fueltypeId);

    if(result.errors) {
        yield put({ type: types.REQUEST_FUELTYPES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Delete FuelTypes!", "error", 5000)
    } else {
        yield put(fueltypeAction.deleteFueltypesSuccess(action.fueltypeId, result.statusText));
        notify.show("Fuel Type Deleted Successfully!", "error", 5000)
    }
} 
