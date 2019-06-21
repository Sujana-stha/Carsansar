// import axios from 'axios';
import axios, {getHeaders} from './axiosInstance'

// to get users list
export function getUsers(pageNumber, sorted_column, order) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token);
    return axios.get(`/api/users?page=${pageNumber}&column=${sorted_column}&order=${order}`, {headers})
    .catch(error => {
        return {
            errors: error
        }
    })
}

//get details of a logged user
export function userDetail() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token);
    return axios.get('/api/usersDetail', {headers})
    .catch(error => {
        console.log('error', error)
        return {
            errors: error
        }
    })
}

//get username
export function getUsername(values) {
    console.log('api-value', values)
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token);
    return axios.post('/api/getUsername',values, {headers})
    .catch(error => {
        return {
            errors: error
        }
    })
}

//register users 
export function registerUsers(values) {
    return axios.post('/api/register', values)
    .catch(error => {
        return {
            errors: error
        }
    })
}

//get logged user
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

// get users detail a/c to id
export function getSingleUserDetail(userId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token);
    return axios.get('/api/users/'+userId, {headers})
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

// UPDATE USER API
export function updateUser(userId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/users/'+ userId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}