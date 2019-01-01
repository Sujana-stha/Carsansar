import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL TRANSMISSION API
export function getTransmission() {
    return axios.get(`${URL}/api/transmissions`)
}

//GET TRANSMISSION BY PAGINATION API
export function getTransmissionPages(pageNumber) {
    return axios.get(`${URL}/api/transmissions?page=${pageNumber}`)
}

// ADD NEW TRANSMISSION API
export function addTransmission(values) {
    console.log('val',values);
    values.created_by = 1;
    return axios.post(`${URL}/api/transmissions`, values)
    .catch(error=>console.log(error));
}

//DELETE TRANSMISSION API
export function deleteTransmission(transmissionId) {
    return axios.delete(`${URL}/api/transmissions/`+ transmissionId)
    .catch(error=>console.log(error));
}

// UPDATE TRANSMISSION API
export function updateTransmission(transmissionId, values) {
    console.log('va', values)
    console.log('id', transmissionId)
    return axios.put(`${URL}/api/transmissions/`+ transmissionId, values)
    .catch(error=>console.log(error));
}

// TOGGLE STATUS API
export function updateTransmissionStatus (transmissionId, values) {
    return axios.put(`${URL}/api/transmissions/`+ transmissionId, values)
    .catch(error => console.log(error));
}