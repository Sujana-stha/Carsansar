import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL BODIES API
export function getBodies() {
    return axios.get(`${URL}/api/bodies`)
}

//GET BODIES BY PAGINATION API
export function getBodiesPages(pageNumber) {
    return axios.get(`${URL}/api/bodies?page=${pageNumber}`)
}

// ADD NEW BODIES API
export function addBodies(values) {
    values.created_by = 1;
    return axios.post(`${URL}/api/bodies`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE BODIES API
export function deleteBody(bodyId) {
    return axios.delete(`${URL}/api/bodies/`+ bodyId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE BODIES API
export function updateBodies(bodyId, values) {
    return axios.put(`${URL}/api/bodies/`+ bodyId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateBodiesStatus (bodyId, values) {
    return axios.put(`${URL}/api/bodies/`+ bodyId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
// GET SINGLE DATA OF BODIES
export function getSingleBodies (bodyId) {
    return axios.get(`${URL}/api/bodies/`+bodyId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}