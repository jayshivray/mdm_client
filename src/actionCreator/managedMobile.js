const Action = { 
  F_POLICY_LIST_SUCCESS : 'F_POLICY_LIST_SUCCESS',
  F_POLICY_LIST_FAIL : 'F_POLICY_LIST_FAIL',  
  POLICY_TEMPLATE_CHANGE : 'POLICY_TEMPLATE_CHANGE',  
  CLIENT_ACT_LIST_CHANGE : 'CLIENT_ACT_LIST_CHANGE',  
  F_CLIENT_ACT_LIST_SUCCESS : 'F_CLIENT_ACT_LIST_SUCCESS',
  F_CLIENT_ACT_LIST_FAIL : 'F_CLIENT_ACT_LIST_FAIL',   
  F_MM_TABLE_DATA_SUCCESS : 'F_MM_TABLE_DATA_SUCCESS',   
  F_MM_TABLE_DATA_FAIL : 'F_MM_TABLE_DATA_FAIL',   
  TOGGEL_ADD_DEVICE_MODAL : 'TOGGEL_ADD_DEVICE_MODAL',   
  SET_USER_NAME : 'SET_USER_NAME',   
  SET_EMAIL : 'SET_EMAIL',   
  ADD_DEV_TEM_CHANGE : 'ADD_DEV_TEM_CHANGE',   
  DISPLAY_QRCODE : 'DISPLAY_QRCODE',   
  
  fPolicyListSucess : function(list){
    return {type:this.F_POLICY_LIST_SUCCESS,payload:list}
  },
  fPolicyListFailure : function(error){
    return {type:this.F_POLICY_LIST_FAIL,payload:error}
  },
  policyChange : function(value){
    return {type:this.POLICY_TEMPLATE_CHANGE,payload:value}
  }, 
  changeClientActionList : function(value){
    return {type:this.CLIENT_ACT_LIST_CHANGE,payload:value}
  }, 
  fClientActionListSucess : function(list){
    return {type:this.F_CLIENT_ACT_LIST_SUCCESS,payload:list}
  },    
  fClientActionListFailure : function(value){
    return {type:this.F_CLIENT_ACT_LIST_FAIL,payload:value}
  }, 
  fManagedMobileTableData : function(data){
    return {type:this.F_MM_TABLE_DATA_SUCCESS,payload:data}
  },
  fManagedMobileTableDataFail : function(data){
    return {type:this.F_MM_TABLE_DATA_FAIL,payload:data}
  },
  toggelAddNewDeviceModal : function(){
    return {type:this.TOGGEL_ADD_DEVICE_MODAL} 
  },
  setUserName : function(uname){
    return {type:this.SET_USER_NAME,payload:uname} 
  },   
  setMobileNumber : function(number){
    return {type:this.SET_MOBILE_NUMBER,payload:number} 
  },
  setEmailAddress : function(email){
    return {type:this.SET_EMAIL,payload:email} 
  },
  addDeviceTemplateChange : function(selvalue){
    return {type:this.ADD_DEV_TEM_CHANGE,payload:selvalue}
  },
  displayQrCode : function(qrdata){
    return {type:this.DISPLAY_QRCODE,payload:qrdata}
  }           
}
export default Action;
