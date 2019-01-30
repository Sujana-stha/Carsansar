import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL CATEGORIES API
export function getCategories() {
    return axios.get(`${URL}/api/categories`)
}

//GET CATEGORIES BY PAGINATION API
export function getCategoriesPages(pageNumber) {
    return axios.get(`${URL}/api/categories?page=${pageNumber}`)
}

// ADD NEW CATEGORIES API
export function addCategories(values) {
    values.created_by = 1;
    return axios.post(`${URL}/api/categories`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE CATEGORIES API
export function deleteCategories(categoryId) {
    return axios.delete(`${URL}/api/categories/`+ categoryId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE CATEGORIES API
export function updateCategories(categoryId, values) {
    return axios.put(`${URL}/api/categories/`+ categoryId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateCategoriesStatus (categoryId, values) {
    return axios.put(`${URL}/api/categories/`+ categoryId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF CAtegories
export function getSingleCategories (categoryId) {
    return axios.get(`${URL}/api/categories/`+categoryId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}