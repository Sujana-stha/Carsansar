// import axios from 'axios';
// const URL = `http://127.0.0.1:8000`
import axios, {getHeaders} from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = getHeaders(access_token);
//GET ALL FUELTYPES API
export function getFueltypes() {
    return axios.get('/api/fueltypes',{headers})
}

//GET FUELTYPES BY PAGINATION API
export function getFueltypesPages(pageNumber) {
    return axios.get(`/api/fueltypes?page=${pageNumber}`,{headers})
}

// ADD NEW FUELTYPES API
export function addFueltypes(values) {
    values.created_by = 1;
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
    return axios.get('/api/fueltypes/'+fueltypeId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}