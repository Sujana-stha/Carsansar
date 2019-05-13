
import axios, {getHeaders} from './axiosInstance'

//GET ALL OPTION CATEGORIES API
export function getOptionsCategories() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/optionsCategories',{headers})
}


// ADD NEW OPTION CATEGORIES API
export function addOptionsCategories(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/optionsCategories', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE OPTION CATEGORIES API
export function deleteOptionsCategories(optCatId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/optionsCategories/'+ optCatId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE OPTION CATEGORIES API
export function updateOptionsCategories(optCatId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/optionsCategories/'+ optCatId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateOptionsCategoriesStatus (optCatId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/optionsCategories/'+ optCatId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF OptionsCategories
export function getSingleOptionsCategories (optCatId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/optionsCategories/'+optCatId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}