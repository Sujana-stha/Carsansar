import axios from 'axios';

 
//LOGIN API
export function login(values) {
    console.log('value', values)
    return axios.post('oauth/token', values)
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
    return axios.post('/api/logout',{},{headers: {...headers}})
    .catch(error=> {
        return {
            errors: error
        }
    })
}