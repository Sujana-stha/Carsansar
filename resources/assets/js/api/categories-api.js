// import axios from 'axios';
// const URL = `http://127.0.0.1:8000`

import axios from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

//GET ALL CATEGORIES API
export function getCategories() {
    return axios.get('/api/categories',{headers})
}

//GET CATEGORIES BY PAGINATION API
export function getCategoriesPages(pageNumber) {
    return axios.get(`/api/categories?page=${pageNumber}`,{headers})
}

// ADD NEW CATEGORIES API
export function addCategories(values) {
    values.created_by = 1;
    return axios.post('/api/categories', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE CATEGORIES API
export function deleteCategories(categoryId) {
    return axios.delete('/api/categories/'+ categoryId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE CATEGORIES API
export function updateCategories(categoryId, values) {
    return axios.put('/api/categories/'+ categoryId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateCategoriesStatus (categoryId, values) {
    return axios.put('/api/categories/'+ categoryId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF CAtegories
export function getSingleCategories (categoryId) {
    return axios.get('/api/categories/'+categoryId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}