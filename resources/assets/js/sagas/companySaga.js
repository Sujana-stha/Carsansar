import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as Api from '../api/companies-api';
import * as companyAction from '../actions/companies-action';
import {notify} from 'react-notify-toast'

//Get makes data in table
export function* CompanyWatcher() {
    yield takeLatest(types.REQUEST_COMPANIES, CompanySaga)
}
function* CompanySaga(action) {
    const response = yield call(Api.getCompanies, action.pageNumber, action.sorted_column, action.order);
    const companies = response.data
    if (response.errors) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot get all company", "error", 5000)
    } else {
        yield put({type: types.GET_COMPANIES_SUCCESS, companies});
    }
}

// Submit form data of makes
export function* submitCompanySaga() {
    yield takeLatest(types.REQUEST_COMPANIES_SUBMIT, callCompanySubmit)
}
function* callCompanySubmit(action) {
    yield put(startSubmit('PostCompanies'));
    let error = {};
    const result =  yield call(Api.addCompanies, action.values);
    const resp = result.data
    
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: result.error});
        error = result.error|| resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Company already exists!","error", 5000);
        }
        notify.show("Cannot create new Company!", "error", 5000)
    } else {
        // yield put({type: types.ADD_COMPANIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_COMPANIES, pageNumber, sorted_column, order})
        notify.show(`Created successfully!`, "success", 5000);
    }
    yield put(stopSubmit('PostCompanies', error));
    yield put(reset('PostCompanies'));
}

//edit form data of makes
export function* editCompanySaga() {
    yield takeLatest(types.REQUEST_COMPANIES_UPDATE, callEditCompany);
}

function* callEditCompany (action) {
    yield put(startSubmit('EditCompanies'));
    let error = {};
    const result =  yield call(Api.updateCompanies, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Update failed!`, "error", 5000)
    } else {
        // yield put({type: types.UPDATE_COMPANIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_COMPANIES, pageNumber, sorted_column, order})
        notify.show(`Updated successfully!`, "success", 5000);
    }
    yield put(stopSubmit('EditCompanies', error));
    yield put(reset('EditCompanies'));
}

// change status value
export function* toggleCompaniesStatusSaga() {
    yield takeLatest(types.REQUEST_COMPANIES_STATUS, callCompanyToggleStatus);
}

function* callCompanyToggleStatus(action) {
    let error = {};
    const result =  yield call(Api.updateCompaniesStatus, action.companyId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Status update failed!`, "error", 5000)

    } else {
        // yield put({type: types.COMPANIES_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_COMPANIES, pageNumber, sorted_column, order})
        notify.show(`Status updates Successfully!`, "success", 5000);
    }
}

// delete makes data from table
export function* deleteCompanySaga() {
    yield takeLatest(types.REQUEST_COMPANIES_DELETE, callDeleteCompany)
}

function* callDeleteCompany(action) {
    const result = yield call(Api.deleteCompanies, action.companyId);

    if(result.errors) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed!", "error", 5000)
    } else {
        yield put(companyAction.deleteCompaniesSuccess(action.companyId, result.statusText));
        notify.show("Deleted successfully", "error", 5000);
    }
} 

