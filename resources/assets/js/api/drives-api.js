import axios from 'axios';

const URL = `http://127.0.0.1:8000`

//GET ALL DRIVES API
export function getDrives() {
    return axios.get(`${URL}/api/drives`)
}

//GET DRIVES BY PAGINATION API
export function getDrivesPages(pageNumber) {
    return axios.get(`${URL}/api/drives?page=${pageNumber}`)
}

// ADD NEW DRIVES API
export function addDrives(values) {
    console.log('val',values);
    values.created_by = 1;
    return axios.post(`${URL}/api/drives`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE DRIVES API
export function deleteDrives(driveId) {
    return axios.delete(`${URL}/api/drives/`+ driveId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE DRIVES API
export function updateDrives(driveId, values) {
    return axios.put(`${URL}/api/drives/`+ driveId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// TOGGLE STATUS API
export function updateDrivesStatus (driveId, values) {
    return axios.put(`${URL}/api/drives/`+ driveId, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF Drives
export function getSingleDrives (driveId) {
    return axios.get(`${URL}/api/drives/`+driveId)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}