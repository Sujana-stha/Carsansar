// import axios from 'axios';
import axios, {getHeaders} from './axiosInstance'
const access_token = window.localStorage.getItem('access_token')
const headers = getHeaders(access_token);
//register users 
export function registerUsers(values) {
    return axios.post('/api/register', values)
    .catch(error => {
        return {
            errors: error
        }
    })
}

//get users 
export function getUsers() {
    return axios.get('/api/user', {headers})
    .catch(error => {
        return {
            errors: error
        }
    })
}