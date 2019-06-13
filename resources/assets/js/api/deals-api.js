
import axios, {getHeaders} from './axiosInstance'

//IMPORT DOUCUMENTS FILES
export function postDocuments(values) {
    console.log(values)
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)

    var formData = new FormData();
    var files =values.import
    files.map((file) => {
        formData.append('import', file)
    })
    formData.append('import', values.import)

    return axios.post('/api/imports', {headers}, formData)
    .catch(error => {
        console.log('err', error)
        return {
            errors : error
        }
    })
}


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
//GET CATEGORIES LIST
export function getCategoriesList() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/categories/getList', {headers})
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

//GET OPTIONS DESCRIPTIONS
export function getOptionsDesc(optionId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/options/getDesc/'+optionId, {headers})
}

//GET VEHICLES LISTS
export function getVehicles(pageNumber, sorted_column, order) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`api/vehicles?page=${pageNumber}&column=${sorted_column}&order=${order}`, {headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    })
}

// GET SINGLE DATA OF VEHICLES
export function getSingleVehicles (vehicleId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/vehicles/'+vehicleId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

function formValues(values) {
    
    let images = values.files
    
    let title = values.title.toLowerCase();
    var formData = new FormData();
    //Form Data
    formData.append('title', title);
    if(values.vehicle_status){formData.append('vehicle_status', values.vehicle_status)}
    if(values.vin){formData.append('vin', values.vin)}
    if(values.ad_desc){formData.append('ad_desc', values.ad_desc)}
    if(values.vehicle_description){formData.append('vehicle_description', values.vehicle_description)}
    if(values.tech_specification){formData.append('tech_specification', values.tech_specification)}
    if(values.trim){
        let trim =  values.trim.toLowerCase();
        formData.append('trim', trim)
    }
    if(values.kms){formData.append('kms', values.kms)}
    if(values.doors){formData.append('doors', values.doors)}
    if(values.passenger){formData.append('passenger', values.passenger)}
    //MASTERS TABLE
    if(values.year){formData.append('year', values.year)}
    if(values.make_id){formData.append('make_id', values.make_id)}
    if(values.model_id){formData.append('model_id',values.model_id)}
    if(values.body_id){formData.append('body_id', values.body_id)}
    if(values.enginesize_id){formData.append('enginesize_id', values.enginesize_id)}
    if(values.drive_id){formData.append('drive_id', values.drive_id)}
    if(values.transmission_id){formData.append('transmission_id', values.transmission_id)}
    if(values.exterior_color_id){formData.append('exterior_color_id', values.exterior_color_id)}
    if(values.mfg_exterior_color_id){formData.append('mfg_exterior_color_id', values.mfg_exterior_color_id)}
    if(values.interior_color_id){formData.append('interior_color_id', values.interior_color_id)}
    if(values.fueltype_id){formData.append('fueltype_id', values.fueltype_id)}
    if(values.category_id){formData.append('category_id', values.category_id)}
    if(values.option_id){formData.append('option_id', values.option_id)}
    if(values.fuel_economy){formData.append('fuel_economy', values.fuel_economy)}
    if(values.mileage){formData.append('mileage', values.mileage)}
    if(values.city_mpg){formData.append('city_mpg', values.city_mpg)}
    if(values.highway_mpg){formData.append('highway_mpg', values.highway_mpg)}
    if(images) { images.map(image=>{
            formData.append('files[]', image)
            formData.append('imagemeta[]',image['main_flag'])
        })
    }
    
    if(values.price){formData.append('price', values.price)}
    if(values.selling_price){formData.append('selling_price', values.selling_price)}
    //FINANCE
    if(values.financing_flag){formData.append('financing_flag', values.financing_flag)}
    if(values.type){formData.append('type', values.type)}
    if(values.payment){formData.append('payment', values.payment)}
    if(values.payment_type){formData.append('payment_type', values.payment_type)}
    if(values.downpayment){formData.append('downpayment', values.downpayment)}
    if(values.number_of_payment){formData.append('number_of_payment', values.number_of_payment)}
    if(values.source){formData.append('source', values.source)}
    if(values.odometer){formData.append('odometer', values.odometer)}
    if(values.description){formData.append('description', values.description)}
    //WARRANTY
    if(values.warranty_flag){formData.append('warranty_flag', values.warranty_flag)}
    if(values.warranty_desc){formData.append('warranty_desc', values.warranty_desc)}
    return formData;
}

// POST VEHICLES API
export function addVehicles(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    const data = formValues(values)
    
    return axios.post('/api/vehicles', data,{headers})
    .catch(error=> {
        console.log("eeee",error)
        return {
            errors: error
        }
    });
}

function vehicleDetails(vehicleData, object) {
    console.log('vehicleData', vehicleData)
    console.log('object==', object)
    var newVehicleData = vehicleData
    newVehicleData.title = object.title
    newVehicleData.ad_desc = object.ad_desc
    newVehicleData.kms = object.kms
    newVehicleData.price = object.price
    newVehicleData.selling_price = object.selling_price
    newVehicleData.tech_specification = object.tech_specification
    newVehicleData.trim = object.trim
    newVehicleData.vehicle_description = object.vehicle_description
    newVehicleData.vehicle_status = object.vehicle_status
    newVehicleData.images = object.images

    newVehicleData.attribute.body_id = object.body_id
    newVehicleData.attribute.city_mpg = object.city_mpg
    newVehicleData.attribute.doors = object.doors
    newVehicleData.attribute.exterior_color_id = object.exterior_color_id
    newVehicleData.attribute.fuel_economy= object.fuel_economy
    newVehicleData.attribute.highway_mpg = object.highway_mpg
    newVehicleData.attribute.interior_color_id = object.interior_color_id
    newVehicleData.attribute.mileage = object.mileage
    newVehicleData.attribute.option_ids=object.option_id
    newVehicleData.attribute.passenger=object.passenger

    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.category_id = object.category_id}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.drive_id = object.drive_id}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.enginesize_id = object.enginesize_id}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.fueltype_id = object.fueltype_id}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.make_id = object.make_id}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.mfg_exterior_color_id = object.mfg_exterior_color_id}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.model_id = object.model_id}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.transmission_id = object.transmission_id}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.vin = object.vin}
    if(newVehicleData.vehicle_info !== null){newVehicleData.vehicle_info.year = object.year}
    console.log(newVehicleData)
    return newVehicleData;
}

//UPDATES VEHICLES API
export function updateVehicles(vehicleId, values, vehicleData) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    console.log('value=>', values)
    
    var data = vehicleDetails(vehicleData, values)
    console.log('final', data)

    var formData= new FormData();
    formData.append('vehicles-detail', JSON.stringify(data));
    if(values.files) { 
        values.files.map(image=>{
            formData.append('files[]', image)
            formData.append('imagemeta[]', image['main_flag'])
        })
    }
    formData.append('_method', 'PUT')

    return axios.post('/api/vehicles/'+ vehicleId, formData, {headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//SEARCH VECHICLES BY ATTRIBUTES
export function searchVechiles(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/vehicles',{headers}, values)
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

