import axios from 'axios';
import store from '../store';
import { getMakesSuccess, deleteMakesSuccess, addMakesSuccess, updateMakesSuccess } from '../actions/makes-action';

const URL = `http://127.0.0.1:8000`

//GET ALL MAKES
export function getMakes() {
    return axios.get(`${URL}/api/makes`)
    // .then(response => {
    //     store.dispatch(getMakesSuccess(response.data));
    //     console.log(response);
    //     return response;
    // })
}

export function addMakes(values) {
    console.log('val',values);
    values.created_by = 1;
    return axios.post(`${URL}/api/makes`, values)
    // .then(response => {
    //     return response;
    // })
    .catch(error=>console.log(error));
    // .then(response => {
        // store.dispatch(addMakesSuccess(values));
    //     console.log(values);
        // console.log(response);
        // return response;
    // })
}

export function deleteMake(makeId) {
    
    return axios.delete(`${URL}/api/makes/`+makeId)
    // .then(response => {
    //     store.dispatch(deleteMakesSuccess(makeId))
    //     return response;
    // })
}

export function updateMake(makeId, values) {
    console.log('vvvv',values);
    console.log('msssm',makeId);

    return axios.put(`${URL}/api/makes/`+ makeId, values)
    .catch(error=>console.log(error));
    // .then(response => {
    //     store.dispatch(updateMakesSuccess(makeId, values))
    //     return response;
    // })
}