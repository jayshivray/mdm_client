import React, { Component } from 'react'
import axios from 'axios';
import queryString from 'query-string';
import CheckBox from '../GeneralComponents/CheckBox';
import { DiAndroid} from 'react-icons/di';
import Atag from '../GeneralComponents/Atag';

var Comman = {
  method  : '',
  hostname   : '',
  endpoints : '',
  queryparams : '',
  postdata : '',
  makeRequest : function(callback){  
    callback(1);
    new Promise(function(resolve,reject){
      if (Comman.method=='GET'){
        axios.get(Comman.hostname+Comman.endpoints+Comman.queryparams)
        .then(response=>{
          callback(0);
          resolve(response);                
        })
        .catch(error=>{        
          callback(0);
          reject(error);
        });
      }else if(Comman.method=='POST'){
        const json = queryString.stringify(Comman.postdata);
        axios.post(Comman.hostname+Comman.endpoints+Comman.queryparams,json,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response=>{
          callback(0);
          resolve(response);                
        })
        .catch(error=>{        
          callback(0);
          reject(error);
        });
      }
    });    
  },
  fetchTableData : function(policyName,ttype='mb',viewQrCode){
    return new Promise(function(resolve,reject){
      //let appliedPolicyName = 'byod_default';
      const json = queryString.stringify({appliedPolicyName : policyName});
  
      axios.post('https://localhost:300/managedMobile/getTableData?type='+ttype,json,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response=>{   
        //console.log('table',response.data.data); 
        let temp     = response.data.data.rows;
        let tcolumns = response.data.data.columns;
        let rows = [];
        let columns = [];
  
        tcolumns.forEach(function(val,ind){
          let label = val.label,
          field = val.field,
          width = val.width,
          sort  = val.sort;
  
          if(val.field=='addedDate'){
            columns.push({
              label,
              field,
              width,
              sort,
              attributes: val.attributes              
            });
          }
          else if(val.field=='checkBox'){
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
            qrcode: <Atag href="https://localhost:300/enterprise/getemmqrcode?" clientNumber={val.mobileNumber} policyName={val.policyName} enterpriseId="enterprises/LC02t2xstl"/> ,
            email: val.email,
            ostype: <DiAndroid size='1.5em'/>,
            policyName: val.policyName,
            state: val.state          
          });       
        });
        resolve({columns,rows});      
      })
      .catch(error =>{
        //console.log('error',error);  
        reject(error);        
      });
    });
  }, 
  removeClientsFromGoogleServer : function(deviceId){
    return new Promise(function(resolve,reject){
      
      const json = queryString.stringify({deviceId});
  
      axios.post('https://localhost:300/enterprisse/deleteDevices?',json,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response=>{           
        resolve(response);      
      })
      .catch(error =>{        
        reject(error);        
      });
    });
  },
  removeClientsFromServer : function(clientNumber){
    return new Promise(function(resolve,reject){
      
      const json = queryString.stringify({clientNumber});
  
      axios.post('https://localhost:300/managedMobile/delete?',json,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response=>{           
        resolve(response);      
      })
      .catch(error =>{        
        reject(error);        
      });
    });
  },  
  validateName : function(e){
    var keyCode = e.which ? e.which : e.keyCode;
    if( (keyCode>=48 && keyCode <= 57) || (keyCode>= 65 && keyCode<=90) || (keyCode>= 97 && keyCode<=122) ||(keyCode==32 || keyCode==95 || keyCode==64) ){
        return true;
    }else{
        return false;
    }
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
    if(totalC==checkC){
      cbmain.checked = true;
    }    
  },
  getChildCheckedCount : function(){
    let checkC = document.querySelectorAll('input[class="cbChild"]:checked').length;
    return checkC;  
  }       
}
export default Comman;
