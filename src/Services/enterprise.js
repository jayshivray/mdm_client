import Api from '../Services/Api';
import CA from '../actionCreator/comman';
import EA from '../actionCreator/enterprise';
import AA from '../actionCreator/app';

const methods = {
  getSignupUrl : function(dispatch,authDispatch){
    dispatch(CA.showProgress());
    Api.hostname  = 'https://localhost:300';
    Api.endpoints = '/enterprise/createSignupUrl?';
    Api.queryparams = '';         
    Api.get()
    .then((resp)=>{      
      if (resp.data.status===1){
        let url = resp.data.data.url;
        dispatch(EA.fetchSignupUrlSucess(url));
      }else if(resp.data.status===0 && resp.data.message==='token_expired'){
        authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
      }        
    })
    .catch((error)=>{
      dispatch(EA.fetchSignupUrlFailure(error));
    });     
  },
  getEnterpriseInfo : function(dispatch,authDispatch){ 
    dispatch(CA.showProgress());
    Api.hostname  = 'https://localhost:300';
    Api.endpoints = '/enterprise/validate?';
    Api.queryparams = '';         
    Api.get()
    .then((resp)=>{
      if(resp.data.status===1){
        const {name,email,actdate}  = resp.data.data;         
        dispatch(EA.fetchEmmInfoSucess({name,email,actdate}));   
      }
      else if(resp.data.status===0 && resp.data.message==='token_expired'){
        authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}));
      }else if(resp.data.status===0){
        dispatch(EA.fetchEmmInfoFailure());
      }
    })
    .catch((error)=>{
      dispatch(EA.fetchEmmInfoFailure());
    });        
  } 
}
export default methods;