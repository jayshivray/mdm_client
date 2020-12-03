const Action = { 
  LOGIN_SUCCESS : 'LOGIN_SUCCESS',
  LOGIN_FAIL : 'LOGIN_FAIL',
  LOGOUT  : 'LOGOUT',  
  TOKEN_VALIDE  : 'TOKEN_VALIDE',  

  loginSuccess : function(data){
    return {type:this.LOGIN_SUCCESS,payload:data}
  },
  loginFailed : function(data){
    return {type:this.LOGIN_FAIL,payload:data}
  },  
  logoutSuccess : function(data){
    return {type:this.SEND_WIPE_COMMAND,payload:data}
  },
  tokenNotExpired : function(data){
    return {type:this.TOKEN_VALIDE,payload:data}
  }  
}
export default Action;
