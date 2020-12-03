import axios from 'axios';
import GS from './General';

let Api = {  
  hostname  : '',
  endpoints : '',
  queryparams : '',
  postdata : '', 
  contentType :'application/json', 
  get : function(){
    let token = GS.getToken();
    return axios.get(this.hostname+this.endpoints+this.queryparams,{
      headers: {
        token         
      }      
    });
  }, 
  post : function(){    
    let token = GS.getToken();
    return axios.post(this.hostname+this.endpoints+this.queryparams,JSON.stringify(this.postdata),{
      headers: {
        'Content-Type': 'application/json',
        token         
      }
    })    
  } 
}
export default Api;
