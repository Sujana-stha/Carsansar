// import axios from 'axios';
// const URL = `http://127.0.0.1:8000`

import axios from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

//GET ALL TRANSMISSION API
export function getTransmission() {
    return axios.get('/api/transmissions',{headers})
}

//GET TRANSMISSION BY PAGINATION API
export function getTransmissionPages(pageNumber) {
    return axios.get(`/api/transmissions?page=${pageNumber}`,{headers})
}

// ADD NEW TRANSMISSION API
export function addTransmission(values) {
    values.created_by = 1;
    return axios.post('/api/transmissions', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE TRANSMISSION API
export function deleteTransmission(transmissionId) {
    return axios.delete('/api/transmissions/'+ transmissionId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE TRANSMISSION API
export function updateTransmission(transmissionId, values) {
    return axios.put('/api/transmissions/'+ transmissionId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateTransmissionStatus (transmissionId, values) {
    return axios.put('/api/transmissions/'+ transmissionId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF Transmissions
export function getSingleTransmissions (transmissionId) {
    return axios.get('/api/transmissions/'+transmissionId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}