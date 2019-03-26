
import axios, {getHeaders} from './axiosInstance'


//GET ALL COMPANIES API
export function getCompanies(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/companies?page=${pageNumber}`,{headers})
}

// ADD NEW COMPANIES API
export function addCompanies(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/companies/'+companyId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}