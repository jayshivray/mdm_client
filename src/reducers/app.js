import AA from '../actionCreator/app';

const app_reducer =(state,action)=>{
  
  const {isAuthenticated,userName,token} = action.payload;

  switch (action.type){
    case AA.LOGIN_SUCCESS :   
      localStorage.setItem('token',token);       
      localStorage.setItem('userName',userName);       
      return {...state,isAuthenticated,userName,token} 
    case AA.LOGIN_FAIL.HIDE_PROGRESS : 
      localStorage.clear();
      return {...state,isAuthenticated,userName,token}             
    case AA.LOGOUT : 
      localStorage.clear();      
      return {...state,isAuthenticated,userName,token}      
    case AA.TOKEN_VALIDE :
      return {...state,isAuthenticated}                            
    default:
      return state;  
  }
}
export default app_reducer;