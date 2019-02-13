import * as types from './action-types';

export function loginRequest(data) {
    return {
        type: types.LOGIN_REQUEST,
        data
    }
}

export function loginSubmit(data) {
    return {
        type: types.LOGIN_SUBMIT,
        data
    }
}

export function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS,
        data
    }
}

export function logout() {
    return {
        type: types.LOGOUT_SUCCESS
    }
}

export function loginError(errors) {
    return {
        type: types.LOGIN_ERROR,
        errors
    }
}