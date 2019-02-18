import axios from 'axios';
const base_url = `http://127.0.0.1:8000`
const axiosInstance = axios.create ({
    baseURL: base_url,
    timeout: 8000,
    headers: {'X-CSRF-TOKEN': window.Laravel.csrfToken, 'X-Requested-With': 'XMLHttpRequest'}
})

export const getHeaders = (access_token) => (
    {Accept: "application/json", Authorization: `Bearer ${access_token}`}
);

export default axiosInstance;