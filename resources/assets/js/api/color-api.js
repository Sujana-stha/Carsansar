
import axios, {getHeaders} from './axiosInstance'

//GET ALL COLORS API
export function getColors(pageNumber,sorted_column, order) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/colors?page=${pageNumber}&column=${sorted_column}&order=${order}`,{headers})
}

// ADD NEW COLORS API
export function addColors(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    values.created_by = 1;
    return axios.post('/api/colors', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE COLORS API
export function deleteColors(colorId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/colors/'+ colorId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE COLORS API
export function updateColors(colorId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/colors/'+ colorId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API OF COLORS
export function updateColorsStatus (colorId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/colors/'+ colorId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF COLORS
export function getSingleColors (colorId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/colors/'+colorId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}