
import axios, {getHeaders} from './axiosInstance'

//GET ALL MODEL API
export function getModel(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/models?page=${pageNumber}`,{headers})
}

// ADD NEW MODEL API
export function addModel(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    values.created_by = 1;
    return axios.post('/api/models', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE MODEL API
export function deleteModel(modelId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/models/'+ modelId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE MODEL API
export function updateModel(modelId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/models/'+ modelId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF Models
export function getSingleModels (modelId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/models/'+modelId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}