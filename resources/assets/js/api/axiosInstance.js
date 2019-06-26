import axios from 'axios';
const base_url = `http://127.0.0.1:8000`
const access_token = window.localStorage.getItem('access_token')
const axiosInstance = axios.create ({
    baseURL: base_url,
    headers: {'Authorization':`Bearer ${access_token}`,'X-CSRF-TOKEN': window.Laravel.csrfToken, 'X-Requested-With': 'XMLHttpRequest'}
})

export const getHeaders = ()=> {
    const access_token = window.localStorage.getItem('access_token')
    return {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`
    }
}
export default axiosInstance;