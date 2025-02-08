import { commonApi } from "./commonApi"
import { serverUrl } from "./serviceUrl"

// register request
export const requestApi = async(reqBody)=>{
    return await commonApi ('POST', `${serverUrl}/register`,reqBody,"")
}

// Login request
export const loginApi = async(reqBody)=>{
    return await commonApi ('POST', `${serverUrl}/login`,reqBody,"")
}