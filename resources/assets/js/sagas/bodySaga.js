import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/bodies-api';
import * as bodyAction from '../actions/bodies-action'
import {notify} from 'react-notify-toast';


//Get bodies data in table
export function* BodyWatcher() {
    yield takeLatest(types.REQUEST_BODIES, callBodiesSaga)
}
function* callBodiesSaga(action) {
    const result =  yield call(api.getBodies, action.pageNumber, action.sorted_column, action.order);
    const bodies = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot get all bodies.", "error", 5000);
    } else {
        yield put({type: types.GET_BODIES_SUCCESS, bodies});
    }
}

// Submit form data of makes
export function* submitBodySaga() {
    yield takeLatest(types.REQUEST_BODIES_SUBMIT, callBodySubmit)
}
function* callBodySubmit(action) {
    yield put(startSubmit('PostBodies'));
    let error = {};
    const result =  yield call(api.addBodies, action.values);
    const resp = result.data
    console.log('res', resp)
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.errors});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Body Description already exists!","error", 5000);
        }
        notify.show("Cannot create new body!","error", 5000);

    } else {
        // yield put({type: types.ADD_BODIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_BODIES, pageNumber, sorted_column, order})
        notify.show("Created successfully!", "success", 5000)
    }
    yield put(stopSubmit('PostBodies', error));
    yield put(reset('PostBodies'));
}

//edit form data of makes
export function* editBodySaga() {
    yield takeLatest(types.REQUEST_BODIES_UPDATE, callEditBody);
}

function* callEditBody (action) {
    yield put(startSubmit('EditBodies'));
    let error = {};
    const result =  yield call(api.updateBodies, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.errors});
        error = result.error;
        notify.show("Update failed!","error", 5000);

    } else {
        // yield put({type: types.UPDATE_BODIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_BODIES, pageNumber, sorted_column, order})
        notify.show("Updated successfully!", "success", 5000)
        
    }
    yield put(stopSubmit('EditBodies', error));
    yield put(reset('EditBodies'));
}

// change status value
export function* toggleBodyStatusSaga() {
    yield takeLatest(types.REQUEST_BODIES_STATUS, callToggleBodyStatus);
}

function* callToggleBodyStatus(action) {
    const result =  yield call(api.updateBodiesStatus, action.bodyId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot update status !","error", 5000);

    } else {
        // yield put({type: types.BODIES_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_BODIES, pageNumber, sorted_column, order})
        notify.show("Status updated successfully!", "success", 5000)
    }
}

// delete makes data from table
export function* deleteBodySaga() {
    yield takeLatest(types.REQUEST_BODIES_DELETE, callDeleteBody)
}

function* callDeleteBody(action) {
    const result = yield call(api.deleteBody, action.bodyId);

    if(result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed!", "error", 5000)
    } else {
        yield put(bodyAction.deleteBodiesSuccess(action.bodyId, result.statusText));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

