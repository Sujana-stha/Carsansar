
import axios, {getHeaders} from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = getHeaders(access_token);

//GET ALL OPTION CATEGORIES API
export function getOptionsCategories() {
    return axios.get('/api/optionsCategories',{headers})
}

//GET OPTION CATEGORIES BY PAGINATION API
// export function getOptionsCategoriesPages(pageNumber) {
//     return axios.get(`${URL}/api/optionsCategories?page=${pageNumber}`)
// }

// ADD NEW OPTION CATEGORIES API
export function addOptionsCategories(values) {
    values.created_by = 1;
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
    return axios.get('/api/optionsCategories/'+optCatId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}