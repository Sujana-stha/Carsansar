import axios from 'axios';

//register users 
export function registerUsers(values) {
    return axios.post('/api/register', values)
    .catch(error => {
        return {
            errors: error
        }
    })
}