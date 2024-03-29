import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/makes-api';
import * as makeAction from '../actions/makes-action'
import {notify} from 'react-notify-toast';

//Get makes data in table
export function* MakeWatcher() {
    yield takeLatest(types.REQUEST_MAKES, MakeSaga)
}
function* MakeSaga(action) {
    const response = yield call(api.getMakes,action.pageNumber,action.sorted_column, action.order);
    const makes = response.data
    if (response.errors) {
        yield put({ type: types.REQUEST_FAILED});
        notify.show("Cannot get all makes", "error", 5000);
    } else {
        yield put({type: types.GET_MAKES_SUCCESS, makes});
    }
}

// Submit form data of makes
export function* submitMakesSaga() {
    yield takeLatest(types.REQUEST_SUBMIT, callMakesSubmit)
}
function* callMakesSubmit(action) {
    yield put(startSubmit('PostMakes'));
    const result =  yield call(api.addMakes, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    let error = {}
    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_FAILED});
        error = result.errors || resp.errormsg
        if(resp.errorcode==23000) {
            notify.show("Make Description already exists!","error", 5000);
        }
        notify.show("Cannot create new make!","error", 5000);
    
    } else {
        yield put({type: types.ADD_MAKES_SUCCESS, resp});
        yield put({type: types.REQUEST_MAKES, pageNumber, sorted_column, order});
        notify.show("Created successfully!", "success", 5000);
    }
    yield put(stopSubmit('PostMakes', error));
    yield put(reset('PostMakes'));
}

//edit form data of makes
export function* editSaga() {
    yield takeLatest(types.REQUEST_UPDATE, callEditMake);
}

function* callEditMake (action) {
    yield put(startSubmit('EditMakes'));
    let error = {};
    const result =  yield call(api.updateMake, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order=action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.errors});
        notify.show("Update failed!","error", 5000);
        error = result.errors

    } else {
        yield put({type: types.UPDATE_MAKES_SUCCESS, resp});
        yield put ({type: types.REQUEST_MAKES, pageNumber, sorted_column, order})
        notify.show("Updated successfully!", "success", 5000);

    }
    yield put(stopSubmit('EditMakes', error));
    yield put(reset('EditMakes'));

}

// change status value
export function* toggleStatusSaga() {
    yield takeLatest(types.REQUEST_MAKES_STATUS, callToggleStatus);
}

function* callToggleStatus(action) {
    const result =  yield call(api.updateMakeStatus, action.makeId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column = action.sorted_column
    const order = action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        notify.show("Cannot update status !","error", 5000);

    } else {
        // yield put({type: types.MAKES_STATUS_SUCCESS, resp});
        yield put ({type: types.REQUEST_MAKES, pageNumber, sorted_column, order})
        notify.show("Status updated successfully!", "success",5000);
    }
}


// delete makes data from table
export function* deleteSaga() {
    yield takeLatest(types.REQUEST_DELETE, callDeleteMake)
}

function* callDeleteMake(action) {
    const result = yield call(api.deleteMake, action.makeId);

    if(result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed!","error", 5000);

    } else {
        yield put(makeAction.deleteMakesSuccess(action.makeId, result.statusText));
        notify.show("Deleted successfully!", "error", 5000);
    }
} 

