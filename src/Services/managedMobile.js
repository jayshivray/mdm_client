import Api from '../Services/Api';
import General from '../Services/General';
import AA from '../actionCreator/app';
import MMA from '../actionCreator/managedMobile';
import CA from '../actionCreator/comman';
import content from '../content';
import queryString from 'query-string';

const methods = {
  initClientActionList : function(dispatch){    
    let clientActList = [
    `${content.lblSelCliAction}`,
    `${content.lblAddNewDev}`,
    `${content.lblSync}`,
    `${content.lblRemoveDevice}`
    ];
    dispatch(MMA.fClientActionListSucess(clientActList));
  },   
  getPolicyListFromServer : function(dispatch,authDispatch){
    dispatch(CA.showProgress());
    Api.hostname = 'https://localhost:300';
    Api.endpoints = '/policy/list?';
    Api.queryparams = '';
    Api.postdata = {param:1};    
    Api.post()
    .then((resp)=>{
      let list = resp.data.data;
      if(resp.data.status===1){
        dispatch(MMA.fPolicyListSucess(list));
      }else if(resp.data.status===0){
        dispatch(MMA.fPolicyListFailure(resp.data.message));
      }else if(resp.data.status===0 && resp.data.message==='token_expired'){
        authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
      }
    })
    .catch((error)=>{
      dispatch(MMA.fPolicyListFailure(error));
    })
  },
  toggelAddDeviceModal : function(dispatch){
    dispatch(MMA.toggelAddNewDeviceModal());
  },
  bindEventListner : function(){
    let cbmain  = document.getElementById('cbMain');
    let cbchild = document.getElementsByClassName('cbChild');
    if(cbmain){
      cbmain.addEventListener("click",General.mainCbClickHandler);
    }  
    if(cbchild){
      for (var i = 0; i < cbchild.length; ++i) {
         cbchild[i].addEventListener("click",General.childCbClickHandler);
      }      
    } 
  },  
  addDeviceOnServer : function(state,dispatch,authDispatch){
    const {userName,mobNumber,email,clientPolicy} = state;

    let 
    clientName = userName,
    clientNumber = mobNumber,
    clientEmailId = email,            
    policyTemplateName = clientPolicy;
    
    if(clientName!=='' && clientNumber!=='' && clientEmailId!=='' && policyTemplateName!=='select-policy-template'){  
      if(!General.validateEmail(clientEmailId)){
        dispatch(CA.displayErrorMsg('enter valide email'));
        return;
      }        
      //qrcode loader
      let loader = document.getElementById('imgqrcode');
      loader.src = 'https://192.168.2.107:300/images/loader.gif';
      loader.style.height = '50px';
      loader.style.width  = '50px'
      const json = {clientName,clientNumber,clientEmailId,policyTemplateName};

      Api.hostname    = 'https://localhost:300';
      Api.endpoints   = '/managedMobile/add?';
      Api.queryparams = '';
      Api.postdata    = json;    
      Api.post()
      .then(response=>{                 
        if(response.data.status===1)
        {                
          let policyName    = 'byod_default';      
          let enterpriseId  = 'enterprises/LC02t2xstl';          
          
          const json = queryString.stringify({policyName,enterpriseId,clientNumber});

          Api.hostname    = 'https://localhost:300';
          Api.endpoints   = '/enterprise/getemmqrcode?';
          Api.queryparams = json;              
          Api.get().then(response=>
          {             
            if(response.data.status===1){              
              dispatch(CA.displaySuccessMsg('client added on server'));
              loader.src = response.data.data.filePath;
              loader.style.height = '200px';
              loader.style.width  = '200px';
            }else if(response.data.status===0 && response.data.message==='token_expired'){
              authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
            } 
          })
          .catch(error =>{
            dispatch(CA.displayErrorMsg('some network error occured try again later'));            
            console.log('error',error);                
          });                   
        }else if (response.data.status===0 && response.data.message==='client present in database'){          
          dispatch(CA.displayErrorMsg('mobile number present on server'));  
          loader.src = 'https://192.168.2.107:300/images/qrcode.jpeg';
          loader.style.height = '200px';
          loader.style.width  = '200px';                    
        }else if(response.data.status===0 && response.data.message==='token_expired'){
          authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
        }                
      })
      .catch(error =>{        
        dispatch(CA.displayErrorMsg('try to add device after some time'));          
        console.log('[addNewDevice] Exception:',error);          
      });
    }else{      
      dispatch(CA.displayErrorMsg('please fill all details'));  
    }
  },
  removeClients : function(dispatch,authDispatch){
    let deviceList = [];
    if(General.getChildCheckedCount()>0)
    {      
      dispatch(CA.showProgress());      
      let list = document.querySelectorAll('input[class="cbChild"]:checked');        
      list.forEach(async function(val,ind)
      {
        let deviceId     = val.getAttribute('deviceId') || null;
        let clientNumber = val.getAttribute('mobilenumber');
        let clientUserName = val.getAttribute('username') || null;

        deviceList.push({deviceId,clientNumber,clientUserName});                  
      }); 
      
      Api.hostname    = 'https://localhost:300';
      Api.endpoints   = '/enterprise/deleteDevices?';
      Api.queryparams = '';              
      Api.postdata = {deviceList};    
      Api.post()
      .then((resp)=>{
        if(resp.data.status===1){                  
          General.gettableData(dispatch,'mb'); 
        }else if(resp.data.status===0 && resp.data.message==='token_expired'){
          authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
        } 
      })
      .catch((error)=>{
        General.gettableData(dispatch,'mb');
      });      
    }	    
  },
  syncClientData : function(dispatch,authDispatch){
    dispatch(CA.showProgress());      
    let enterpriseId = 'enterprises/LC02t2xstl';      
    const json = {enterpriseId};

    Api.hostname    = 'https://localhost:300';
    Api.endpoints   = '/managedMobile/updateManagedMobile?';
    Api.queryparams = '';              
    Api.postdata = json;
    Api.post()    
    .then(response=>{           
      if(response.data.status===1){
        General.gettableData(dispatch,'mb');         
      }else if(response.data.status===0 && response.data.message==='token_expired'){
        authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
      }
    })
    .catch(error=>{
      console.log('error',error);
      General.gettableData(dispatch,'mb');        
    });    
  },
  viewQrCodeDialog : function(props){
    const qrcodeImg     = 'https://192.168.2.107:300/images/loader.gif';
    const clientPolicy  = props.fields.policyName;
    const mobNumber     = props.fields.mobileNumber; 
    const {userName,email} = props.fields;
  
    props.dispatch(MMA.displayQrCode({userName,mobNumber,email,clientPolicy,qrcodeImg}));    

    let enterpriseId  = 'enterprises/LC02t2xstl';          
    
    const json = queryString.stringify({
      policyName : clientPolicy,
      enterpriseId,
      clientNumber : mobNumber
    });

    Api.hostname    = 'https://localhost:300';
    Api.endpoints   = '/enterprise/getemmqrcode?';
    Api.queryparams = json;              
    Api.get().then(response=>
    {             
      if(response.data.status===1){         
        let loader = document.getElementById('imgqrcode');
        let btnSave= document.getElementById('btnSave');
            btnSave.style.display = 'none';
        loader.src = response.data.data.filePath;
        loader.style.height = '200px';
        loader.style.width  = '200px';        
      }
    })
    .catch(error =>{
      props.dispatch(CA.displayErrorMsg('some network error occured try again later'));            
      console.log('error',error);                
    });      
  }    
}
export default methods;