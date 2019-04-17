
import axios, {getHeaders} from './axiosInstance'


//GET ALL BODIES API
export function getBodies(pageNumber, sorted_column, order) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/bodies?page=${pageNumber}&column=${sorted_column}&order=${order}`,{headers})
}

// ADD NEW BODIES API
export function addBodies(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
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
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/bodies/'+bodyId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}