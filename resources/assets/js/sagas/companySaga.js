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
function* CompanySaga() {
    const response = yield call(Api.getCompanies);
    const companies = response.data
    yield put({type: types.GET_COMPANIES_SUCCESS, companies});
}

// Get Makes pagination in table
export function* CompaniesPagesWatcher() {
    yield takeLatest(types.REQUEST_COMPANIES_PAGES, callCompaniesPages)
}
function* callCompaniesPages(action) {
    const result =  yield call(Api.getCompaniesPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Get all Company", "error", 5000)
    } else {
        yield put({type: types.GET_COMPANIES_PAGES, resp});
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

    if (result.errors) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Add Company!", "error", 5000)
    } else {
        // yield put({type: types.ADD_COMPANIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_COMPANIES})
        notify.show("Company Added Successfully!", "success", 5000);

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
    const pageNumber = action.page
    if (result.errors) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Update ${resp.name}!`, "error", 5000)
    } else {
        // yield put({type: types.UPDATE_COMPANIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_COMPANIES_PAGES, pageNumber})
        notify.show(`${resp.name} Company Updated Successfully!`, "success", 5000);

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
    console.log('action', action)
    const result =  yield call(Api.updateCompaniesStatus, action.companyId, action.values);
    const resp = result.data;
    const pageNumber = action.page
    if (result.errors) {
        yield put({ type: types.REQUEST_COMPANIES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Change Status of ${resp.name}!`, "error", 5000)

    } else {
        // yield put({type: types.COMPANIES_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_COMPANIES_PAGES, pageNumber})
        notify.show("Status Changed Successfully!", "success", 5000);
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
        notify.show("Cannot Delete Company!", "error", 5000)
    } else {
        yield put(companyAction.deleteCompaniesSuccess(action.companyId, result.statusText));
        notify.show("Company Deleted Successfully", "error", 5000);
    }
} 

