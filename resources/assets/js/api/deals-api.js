// import axios from 'axios';
// const URL = `http://127.0.0.1:8000`
import axios from './axiosInstance'

const access_token = window.localStorage.getItem('access_token')
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

//GET LISTS OF MAKES
export function getMakesList() {
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
    console.log('val',values);
    return axios.post('/api/vehicles', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}