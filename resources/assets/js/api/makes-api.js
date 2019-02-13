// import axios from 'axios';

import axios from './axiosInstance'

const URL = `http://127.0.0.1:8000`
const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
//GET ALL MAKES API
export function getMakes() {
    return axios.get('/api/makes',{headers})
}

//GET MAKES BY PAGINATION API
export function getMakesPages(pageNumber) {
    return axios.get(`/api/makes?page=${pageNumber}`,{headers})
}

// ADD NEW MAKES API
export function addMakes(values) {
    values.created_by = 1;
    return axios.post(`${URL}/api/makes`,{headers},values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE MAKES API
export function deleteMake(makeId) {
    return axios.delete(`${URL}/api/makes/`+ makeId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE MAKES API
export function updateMake(makeId, values) {
    return axios.put(`${URL}/api/makes/`+ makeId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateMakeStatus (makeId, values) {
    return axios.put(`${URL}/api/makes/`+ makeId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF MAKES
export function getSingleMakes (makeId) {
    return axios.get(`${URL}/api/makes/`+makeId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

