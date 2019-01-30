import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL MODEL API
export function getModel() {
    return axios.get(`${URL}/api/models`)
}

//GET MODEL BY PAGINATION API
export function getModelPages(pageNumber) {
    return axios.get(`${URL}/api/models?page=${pageNumber}`)
}

// ADD NEW MODEL API
export function addModel(values) {
    values.created_by = 1;
    return axios.post(`${URL}/api/models`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE MODEL API
export function deleteModel(modelId) {
    return axios.delete(`${URL}/api/models/`+ modelId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE MODEL API
export function updateModel(modelId, values) {
    return axios.put(`${URL}/api/models/`+ modelId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF Models
export function getSingleModels (modelId) {
    return axios.get(`${URL}/api/models/`+modelId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}