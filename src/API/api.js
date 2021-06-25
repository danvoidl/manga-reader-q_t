const API_URL = 'https://api.mangadex.org'
const PROXY_URL = 'https://radiant-chamber-25358.herokuapp.com/'

export default {        
    async get(endpoint = '', query = '', hasProxy = false ){
        let proxy = '';
        proxy = hasProxy ? proxy = PROXY_URL : proxy = '';
        const [method] = ['GET'];
        try {
            let resp = await fetch(proxy + API_URL + endpoint + query,  { method });        
            let data = await resp.json();                        
            if(resp.status > 202 || resp.status >= 300) throw resp; 
            console.log(method, data);                                       
            return data;        
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