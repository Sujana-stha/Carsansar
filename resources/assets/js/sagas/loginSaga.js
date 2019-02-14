import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import { push } from 'connected-react-router';
import * as types from '../actions/action-types';
import * as api from '../api/login-api';
import {notify} from 'react-notify-toast';

// login request
export function* loginWatcher() {
    yield takeLatest(types.LOGIN_REQUEST, loginFlow)
}

function* loginFlow(action) {
    yield put(startSubmit('LoginForm'))
    console.log('act', action)
    // const data = {
    //     grant_type: "password",
    //     client_id: "8",
    //     client_secret: "O6JZsrsPjGA9yMHwnnCxKiSQZx9ojlP3THWu7YsD",
    //     username: action.data.email,
    //     password: action.data.password,
    //     scope: "*"
    // }
    try {
        const response = yield call(api.login, action.data)
        const data= response.data
        console.log('resp', response)
        if(response.status === 200) {
            window.localStorage.setItem("access_token", response.data.success.token);
            window.localStorage.setItem("refresh_token", response.data.success.token);
            yield put({ type: types.LOGIN_SUCCESS, data});
            yield put(push('/'));
            notify.show("Login Successfull!", "success", 5000);
        }
    } catch(error) {
        yield put({type: types.LOGIN_ERROR, error})
        notify.show("Cannot Login!", "error", 5000);
    }
    yield put(stopSubmit('LoginForm'));
    yield put(reset('LoginForm'));
}