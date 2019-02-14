// import axios from 'axios';
// const URL = `http://127.0.0.1:8000`

import axios from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

//GET ALL DRIVES API
export function getDrives() {
    return axios.get('/api/drives',{headers})
}

//GET DRIVES BY PAGINATION API
export function getDrivesPages(pageNumber) {
    return axios.get(`/api/drives?page=${pageNumber}`,{headers})
}

// ADD NEW DRIVES API
export function addDrives(values) {
    values.created_by = 1;
    return axios.post('/api/drives', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE DRIVES API
export function deleteDrives(driveId) {
    return axios.delete('/api/drives/'+ driveId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE DRIVES API
export function updateDrives(driveId, values) {
    return axios.put('/api/drives/'+ driveId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateDrivesStatus (driveId, values) {
    return axios.put('/api/drives/'+ driveId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF Drives
export function getSingleDrives (driveId) {
    return axios.get('/api/drives/'+driveId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}