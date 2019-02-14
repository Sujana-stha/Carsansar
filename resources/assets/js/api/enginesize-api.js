// import axios from 'axios';
// const URL = `http://127.0.0.1:8000`

import axios from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

//GET ALL MAKES API
export function getEnginesizes() {
    return axios.get('/api/enginesizes',{headers})
}

//GET MAKES BY PAGINATION API
export function getEnginesizesPages(pageNumber) {
    return axios.get(`/api/enginesizes?page=${pageNumber}`,{headers})
}

// ADD NEW MAKES API
export function addEnginesizes(values) {
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
    return axios.get('/api/enginesizes/'+enginesizesId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}