
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
    let images = values.files
    var formData = new FormData();
    //var imageData
    formData.append('title', values.title);
    if(values.year){formData.append('year', values.year)}
    if(values.vehicle_status){formData.append('vehicle_status', values.vehicle_status)}
    if(values.body_id){formData.append('body_id', values.body_id)}
    if(values.make_id){formData.append('make_id', values.make_id)}
    if(values.drive_id){formData.append('drive_id', values.drive_id)}
    if(values.enginesize_id){formData.append('enginesize_id', values.enginesize_id)}
    if(values.model_id){formData.append('model_id',values.model_id)}
    if(values.option_id){formData.append('option_id', values.option_id)}
    if(values.transmission_id){formData.append('transmission_id', values.transmission_id)}
    if(values.fueltype_id){formData.append('fueltype_id', values.fueltype_id)}
    if(images) {
        images.map(image=>{
            // console.log('image',image);
            // debugger;
            formData.append('files[]', image)
            formData.append('imagemeta[]',image['main_flag'])
        })
    }
    //formData.append('files', image)
    return axios.post('/api/vehicles', formData,{headers})
    .catch(error=> {
        debugger;
        console.log("eeee",error)
        return {
            errors: error
        }
    });
}

//SEARCH VECHICLES BY ATTRIBUTES
export function searchVechiles(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/vehicle',{headers}, values)
    .catch(error=> {
        return {
            errors:error
        }
    })
}

//CREATE VEHICLES ATTR DYNAMICALLY
export function vehicleAttr(values, apiName) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    
    var formData = new FormData();
    
    formData.append('created_by', 1)
    if(apiName=="makes") {formData.append('make_desc', values)}
    if(apiName =="models") {formData.append('model_desc', values)}
    if(apiName=="bodies") {formData.append('body_desc', values)}
    if(apiName=="enginesizes") {formData.append('enginesize_desc', values)}
    if(apiName=="transmissions") {formData.append('transmission_desc', values)}
    if(apiName=="fueltypes") {formData.append('fueltype_desc', values)}
    if(apiName=="drives") {formData.append('drive_desc', values)}
    return axios.post(`/api/${apiName}`,formData, {headers})
    .catch(error => {
        return {
            errors: error
        }
    })
}