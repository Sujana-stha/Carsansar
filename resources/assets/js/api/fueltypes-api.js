
import axios, {getHeaders} from './axiosInstance'

//GET ALL FUELTYPES API
export function getFueltypes(pageNumber, sorted_column, order) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/fueltypes?page=${pageNumber}&column=${sorted_column}&order=${order}`,{headers})
}

// ADD NEW FUELTYPES API
export function addFueltypes(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/fueltypes', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE FUELTYPES API
export function deleteFueltype(fueltypeId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/fueltypes/'+ fueltypeId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE FUELTYPES API
export function updateFueltype(fueltypeId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/fueltypes/'+ fueltypeId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateFueltypeStatus (fueltypeId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/fueltypes/'+ fueltypeId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
// GET SINGLE DATA OF Fueltypes
export function getSingleFueltypes (fueltypeId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/fueltypes/'+fueltypeId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}