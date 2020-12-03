import Api from './Api';
import General from './General';
import CA from '../actionCreator/comman';
import AA from '../actionCreator/app';

let LoginService = {
  response : {
    status  : 0,
    message : '',
    error   : '',
    data    : ''
  },
  authenticateUser : function(state,loginDispatch,authDispatch){
    let
    isAuthenticated = false,
    userName = null,
    token = null; 

    loginDispatch(CA.showProgress());

    let cretype = document.getElementById('btnlogin').innerHTML;
    
    if((!General.validateEmail(state.email)) || (!state.email)){
      loginDispatch(CA.displayErrorMsg('enter valide email')); 
      return;   
    }
    else if(!state.fpassword){      
      loginDispatch(CA.displayErrorMsg('enter password'));
      return;
    }    
    else if((!state.isVerified) && (cretype.toUpperCase()==='LOGIN')){
      loginDispatch(CA.displayErrorMsg('captcha required?'));
      return;      
    }    
    const json = {emailid:state.email,password:state.fpassword};

    if((cretype.toUpperCase()==='LOGIN') && (state.isVerified)){      
      Api.hostname    = 'https://localhost:300';
      Api.endpoints   = '/user/login?';
      Api.queryparams = '';
      Api.postdata    = json;
      Api.post()
      .then((res)=>{
        if(res.data.status===0){
          loginDispatch(CA.displayErrorMsg(res.data.message));
        }
        else if(res.data.status===1 && res.data.message==='login sucessfull'){                              
          isAuthenticated = true;
          userName = res.data.data.emailid;
          token = res.data.data.token;          
          authDispatch(AA.loginSuccess({isAuthenticated,userName,token}));
        } 
      })
      .catch((exception)=>{
        loginDispatch(CA.displayErrorMsg(exception));          
      });       
    }
    else if (cretype.toUpperCase()==='CREATE ACCOUNT'){
      if(!state.passwordStrength.includes('Strong')){ 
        loginDispatch(CA.displayErrorMsg('strong password required!'));
        return;              
      }

      if(state.fpassword===state.spassword){        
        Api.hostname    = 'https://localhost:300';
        Api.endpoints   = '/user/signup?';
        Api.queryparams = '';
        Api.postdata    = json;
        Api.post()
        .then((res)=>{                                  
          if(res.data.status===0){
            loginDispatch(CA.displayErrorMsg(res.data.message));
          }       
          else if(res.data.status===1){
            loginDispatch(CA.displaySuccessMsg(res.data.message));
          }      
        })
        .catch((exception)=>{
          loginDispatch(CA.displayErrorMsg(exception));  
        });        
      }else{                  
        loginDispatch(CA.displayErrorMsg('password does not match'));
      }
    }     
  },
  toggelLoginWindowState : function(check_status){    
    let x = document.getElementById("rwsecpassword");
    let b = document.getElementById("btnlogin");
    let c = document.getElementById('rwrecaptcha');

    if (check_status) {
      x.style.display = "block";
      b.innerHTML = 'CREATE ACCOUNT';
      c.style.display = 'none';
    } else {
      x.style.display = "none";
      b.innerHTML = 'LOGIN';
      c.style.display = '';
    } 
  },
  checkPasswordLength : function(value,id){
    let password = value;
    let password_strength = document.getElementById(id);
    let cretype = document.getElementById('btnlogin').innerHTML;

    if(cretype.toUpperCase()!=='CREATE ACCOUNT'){
      password_strength.innerHTML = "";
      return;      
    }
    //TextBox left blank.
    if (password.length === 0) {
      password_strength.innerHTML = "";
      return;
    }

    //Regular Expressions.
    let regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#?&]"); //Special Character.

    let passed = 0;

    //Validate for each Regular Expression.
    for (let i = 0; i < regex.length; i++) {
      if (new RegExp(regex[i]).test(password)) {
        passed++;
      }
    }

    //Validate for length of Password.
    if (passed > 2 && password.length > 8) {
      passed++;
    }

    //Display status.
    let color = "";
    let strength = "";
    switch (passed) {
      case 0:
      case 1:
        strength = "Weak";
        color = "red"; 
        break;                           
      case 2:
        strength = "Good";
        color = "darkorange";   
        break;                 
      case 3:
      case 4:
        strength = "Strong";
        color = "green";       
        break;             
      case 5:
        strength = "Very Strong";
        color = "darkgreen";  
        break; 
      default : 
        strength = "Weak";
        color = "red"; 
        break;                            
    }
    password_strength.innerHTML   = strength;
    password_strength.style.color = color;
    return strength;
  },
  isValidateToken : async function(authDispatch){
    let token = General.getToken();
    if(token!=null)
    {
      CA.showProgress();

      let data = await General.decodeToken(token)
      if(data){        
        let temp = data.split('|');
        let eDateTime = temp[2];        
        if(eDateTime){
          let cDateTime = General.getCurrentDateTime();          
          if(new Date(cDateTime)>new Date(eDateTime)){            
            authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}))            
          }else{            
            authDispatch(AA.tokenNotExpired({isAuthenticated:true}))            
          }
          CA.hideProgress();
        }
      }
    }else{
      authDispatch(AA.logoutSuccess({isAuthenticated: false,userName:null,token:null}))
    }
  }
}
export default LoginService;
