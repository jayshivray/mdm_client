
import Api from '../Services/Api';
import General from '../Services/General';
import CA from '../actionCreator/comman';
import AA from '../actionCreator/app';

const methods = {
  sendAntiTheftCommand : function(dispatch,command,authDispatch){
    let deviceList = [];    
    
    if(General.getChildCheckedCount()>0){
      dispatch(CA.showProgress()); 
      let list = document.querySelectorAll('input[class="cbChild"]:checked');              
      list.forEach(async function(val,ind){
        let deviceId = val.getAttribute('deviceId'),
        clientMobileNumber = val.getAttribute('mobilenumber'),
        clientUserName = val.getAttribute('username');        
        
        if(deviceId){
          deviceList.push({deviceId,clientMobileNumber,clientUserName}); 
        }             
      }); 
      
      let json = {command,deviceList}
      
      Api.hostname    = 'https://localhost:300';
      Api.endpoints   = '/enterprise/issueCommand?';
      Api.queryparams = '';              
      Api.postdata = json;
      Api.post()    
      .then(response=>{             
        if(response.data.status===1){
          General.gettableData(dispatch,'at');         
        }else if(response.data.status===0 && response.data.message==='token_expired'){
          authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
        }
      })
      .catch(error=>{
        console.log('error',error);
        General.gettableData(dispatch,'at');        
      });                  
    }        
  },
  removeWorkProfile : function(dispatch,authDispatch){
    let deviceList = [];    
    
    if(General.getChildCheckedCount()>0){
      dispatch(CA.showProgress());

      let list = document.querySelectorAll('input[class="cbChild"]:checked');        
      
      list.forEach(async function(val,ind){
        let deviceId = val.getAttribute('deviceId') || null;
        let clientNumber = val.getAttribute('mobilenumber');
        let clientUserName = val.getAttribute('username') || null;

        deviceList.push({deviceId,clientNumber,clientUserName});              
      }); 
            
      Api.hostname    = 'https://localhost:300';
      Api.endpoints   = '/enterprise/deleteDevices?';
      Api.queryparams = '';              
      Api.postdata = {deviceList};
      Api.post()    
      .then(response=>{                       
        if(response.data.status===1){
          General.gettableData(dispatch,'at');         
        }else if(response.data.status===0 && response.data.message==='token_expired'){
          authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
        }
      })
      .catch(error=>{
        console.log('error',error);
        General.gettableData(dispatch,'at');        
      });                  
    }     
  }
}
export default methods;