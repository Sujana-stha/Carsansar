import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import {push } from 'connected-react-router';
import * as types from '../actions/action-types';
import * as api from '../api/login-api';
import {notify} from 'react-notify-toast';

// login request
export function* loginWatcher() {
    yield takeLatest(types.LOGIN_REQUEST, loginFlow)
}

function* loginFlow(action) {
    yield put(startSubmit('LoginForm'))
    const data = {
        grant_type: "password",
        client_id: "2",
        client_secret: window.Laravel.client_secret,
        username: action.data.email,
        password: action.data.password,
        scope: "*"
    }
    try {
        const result = yield call(api.login, data)
        const resp= result.data
        if(result.status == 200) {
            window.localStorage.setItem("access_token", resp.access_token);
            window.localStorage.setItem("refresh_token", resp.refresh_token);
            yield put({ type: types.LOGIN_SUCCESS, resp});
            yield put(push('/dashboard'));
            // window.location.reload();
            notify.show("Login Successfull!", "success", 5000);
        } else if(result.errors) {
            notify.show("Incorrect Email or Password!","error",5000)
        }
    } catch(error) {
        yield put({type: types.LOGIN_ERROR, error})
        notify.show("Cannot Login!", "error", 5000);
    }
    yield put(stopSubmit('LoginForm'));
    yield put(reset('LoginForm'));
}

//logout Request

export function* logoutWatcher() {
    yield takeLatest(types.LOGOUT_REQUEST, logoutFlow)
}

function* logoutFlow() {
    try {
        const response = yield call(api.logout)
        if(response.status === 200) {
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('refresh_token');
            yield put({type: types.LOGOUT_SUCCESS})
            yield put(push('/auth/login'));
            yield put(push('/login'));

            notify.show("You are successfully Logout!", "success", 5000)
        } else if(response.errors) {
            notify.show("Something went wrong. Please try again", )
        }
    } 
    catch (error) {
        yield put({type: types.LOGOUT_ERROR, error})
        notify.show("Something went Wrong. Please Try Again!", "error", 5000)
    }
}