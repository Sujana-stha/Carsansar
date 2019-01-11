import axios from 'axios';
import store from '../store';
// import { getColorsSuccess } from '../actions/color-actions';



const URL = `http://127.0.0.1:8000`


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
    return axios.get(`${URL}/api/colors`)
}

//GET COLORS BY PAGINATION API
export function getColorsPages(pageNumber) {
    return axios.get(`${URL}/api/colors?page=${pageNumber}`)
}

// ADD NEW COLORS API
export function addColors(values) {
    console.log('val',values);
    values.created_by = 1;
    return axios.post(`${URL}/api/colors`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE COLORS API
export function deleteColors(colorId) {
    return axios.delete(`${URL}/api/colors/`+ colorId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE COLORS API
export function updateColors(colorId, values) {
    return axios.put(`${URL}/api/colors/`+ colorId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API OF COLORS
export function updateColorsStatus (colorId, values) {
    return axios.put(`${URL}/api/colors/`+ colorId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF COLORS
export function getSingleColors (colorId) {
    return axios.get(`${URL}/api/colors/`+colorId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}