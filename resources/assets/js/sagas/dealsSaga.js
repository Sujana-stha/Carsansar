import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/deals-api';
import {notify} from 'react-notify-toast';

// saga for add new vehicles
export function* submitVehicleSaga() {
    yield takeLatest(types.REQUEST_VEHICLES_SUBMIT, callVehicleSubmit)
}

function* callVehicleSubmit(action) {
    console.log('acc', action)
    yield put(startSubmit('PostVehicles'));
    let error = {};
    const result =  yield call(api.addVehicles, action.values);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_VEHICLES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Add Vehicles!", "error", 5000)
    } else {
        yield put({type: types.ADD_VEHICLES_SUCCESS, resp});
        // yield put({type: types.REQUEST_COMPANIES})
        notify.show("Vehicle Added Successfully!", "success", 5000);

    }
    yield put(stopSubmit('PostVehicles', error));
    yield put(reset('PostVehicles'));
}