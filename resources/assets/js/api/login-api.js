import axios from 'axios';

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

//LOGOUT API
const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

export function logout() {
    axios.post('/api/logout',{},{headers: {...headers}})
    .catch(error=> {
        return {
            errors: error
        }
    })
}