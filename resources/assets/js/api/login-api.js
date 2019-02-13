import axios from 'axios';
// import axios from './axiosInstance';
const URL = `http://127.0.0.1:8000`
 
//LOGIN API
export function login(values) {
    console.log('value', values)
    return axios.post(`${URL}/api/login`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}