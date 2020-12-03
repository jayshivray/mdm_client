import CA from '../actionCreator/comman';
import AA from '../actionCreator/antitheft';

const antitheft =(state,action)=>{
 
  let   
  error   = false,
  success = false,
  // msg     = '',
  loading = false,
  datatable= '';
  // ptheme  = 'light';     

  switch (action.type){
    case CA.SHOW_PROGRESS : 
      return {...state,error,success,loading : true} 
    case CA.HIDE_PROGRESS : 
      return {...state,error,success,loading}             
    case CA.DISPLAY_ERROR :       
      return {...state,error:true,success,loading,msg:action.payload} 
    case CA.DISPLAY_SUCESS :
      return {...state,success:true,error,loading,msg:action.payload} 
    case CA.F_TABLE_DATA_SUCCESS :
      datatable = action.payload;
      return {...state,error,success,loading,datatable} 
    case AA.SEND_LOCK_COMMAND :
      return {...state,success:true,error,loading,msg:action.payload} 
    case AA.SEND_WIPE_COMMAND :
      return {...state,success:true,error,loading,msg:action.payload}                              
    default:
      return state;  
  }
}
export default antitheft;
