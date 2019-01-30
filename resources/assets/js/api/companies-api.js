import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL COMPANIES API
export function getCompanies() {
    return axios.get(`${URL}/api/companies`)
}

//GET COMPANIES BY PAGINATION API
export function getCompaniesPages(pageNumber) {
    return axios.get(`${URL}/api/companies?page=${pageNumber}`)
}

// ADD NEW COMPANIES API
export function addCompanies(values) {
    values.created_by = 1;
    return axios.post(`${URL}/api/companies`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE COMPANIES API
export function deleteCompanies(companyId) {
    return axios.delete(`${URL}/api/companies/`+ companyId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE COMPANIES API
export function updateCompanies(companyId, values) {
    return axios.put(`${URL}/api/companies/`+ companyId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateCompaniesStatus (companyId, values) {
    return axios.put(`${URL}/api/companies/`+ companyId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
// GET SINGLE DATA OF Companies
export function getSingleCompanies (companyId) {
    return axios.get(`${URL}/api/companies/`+companyId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}