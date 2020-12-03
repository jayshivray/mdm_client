import React,{useReducer,useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';      //for bootstrap 
import '../style/mdm.css';      //for bootstrap
import LS  from '../Services/LoginService';
import SuccessAlert from '../GeneralComponents/SuccessAlert';
import ErrorAlert from '../GeneralComponents/ErrorAlert';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  Container,
  Row,
  Col,
  Button} from 'react-bootstrap';  //for bootstrap 

const useStyles = makeStyles({
  root: {
    minWidth: 900,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

//initial state
const initState = {
  count : 0,
  error            : false,
  success          : false,
  msg              : '',
  loading          : false    
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';


const reducer =(state,action)=>{
  console.log('type',action.type);
  switch (action.type){   
    case FETCH_USER_REQUEST :
      return {...state,loading : true}
    case FETCH_USER_SUCCESS :         
      return {...state,count : state+1}            
    case FETCH_USER_FAILURE : 
      return {...state,error : true,success : false,loading : false,msg:action.payload}
    default:
      return state;  
  }
}

//store.subscribe
const ErrorMsg=(props)=>{
  console.log('props',props);
  if(!props.status){
    return(<></>)
  }
  return(
    <ErrorAlert 
    id="error-alert" 
    message={props.message} 
    style={{display:props.error}}/>
  )
}   
const ReducerExample =(props)=>{
  const classes = useStyles();
  const [login,dispatch] = useReducer(reducer,initState);  
  // console.log('login',login);  

  const fetchUserRequest=()=>{
    return {type:FETCH_USER_REQUEST}
  }
  const fetchUserSuccess=(data)=>{
    return {type:FETCH_USER_SUCCESS}
  }
  const fetchUserFailure=(error)=>{
    return {type:FETCH_USER_FAILURE,payload:error}
  }  
  // const loginHandler=()=>{    
  //   dispatch({type:FETCH_USER_REQUEST});      
  //   LS.authenticateUser(login)
  //   .then((res)=>{        
  //     if(res.status==1){
  //       dispatch({type:FETCH_USER_SUCCESS,payload:'hi'});
  //     }else if(res.status==0){
  //       dispatch({type:FETCH_USER_SUCCESS,payload:'hello'});
  //     }
  //   })
  //   .catch((exception)=>{
  //     dispatch({type:FETCH_USER_SUCCESS,payload:'hello'}); 
  //   });    
  // }  
  const loginHandler=()=>{    
    store.dispatch({type:FETCH_USER_SUCCESS});         
  }  
  return (       
    <Container style={{display:'flex',justifyContent:'center',alignItems: 'center',height: '100vh'}}>
      <Card className={classes.root}>
        <CardContent>
          <Container>
            <Row>
              <Col>                
                <Container>
                  <Row>
                    <Col>                                          
                      <Button 
                        id="btnlogin" 
                        size="sm" 
                        className="mybtn"                           
                        onClick={()=>{dispatch({type:FETCH_USER_SUCCESS}) }}>LOGIN
                      </Button>                                              
                    </Col>                                        
                  </Row>                
                  <Row>
                    <Col>
                      <h3>{login.count}</h3>
                      {/* {login.error ? <ErrorMsg status={login.error} message={login.msg}/>:<></>}       */}
                      {/* {login.sucess ?<SuccessMsg status={login.success} message={login.msg}/>:<></>}       */}
                    </Col>                   
                  </Row>                                                                                                                    
                </Container>                            
              </Col>
            </Row>
          </Container>
        </CardContent>
      </Card>  
    </Container> 
  )
}
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
export default ReducerExample;
