import {takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/deals-api';
import {notify} from 'react-notify-toast';
import { push } from 'connected-react-router';

//SAGA TO GET LIST OF VEHICLES
export function* vehiclesWatcher() {
    yield takeLatest(types.REQUEST_VEHICLES, callVehiclesSaga)
}


function* callVehiclesSaga(action) {
    
    const response = yield call(api.getVehicles, action.pageNumber, action.sorted_column, action.order);
    const vehicles = response.data
    
    // const options = yield all (results.map(result=> 
    //     optionDesc(result.attribute.option_ids)
    // ))
    // const vehicles = results.filter(result=>{
    //     const opt =  options.filter(option=> {
    //         if(results.indexOf(result)===options.indexOf(option)) {
    //             return Object.assign(result, {
    //                 option_desc: option
    //             })
    //         }
    //     })
    //     return opt;
    // })
    if (response.errors) {
        yield put({ type: types.REQUEST_VEHICLES_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot get all vehicles", "error", 5000)
    } else {
        yield put({type: types.GET_VEHICLES_SUCCESS, vehicles});
    }
}

// function* optionDesc (optionId) {
//     const optionRes = yield call(api.getOptionsDesc, optionId);
//     return optionRes.data;
// }

// saga for add new vehicles
export function* submitVehicleSaga() {
    yield takeLatest(types.REQUEST_VEHICLES_SUBMIT, callVehicleSubmit)
}

function* callVehicleSubmit(action) {
    yield put(startSubmit('PostVehicles'));
    let error = {};
    const pageNumber = 1
    const sorted_column = 'id'
    const order = 'desc'
    const result =  yield call(api.addVehicles, action.values);
    const resp = result.data
    if (result.errors) {
        yield put({ type: types.REQUEST_VEHICLES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Creation failed!", "error", 5000)
    } else {
        yield put({type: types.REQUEST_VEHICLES, pageNumber, sorted_column, order});
        notify.show("Vehicle created successfully!", "success", 5000);
    }
    yield put(stopSubmit('PostVehicles', error));
    yield put(reset('PostVehicles'));
    yield put(push('/dashboard/vehicles'));
}

//SAGA TO UPDATE VEHICLES
export function* editVehicleSaga() {
    yield takeLatest(types.REQUEST_VEHICLES_UPDATE, callVehicleUpdate)
}

function* callVehicleUpdate(action) {
    yield put(startSubmit('EditVehicles'));
    console.log('act', action)
    let error = {};
    const result = yield call(api.updateVehicles, action.vehicleId, action.values);
    const resp = result.data;
    if (result.errors) {
        yield put({ type: types.REQUEST_VEHICLES_FAILED, errors: result.errors});
        notify.show(`Update failed!`,"error", 5000);
        error = result.errors

    } else {
        // yield put({type: types.UPDATE_MAKES_SUCCESS, resp, message: result.statusText});
        yield put ({type: types.REQUEST_VEHICLES})
        notify.show(`Updated successfully!`, "success", 5000);

    }
    yield put(stopSubmit('EditVehicles', error));
    yield put(reset('EditVehicles'));
    // yield put(push('/dashboard/vehicles'));
}

// saga for creating vehicles attr
export function* createVehiclesAttrSaga() {
    yield takeLatest(types.REQUEST_VEHICLES_ATTR_CREATE, callVehiclesAttrCreate)
}

function* callVehiclesAttrCreate(action) {
    let error ={}
    try {
        const response = yield call(api.vehicleAttr, action.values, action.apiName)
        const resp = response.data
        const apiName = action.apiName
        if(resp) {
            yield put({type: types.ADD_VEHICLES_ATTR_SUCCESS, resp,apiName})
            notify.show(`${action.values} has been added`, "success", 5000)
        }
    } catch (error) {
        
    }
}