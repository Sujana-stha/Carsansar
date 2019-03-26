// import axios from 'axios';
import axios, {getHeaders} from './axiosInstance'

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
export function getLoggedUser() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token);
    return axios.get('/api/user', {headers})
    .catch(error => {
        return {
            errors: error
        }
    })
}

//GET COMPANIES LIST
export function getCompaniesList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/companies/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}