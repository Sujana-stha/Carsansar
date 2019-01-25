import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET LISTS OF MAKES
export function getMakesList() {
    return axios.get(`${URL}/api/makes/getList`)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET LIST OF MODELS
export function getModelsList() {
    return axios.get(`${URL}/api/models/getList`)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET LIST OF BODIES
export function getBodiesList() {
    return axios.get(`${URL}/api/bodies/getList`)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET LIST OF ENGINESIZE
export function getEnginesizeList() {
    return axios.get(`${URL}/api/enginesizes/getList`)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET LIST OF TRANSMISSION
export function getTransmissionList() {
    return axios.get(`${URL}/api/transmissions/getList`)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET COLORS LIST
export function getColorsList() {
    return axios.get(`${URL}/api/colors/getList`)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

//GET FUELTYPES LIST
export function getFueltypesList() {
    return axios.get(`${URL}/api/fueltypes/getList`)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

export function getOptionsList() {
    return axios.get(`${URL}/api/options/getList`)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}