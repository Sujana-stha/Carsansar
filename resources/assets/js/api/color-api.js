// import axios from 'axios';
import axios, {getHeaders} from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = getHeaders(access_token)

// const URL = `http://127.0.0.1:8000`


/**
 * Get all colors
 */

// export function getColors() {
//   return axios.get(`${URL}/api/colors`)
//     .then(response => {
//       store.dispatch(getColorsSuccess(response.data));
//       return response;
//     });
// }

//GET ALL COLORS API
export function getColors() {
    return axios.get('/api/colors',{headers})
}

//GET COLORS BY PAGINATION API
export function getColorsPages(pageNumber) {
    return axios.get(`/api/colors?page=${pageNumber}`,{headers})
}

// ADD NEW COLORS API
export function addColors(values) {
    values.created_by = 1;
    return axios.post('/api/colors', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE COLORS API
export function deleteColors(colorId) {
    return axios.delete('/api/colors/'+ colorId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE COLORS API
export function updateColors(colorId, values) {
    return axios.put('/api/colors/'+ colorId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API OF COLORS
export function updateColorsStatus (colorId, values) {
    return axios.put('/api/colors/'+ colorId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF COLORS
export function getSingleColors (colorId) {
    return axios.get('/api/colors/'+colorId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}