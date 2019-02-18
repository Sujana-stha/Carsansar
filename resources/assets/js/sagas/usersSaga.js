import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/users-api';
import {notify} from 'react-notify-toast';

export function* addUserWatcher() {
    yield takeLatest(types.REGISTER_REQUEST, addUserFlow)
}

function* addUserFlow(action) {
    yield put(startSubmit('RegisterForm'))
    console.log('act', action)
    try {
        const response = yield call(api.registerUsers, action.values)
        console.log('resp', response)
        const resp = response.data
        if(response.status === 200 ) {
            yield put({type: types.REGISTER_SUCCESS, resp})
            notify.show("Users Added Successfully!","success", 5000)
        }
    } 
    catch (error) {
        yield put({type: types.REGISTER_ERROR})
        notify.show("Cannot add Users!","error",5000)
    }
    yield put(stopSubmit('RegisterForm'));
    yield put(reset('RegisterForm'));
}