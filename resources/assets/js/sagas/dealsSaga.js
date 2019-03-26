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

//saga for search vehicles by attr
export function* SearchVehicleSaga() {
    yield takeLatest(types.REQUEST_VEHICLES_ATTR_SEARCH, callVehiclesSearch);
}

function* callVehiclesSearch(action) {
    yield put(startSubmit('VehicleSearchForm'));
    let error = {}
    try {
        // const response = yield call(api.searchVechiles, action.values)
        const resp = response.data
        if(response.status === 200 ) {
            yield put({type: types.VEHICLES_ATTR_SEARCH_SUCCESS, resp})
        }
    } 
    catch (error) {
        yield put({type: types.REQUEST_VEHICLES_FAILED})
    }
    yield put(stopSubmit('VehicleSearchForm', error));
    yield put(reset('VehicleSearchForm'));
}

// saga for creating vehicles attr
export function* createVehiclesAttrSaga() {
    yield takeLatest(types.REQUEST_VEHICLES_ATTR_CREATE, callVehiclesAttrCreate)
}

function* callVehiclesAttrCreate(action) {
    console.log('act', action)
    let error ={}
    try {
        const response = yield call(api.vehicleAttr, action.values, action.apiName)
        const resp = response.data
        console.log('reess', response)
        const apiName = action.apiName
        if(resp) {
            yield put({type: types.ADD_VEHICLES_ATTR_SUCCESS, resp,apiName})
            notify.show(`${action.values} has been added`, "success", 5000)
        }
    } catch (error) {
        
    }
}