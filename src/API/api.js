import './logger'
import logger from './logger';

const API_URL = 'https://api.mangadex.org'
const PROXY_URL = 'https://radiant-chamber-25358.herokuapp.com/'


export default {        
    async get(endpoint = '', query = ''){        
        const [method] = ['GET'];
        try {
            let resp = await fetch(PROXY_URL + API_URL + endpoint + query,  { method });             
            let payload = await resp.json();
            
            if(resp.status >= 200 || resp.status <= 300) logger.logSuccess(method, resp.status, payload)      
            else throw error
            
            return payload;  

        } catch (error) {
            return error;
        }
    },
    async post(endpoint = String, proxy = String){

    },
    async delete(){

    },
    async put(){

    }
}