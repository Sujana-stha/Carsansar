// import axios from 'axios';
// const URL = `http://127.0.0.1:8000`

import axios from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

//GET ALL OPTIONS API
export function getOptions() {
    return axios.get('/api/options',{headers})
}

//GET OPTIONS BY PAGINATION API
export function getOptionsPages(pageNumber) {
    return axios.get(`/api/options?page=${pageNumber}`,{headers})
}

// ADD NEW OPTIONS API
export function addOptions(values) {
    values.created_by = 1;
    return axios.post('/api/options', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE OPTIONS API
export function deleteOptions(optionId) {
    return axios.delete('/api/options/'+ optionId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE OPTIONS API
export function updateOptions(optionId, values) {
    return axios.put('/api/options/'+ optionId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateOptionsStatus (optionId, values) {
    return axios.put('/api/options/'+ optionId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF Options
export function getSingleOptions (optionId) {
    return axios.get('/api/options/'+optionId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}