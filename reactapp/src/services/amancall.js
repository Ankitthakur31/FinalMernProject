import axios from 'axios' ; 

class AmanCallApi{
    constructor(){
        this.url="http://localhost:6070"
    }


    //Store UserName
    store(username){
        let response = axios.post(`${this.url}/api/username/${username}`)
        console.log(`http ${response}`);
        
        return response;
    }
}