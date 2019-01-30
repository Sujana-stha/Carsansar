import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL OPTIONS API
export function getOptions() {
    return axios.get(`${URL}/api/options`)
}

//GET OPTIONS BY PAGINATION API
export function getOptionsPages(pageNumber) {
    return axios.get(`${URL}/api/options?page=${pageNumber}`)
}

// ADD NEW OPTIONS API
export function addOptions(values) {
    values.created_by = 1;
    return axios.post(`${URL}/api/options`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE OPTIONS API
export function deleteOptions(optionId) {
    return axios.delete(`${URL}/api/options/`+ optionId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE OPTIONS API
export function updateOptions(optionId, values) {
    return axios.put(`${URL}/api/options/`+ optionId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateOptionsStatus (optionId, values) {
    return axios.put(`${URL}/api/options/`+ optionId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF Options
export function getSingleOptions (optionId) {
    return axios.get(`${URL}/api/options/`+optionId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}