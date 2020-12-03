const Action = {
  USER_AUTH_SUCCESS  : 'USER_AUTH_SUCCESS',
  EMAIL : 'EMAIL',
  F_PASSWORD : 'F_PASSWORD',
  S_PASSWORD : 'S_PASSWORD',
  AUTHENTICATE : 'AUTHENTICATE',
  CAPTCHA : 'CAPTCHA',
  M_PASSWORD : 'M_PASSWORD',
  P_STRENGTH : 'P_STRENGTH',
  SIGN_UP : 'SIGN_UP',  
  
  UserAuthenticateSucess : function(data){
    return {type:this.USER_AUTH_SUCCESS,payload:data}
  }   
}
export default Action;
