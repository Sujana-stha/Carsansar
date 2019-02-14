// import axios from 'axios';
// const URL = `http://127.0.0.1:8000`
import axios from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

//GET ALL COMPANIES API
export function getCompanies() {
    return axios.get('/api/companies',{headers})
}

//GET COMPANIES BY PAGINATION API
export function getCompaniesPages(pageNumber) {
    return axios.get(`/api/companies?page=${pageNumber}`,{headers})
}

// ADD NEW COMPANIES API
export function addCompanies(values) {
    values.created_by = 1;
    return axios.post('/api/companies', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE COMPANIES API
export function deleteCompanies(companyId) {
    return axios.delete('/api/companies/'+ companyId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE COMPANIES API
export function updateCompanies(companyId, values) {
    return axios.put('/api/companies/'+ companyId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateCompaniesStatus (companyId, values) {
    return axios.put('/api/companies/'+ companyId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
// GET SINGLE DATA OF Companies
export function getSingleCompanies (companyId) {
    return axios.get('/api/companies/'+companyId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}