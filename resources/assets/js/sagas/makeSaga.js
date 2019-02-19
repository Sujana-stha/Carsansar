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
    console.log('acti', action)
    
    const response = yield call(api.getMakes);
    const makes = response.data
    yield put({type: types.GET_MAKES_SUCCESS, makes});
}

// Get Makes pagination in table
export function* MakesPagesWatcher() {
    yield takeLatest(types.REQUEST_MAKES_PAGES, callMakesPages)
}
function* callMakesPages(action) {
    const result =  yield call(api.getMakesPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED});
        notify.show("Cannot Get All Makes", "error", 5000);
    } else {
        yield put({type: types.GET_MAKES_PAGES, resp});
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
    let error = {};
    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED});
        notify.show("Cannot Add Makes!","error", 5000);
        error = result.errors
    } else {
        // yield put({type: types.ADD_MAKES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_MAKES});
        notify.show(`${resp.make_desc} Make Added Successfully!`, "success", 5000);

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
    const pageNumber = action.page
    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.errors});
        notify.show(`Cannot Update ${resp.make_desc}!`,"error", 5000);
        error = result.errors

    } else {
        // yield put({type: types.UPDATE_MAKES_SUCCESS, resp, message: result.statusText});
        yield put ({type: types.REQUEST_MAKES_PAGES, pageNumber})
        notify.show(`${resp.make_desc} Make Updated Successfully!`, "success", 5000);

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
    const pageNumber = action.page

    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        notify.show(`Cannot Change Status of ${resp.make_desc}!`,"error", 5000);

    } else {
        // yield put({type: types.MAKES_STATUS_SUCCESS, resp});
        yield put ({type: types.REQUEST_MAKES_PAGES, pageNumber})
        notify.show(`Status of ${resp.make_desc} Updated!`, "success",5000);
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
        notify.show("Cannot Delete Make!","error", 5000);

    } else {
        yield put(makeAction.deleteMakesSuccess(action.makeId, result.statusText));
        notify.show("Make Deleted Successfully!", "error", 5000);

    }
} 

