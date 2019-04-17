
import axios, {getHeaders} from './axiosInstance'

//GET ALL MAKES API
export function getMakes(pageNumber,sorted_column, order) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/makes?page=${pageNumber}&column=${sorted_column}&order=${order}`, {headers})
}

// ADD NEW MAKES API
export function addMakes(values, ) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    values.created_by = 1;
    return axios.post('/api/makes',values, {headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE MAKES API
export function deleteMake(makeId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/makes/'+ makeId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE MAKES API
export function updateMake(makeId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/makes/'+ makeId,values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateMakeStatus (makeId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/makes/'+ makeId,values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF MAKES
export function getSingleMakes (makeId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/makes/'+makeId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

