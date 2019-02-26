
import axios, {getHeaders} from './axiosInstance'

//GET ALL MAKES API
export function getEnginesizes() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/enginesizes',{headers})
}

//GET MAKES BY PAGINATION API
export function getEnginesizesPages(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/enginesizes?page=${pageNumber}`,{headers})
}

// ADD NEW MAKES API
export function addEnginesizes(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    values.created_by = 1;
    return axios.post('/api/enginesizes', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE MAKES API
export function deleteEnginesizes(enginesizesId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/enginesizes/'+ enginesizesId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE MAKES API
export function updateEnginesizes(enginesizesId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/enginesizes/'+ enginesizesId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateEnginesizesStatus (enginesizesId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/enginesizes/'+ enginesizesId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF Enginesizes
export function getSingleEnginesizes (enginesizesId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/enginesizes/'+enginesizesId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}