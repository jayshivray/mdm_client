import CA from '../actionCreator/comman';
import EA from '../actionCreator/enterprise';

const enterpriseReducer =(state,action)=>{
  let 
  // email    = '',
  // actdate  = '',
  // name     = '',  
  error    = false,
  success  = false,
  // msg      = '',
  loading  = false,
  // ptheme   = 'light',
  hideConf = false;

  switch (action.type){ 
    case CA.SHOW_PROGRESS : 
      return {...state,error,success,loading : true} 
    case CA.HIDE_PROGRESS : 
      return {...state,error,success,loading}             
    case CA.DISPLAY_ERROR :       
      return {...state,error:true,success,loading,msg:action.payload} 
    case CA.DISPLAY_SUCESS :
      return {...state,success:true,error,loading,msg:action.payload}    
    case EA.USER_SIGNUP_SUCCESS : 
      window.open(action.payload,"_self");       
      return {...state,error,success,loading}            
    case EA.USER_SIGNUP_FAILURE : 
      return {...state,error : true,success,loading,msg:action.payload}  
    case EA.FETCH_EMM_INFO_SUCESS : 
      let {email,name,actdate} = action.payload;
      return {...state,error,success,loading,email,actdate,name,hideConf:true} 
    case EA.FETCH_EMM_INFO_FAIL : 
      return {...state,error,success,loading,hideConf}                          
    default:
      return state;  
  }
}
export default enterpriseReducer;
