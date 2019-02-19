
import axios, {getHeaders} from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = getHeaders(access_token);

//GET ALL MODEL API
export function getModel() {
    return axios.get('/api/models',{headers})
}

//GET MODEL BY PAGINATION API
export function getModelPages(pageNumber) {
    return axios.get(`/api/models?page=${pageNumber}`,{headers})
}

// ADD NEW MODEL API
export function addModel(values) {
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
    return axios.get('/api/models/'+modelId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}