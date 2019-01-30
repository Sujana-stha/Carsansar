import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL FUELTYPES API
export function getFueltypes() {
    return axios.get(`${URL}/api/fueltypes`)
}

//GET FUELTYPES BY PAGINATION API
export function getFueltypesPages(pageNumber) {
    return axios.get(`${URL}/api/fueltypes?page=${pageNumber}`)
}

// ADD NEW FUELTYPES API
export function addFueltypes(values) {
    values.created_by = 1;
    return axios.post(`${URL}/api/fueltypes`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE FUELTYPES API
export function deleteFueltype(fueltypeId) {
    return axios.delete(`${URL}/api/fueltypes/`+ fueltypeId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE FUELTYPES API
export function updateFueltype(fueltypeId, values) {
    return axios.put(`${URL}/api/fueltypes/`+ fueltypeId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateFueltypeStatus (fueltypeId, values) {
    return axios.put(`${URL}/api/fueltypes/`+ fueltypeId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
// GET SINGLE DATA OF Fueltypes
export function getSingleFueltypes (fueltypeId) {
    return axios.get(`${URL}/api/fueltypes/`+fueltypeId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}