import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL MAKES API
export function getEnginesizes() {
    return axios.get(`${URL}/api/enginesizes`)
}

//GET MAKES BY PAGINATION API
export function getEnginesizesPages(pageNumber) {
    return axios.get(`${URL}/api/enginesizes?page=${pageNumber}`)
}

// ADD NEW MAKES API
export function addEnginesizes(values) {
    console.log('val',values);
    values.created_by = 1;
    return axios.post(`${URL}/api/enginesizes`, values)
    .catch(error=>console.log(error));
}

//DELETE MAKES API
export function deleteEnginesizes(enginesizesId) {
    return axios.delete(`${URL}/api/enginesizes/`+ enginesizesId)
    .catch(error=>console.log(error));
}

// UPDATE MAKES API
export function updateEnginesizes(enginesizesId, values) {
    return axios.put(`${URL}/api/enginesizes/`+ enginesizesId, values)
    .catch(error=>console.log(error));
}

// TOGGLE STATUS API
export function updateEnginesizesStatus (enginesizesId, values) {
    return axios.put(`${URL}/api/enginesizes/`+ enginesizesId, values)
    .catch(error => console.log(error));
}