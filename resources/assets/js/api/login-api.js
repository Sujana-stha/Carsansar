import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//LOGIN API
export function login(values) {
    return axios.post(`${URL}/oauth/token`, values)
    .catch(error=> {
        return {
            errors: error
        }
    });
}

//LOGOUT API
export function logout() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
    return axios.post('/api/logout',{},{headers: {...headers}})
    .catch(error=> {
        return {
            errors: error
        }
    })
}