// import axios from 'axios';

import axios from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
// const URL = `http://127.0.0.1:8000`


//GET ALL BODIES API
export function getBodies() {
    return axios.get('/api/bodies',{headers})
}

//GET BODIES BY PAGINATION API
export function getBodiesPages(pageNumber) {
    return axios.get(`/api/bodies?page=${pageNumber}`,{headers})
}

// ADD NEW BODIES API
export function addBodies(values) {
    values.created_by = 1;
    return axios.post('/api/bodies',values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE BODIES API
export function deleteBody(bodyId) {
    return axios.delete('/api/bodies/'+ bodyId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE BODIES API
export function updateBodies(bodyId, values) {
    return axios.put('/api/bodies/'+ bodyId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateBodiesStatus (bodyId, values) {
    return axios.put('/api/bodies/'+ bodyId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
// GET SINGLE DATA OF BODIES
export function getSingleBodies (bodyId) {
    return axios.get('/api/bodies/'+bodyId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}