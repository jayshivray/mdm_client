import React from 'react';
import Api from '../Services/Api';
import CheckBox from '../components/GeneralComponents/CheckBox';
import { DiAndroid} from 'react-icons/di';
import Atag from '../components/GeneralComponents/Atag';
import CA from '../actionCreator/comman';
import AA from '../actionCreator/app';
import MMS from '../Services/managedMobile';
import CryptoJS from 'crypto-js';


let General = {  
  getToken : function(){
    let token = localStorage.getItem('token') || null;
    return token;
  },
  getCurrentDateTime : function(){
    let d = new Date();        
    let currDateTime = d.toLocaleDateString()+' '+d.toLocaleTimeString();
    return currDateTime;
  },  
  getExpireDateTime : function(hours=1){
    let d = new Date();
        d.setHours( d.getHours()+hours);
    let currDateTime = d.toLocaleDateString()+' '+d.toLocaleTimeString();
    return currDateTime;
  },
  createToken : async function(email,pass){
    let expdateTime = General.getExpireDateTime();
    let input = `${email}|${pass}|${expdateTime}`;
    return await General.encodeToke(input);
  },
  encodeToke : async function(input){    
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input));
  },
  decodeToken : async function(input){
    return CryptoJS.enc.Base64.parse(input).toString(CryptoJS.enc.Utf8);
  },
  isTokenValid : async function(){    
    let token = General.getToken();
    console.log('token',token);
    if(token==null){
      return false;
    }
   
    let data = await General.decodeToken(token)
    if(data){        
      let temp = data.split('|');
      let eDateTime = temp[2];        
      if(eDateTime){
        let cDateTime = General.getCurrentDateTime();          
        if(new Date(cDateTime)>new Date(eDateTime)){            
          return false;
        }else{            
          return true;            
        }          
      }
    }   
  },  
  checkForTokenExpiry : function(){
    let token = General.getToken();

    new Promise((resolve,reject)=>{
      Api.hostname    = 'https://localhost:300';
      Api.endpoints   = '/user/validateToken?';
      Api.queryparams = '';              
      Api.postdata = {token};

      Api.post()      
      .then(()=>{           
        resolve();      
      })
      .catch(()=>{        
        reject();        
      });
    });
  },
  validateEmail : function (email){
    if(email){
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test(email)){        
        return false;
      }else{       
        return true;
      }
    } 
  },
  returnResolvePromise : function(value){
    return new Promise((resolve)=>{
      resolve(value);
    });
  },
  returnRejectPromise : function(value){
    return new Promise((reject)=>{
      reject(value);
    });
  },
  gettableData : function(dispatch,type,authDispatch){       
    let appliedPolicyName = 'byod_default';
    dispatch(CA.showProgress());
    General.fetchTableData(dispatch,appliedPolicyName,type)
    .then((resp)=>{
      if(resp.columns){
        dispatch(CA.fetchTableDataSucess(resp));
      }
      else if(resp.data.status===0 && resp.data.message==='token_expired'){
        authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
      }      
      else{
        dispatch(CA.hideProgress());
      }
    })
    .catch((error)=>{
      dispatch(CA.hideProgress());  
    });      
  },  
  fetchTableData : function(dispatch,policyName,ttype='mb'){
    return new Promise(function(resolve,reject){  
      Api.hostname = 'https://localhost:300';
      Api.endpoints = '/managedMobile/getTableData?type='+ttype;
      Api.queryparams = '';
      Api.postdata = {appliedPolicyName : policyName};     
      Api.post()
      .then(response=>{
        if(response.data.status===0 && response.data.message==='token_expired'){
          resolve({columns,rows});           
        }
        let temp     = response.data.data.rows;
        let tcolumns = response.data.data.columns;
        let rows = [];
        let columns = [];
  
        tcolumns.forEach(function(val,ind){
          let label = val.label,
          field = val.field,
          width = val.width,
          sort  = val.sort;
  
          if(val.field==='addedDate'){
            columns.push({
              label,
              field,
              width,
              sort,
              attributes: val.attributes              
            });
          }
          else if(val.field==='checkBox'){
            columns.push({
              field,
              label : <CheckBox id="cbMain"/>,
              sort             
            });          
          }
          else{
            columns.push({            
              label,
              field,
              width,
              sort 
            });
          }     
        });
         
        temp.forEach(function(val,ind){                   
          rows.push({
            checkBox : <CheckBox id={val.checkBox.id} className="cbChild" userName={val.checkBox.userName} mobileNumber={val.checkBox.mobileNumber} email={val.checkBox.email} ostype={val.checkBox.ostype} policyName={val.checkBox.policyName} state ={val.checkBox.state} deviceId={val.checkBox.deviceId}/>,
            addedDate : val.addedDate,
            userName : val.userName,
            mobileNumber : val.mobileNumber,            
            qrcode: <Atag href='#' dispatch={dispatch} fields={val} clickHandler={MMS.viewQrCodeDialog}/>,
            email: val.email,
            ostype: <DiAndroid size='1.5em'/>,
            policyName: val.policyName,
            state: val.state,
            lock : val.lockDateTime,
            wipe : val.wipeDateTime,
            reboot : val.rebootDateTime
          });       
        });
        resolve({columns,rows});      
      })
      .catch(error =>{        
        reject(error);        
      });
    });
  },
  mainCbClickHandler : function(){
    let cbmain  = document.getElementById('cbMain');
    let cbchild = document.getElementsByClassName('cbChild');
    let status = false;
    if(cbmain.checked){
      status = true
    }
    for (var i = 0; i < cbchild.length; ++i) { cbchild[i].checked = status; }
  },
  childCbClickHandler : function(){   
    let cbmain  = document.getElementById('cbMain'); 
    let totalC = document.getElementsByClassName('cbChild').length;     
    let checkC = document.querySelectorAll('input[class="cbChild"]:checked').length;
    cbmain.checked = false;    
    if(totalC===checkC){
      cbmain.checked = true;
    }    
  },
  getChildCheckedCount : function(){
    let checkC = document.querySelectorAll('input[class="cbChild"]:checked').length;
    return checkC;  
  }        
}
export default General;