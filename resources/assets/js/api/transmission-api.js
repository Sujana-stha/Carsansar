
import axios, {getHeaders} from './axiosInstance'


//GET ALL TRANSMISSION API
export function getTransmission(pageNumber, sorted_column, order) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/transmissions?page=${pageNumber}&column=${sorted_column}&order=${order}`,{headers})
}

// ADD NEW TRANSMISSION API
export function addTransmission(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/transmissions/'+transmissionId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}