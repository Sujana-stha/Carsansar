import * as types from '../actions/action-types';

export function requestUsers() {
    return {
        type: types.REQUEST_USERS
    }
}

export function getUserSuccess() {
    return {
        type: types.GET_USERS_SUCCESS
    }
}

export function registerUsersRequest(values) {
    return {
        type: types.REGISTER_REQUEST,
        values
    }
}

export function registerUserSuccess(values) {
    return  {
        type: types.REGISTER_SUCCESS,
        values
    }
}

export function registerError() {
    return {
        type: types.REGISTER_ERROR
    }
}

export function requestUserUpdate(values, userId) {
    return {
        type: types.REQUEST_USERS_UPDATE,
        values, userId
    }
}

export function userUpdateSuccess(values, userId) {
    return {
        type: types.USERS_UPDATE_SUCCESS,
        values, userId
    }
}

//get logged users
export function requestLoggedUser() {
    return {
        type: types.REQUEST_LOGGED_USER
    }
}

export function getLoggedUser(user) {
    return {
        type: types.GET_LOGGED_USER,
        user
    }
}