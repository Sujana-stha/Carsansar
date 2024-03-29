import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/users-api';
import {notify} from 'react-notify-toast';
import { push } from 'connected-react-router';

//to get list of all users
export function* getUsersWatcher() {
    yield takeLatest(types.REQUEST_USERS, getUsersListFlow);
}

function* getUsersListFlow(action) {
    const response = yield call(api.getUsers, action.pageNumber, action.sorted_column, action.order)
    const users =  response.data
    if(response.errors) {
        yield put({type: types.REQUEST_USERS_ERROR, errors: response.errors})
        notify.show("Cannot get all users !", "error", 5000)
    } else {
        yield put({type: types.GET_USERS_SUCCESS, users});
    }
}

// to add new user
export function* addUserWatcher() {
    yield takeLatest(types.REGISTER_REQUEST, addUserFlow)
}

function* addUserFlow(action) {
    yield put(startSubmit('RegisterForm'))
    try {
        const response = yield call(api.registerUsers, action.values)
        const resp = response.data
        if(response.status === 200 ) {
            yield put({type: types.REGISTER_SUCCESS, resp})
            notify.show("Users created successfully!","success", 5000)
        }
    } 
    catch (error) {
        yield put({type: types.REGISTER_ERROR})
        notify.show("Cannot add user!","error",5000)
    }
    yield put(stopSubmit('RegisterForm'));
    yield put(reset('RegisterForm'));
    yield put(push('/dashboard/users'));
}

// get logged users
export function* getLoggedUserWatcher() {
    yield takeLatest(types.REQUEST_LOGGED_USER, getLoggedUserFlow)
}

function* getLoggedUserFlow() {
    try {
        const result = yield call(api.getLoggedUser)
        const resp = result.data
        if(resp) {
            window.localStorage.setItem("logged_user", resp.username);
            window.localStorage.setItem("role", resp.role);
            yield put({type: types.GET_LOGGED_USER, resp})
        }
    } catch (error) {
        notify.show("Cannot get user details!","error",5000)
    }
}

// to edit user
export function* editUserSaga() {
    yield takeLatest(types.REQUEST_USERS_UPDATE, callEditUser);
}

function* callEditUser (action) {
    yield put(startSubmit('UpdateUser'));
    let error = {};
    const result =  yield call(api.updateUser, action.values.id, action.values);
    const resp = result.data;
    
    if (result.errors) {
        yield put({ type: types.REQUEST_USERS_ERROR, errors: result.error});
        error = result.error;
        notify.show("Update failed!","error", 5000);
    } else {
        yield put({type: types.USERS_UPDATE_SUCCESS, resp})
        notify.show("Updated successfully!", "success", 5000)
        yield put(push('/users'));
    }
    yield put(stopSubmit('UpdateUser', error));
    yield put(reset('UpdateUser'));
}
