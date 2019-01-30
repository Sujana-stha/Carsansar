import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL OPTION CATEGORIES API
export function getOptionsCategories() {
    return axios.get(`${URL}/api/optionsCategories`)
}

//GET OPTION CATEGORIES BY PAGINATION API
// export function getOptionsCategoriesPages(pageNumber) {
//     return axios.get(`${URL}/api/optionsCategories?page=${pageNumber}`)
// }

// ADD NEW OPTION CATEGORIES API
export function addOptionsCategories(values) {
    values.created_by = 1;
    return axios.post(`${URL}/api/optionsCategories`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
//DELETE OPTION CATEGORIES API
export function deleteOptionsCategories(optCatId) {
    console.log('ddd', optCatId);
    return axios.delete(`${URL}/api/optionsCategories/`+ optCatId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE OPTION CATEGORIES API
export function updateOptionsCategories(optCatId, values) {
    return axios.put(`${URL}/api/optionsCategories/`+ optCatId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateOptionsCategoriesStatus (optCatId, values) {
    return axios.put(`${URL}/api/optionsCategories/`+ optCatId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF OptionsCategories
export function getSingleOptionsCategories (optCatId) {
    return axios.get(`${URL}/api/optionsCategories/`+optCatId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}