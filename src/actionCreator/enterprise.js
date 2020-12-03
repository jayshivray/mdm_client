const Action = { 
  USER_SIGNUP_SUCCESS : 'USER_SIGNUP_SUCCESS',
  USER_SIGNUP_FAILURE : 'USER_SIGNUP_FAILURE',  
  FETCH_EMM_INFO_SUCESS : 'FETCH_EMM_INFO_SUCESS',  
  FETCH_EMM_INFO_FAIL : 'FETCH_EMM_INFO_FAIL',  
  
  fetchSignupUrlSucess : function(url){
    return {type:this.USER_SIGNUP_SUCCESS,payload:url}
  },
  fetchSignupUrlFailure : function(error){
    return {type:this.USER_SIGNUP_FAILURE,payload:error}
  }, 
  fetchEmmInfoSucess : function(data){
    return {type:this.FETCH_EMM_INFO_SUCESS,payload:data}
  },
  fetchEmmInfoFailure : function(error){
    return {type:this.FETCH_EMM_INFO_FAIL,payload:error}
  }      
}
export default Action;
