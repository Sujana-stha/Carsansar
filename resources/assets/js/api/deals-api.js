
import axios, {getHeaders} from './axiosInstance'

//GET LISTS OF MAKES
export function getMakesList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/makes/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET LIST OF MODELS
export function getModelsList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/models/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET LIST OF BODIES
export function getBodiesList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/bodies/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET LIST OF ENGINESIZE
export function getEnginesizeList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/enginesizes/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET LIST OF TRANSMISSION
export function getTransmissionList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/transmissions/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET COLORS LIST
export function getColorsList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/colors/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET FUELTYPES LIST
export function getFueltypesList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/fueltypes/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

// GET DRIVES LIST 
export function getDRivesist() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/drives/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET OPTIONS LIST
export function getOptionsList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/options/getList',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

// POST VEHICLES FORM
export function addVehicles(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    console.log('val',values);
    return axios.post('/api/vehicles', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}