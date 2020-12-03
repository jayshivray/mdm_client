import LA from '../actionCreator/loginActions';
import CA from '../actionCreator/comman';
import LS  from '../Services/LoginService';

const loginReducer =(state,action)=>{
  let status = false,
      passwordStrength = '',
      // msg = '',
      email='',
      fpassword = '',
      spassword = '',
      error = false,
      success = false,
      loading = false;

  switch (action.type){
    case CA.SHOW_PROGRESS : 
      return {...state,error,success,loading : true} 
    case CA.HIDE_PROGRESS : 
      return {...state,error,success,loading}             
    case CA.DISPLAY_ERROR :       
      return {...state,error:true,success,loading,msg:action.payload} 
    case CA.DISPLAY_SUCESS :
      return {...state,success:true,error,loading,msg:action.payload}     
    case LA.EMAIL :
      return {...state, email : action.payload,error,success}    
    case LA.F_PASSWORD :
      return {...state, fpassword : action.payload,error,success}
    case LA.S_PASSWORD :
      return {...state, spassword : action.payload}      
    case LA.USER_AUTH_SUCCESS :            
      return {...state, isAuthenticate:true, msg:action.payload}          
    case LA.CAPTCHA :
      return {...state,isVerified : true,error,success};      
    case LA.M_PASSWORD :
      status = (state.fpassword===state.spassword);
      return {...state, isPasswordMatch : status};   
    case LA.P_STRENGTH :
      passwordStrength = LS.checkPasswordLength(state.fpassword,'password_strength');
      return {...state,passwordStrength}; 
    case LA.SIGN_UP :     
      status = !state.isSignUp ? true : false;
      LS.toggelLoginWindowState(status);
      return {...state,isSignUp : status,email,fpassword,spassword,passwordStrength,error};      
    default:
      return state;  
  }
}
export default loginReducer;