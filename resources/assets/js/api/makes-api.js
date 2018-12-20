import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL MAKES API
export function getMakes() {
    return axios.get(`${URL}/api/makes`)
}

//GET MAKES BY PAGINATION API
export function getMakesPages(pageNumber) {
    return axios.get(`${URL}/api/makes?page=${pageNumber}`)
}

// ADD NEW MAKES API
export function addMakes(values) {
    console.log('val',values);
    values.created_by = 1;
    return axios.post(`${URL}/api/makes`, values)
    .catch(error=>console.log(error));
}

//DELETE MAKES API
export function deleteMake(makeId) {
    return axios.delete(`${URL}/api/makes/`+ makeId)
    .catch(error=>console.log(error));
}

// UPDATE MAKES API
export function updateMake(makeId, values) {
    return axios.put(`${URL}/api/makes/`+ makeId, values)
    .catch(error=>console.log(error));
}