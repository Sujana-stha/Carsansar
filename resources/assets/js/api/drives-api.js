
import axios, {getHeaders} from './axiosInstance'

//GET ALL DRIVES API
export function getDrives(pageNumber, sorted_column, order) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/drives?page=${pageNumber}&column=${sorted_column}&order=${order}`,{headers})
}

// ADD NEW DRIVES API
export function addDrives(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/drives/'+driveId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}