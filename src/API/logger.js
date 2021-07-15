const success = 'background-color: #00bf56; color: white; font-weight: bold;'
const methodSuccess = 'background-color: #00942f; color: white; font-weight: bold;'

const failure = 'background-color: #ff3838; color: white; font-weidht: bold;'
const methodFailure = 'background-color: #940000; color: white; font-weight: bold;'

const warning = 'background-color: #a38122; color: white; font-weight: bold;'
const methodWarning = 'background-color: #ffda75; color: white; font-weight: bold;'

export default {
    logSuccess(method, status, results ) {
        console.log(`%c ${method} ` + `%c ${status} `, methodSuccess, success, results)
    },
    logFailure(method, status){
        console.log(`%c ${method} ` + `%c ${status} `, methodFailure, failure)
    },
    logWarning(method, status, message){
        console.log(`%c ${method} ` + `%c ${status} ` , methodWarning, warning, message)
    },
}