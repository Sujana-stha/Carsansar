
import {takeLatest, call, put } from 'redux-saga/effects';
import * as types from '../actions/action-types';
import * as api from '../api/deals-api';
import {notify} from 'react-notify-toast';

// get list of makes for Options
export function* makesListWatcher() {
    yield takeLatest(types.MAKES_LIST_SUCCESS, callMakesList)
}

function* callMakesList() {
    const result = yield call(api.getMakesList);
    const makes = response.data
    if(result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Get List of Make!","error", 5000);
    } else {
        yield put({type: types.MAKES_LIST_SUCCESS, makes})
    }
}