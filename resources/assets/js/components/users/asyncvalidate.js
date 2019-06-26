import * as api from '../../api/users-api'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values) => {
    var nameCount = '';
    api.getUsername(values).then(response=> {
        nameCount = response.data
    })
    return sleep(1000).then(() => {
        if(nameCount > 0) {
            throw { username: 'That username is already taken' }
        }
    })
}

export default asyncValidate;