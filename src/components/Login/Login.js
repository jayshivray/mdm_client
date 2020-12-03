import React,{useReducer} from 'react';
import {
  Container,
  Row,
  Col,
  Button} from 'react-bootstrap';  //for bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';      //for bootstrap 
import '../../style/mdm.css';      //for bootstrap
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import loginimg from '../../images/login.png';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Recaptcha from 'react-recaptcha';
import initialState from '../../compState/loginState';
import loginReducer from '../../reducers/loginReducer';
import LA from '../../actionCreator/loginActions';
import AA from '../../actionCreator/app';
import LS  from '../../Services/LoginService';
import { AuthContext } from "../../App";
import SuccessAlert from '../GeneralComponents/SuccessAlert';
import ErrorAlert from '../GeneralComponents/ErrorAlert';
import CirculerProgress from '../GeneralComponents/CirculerProgress';
import content from '../../content';


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

const Login =(props)=>{
  const classes = useStyles();
  const { authDispatch } = React.useContext(AuthContext);
  const [state,loginDispatch] = useReducer(loginReducer,initialState);    
 
  if(props.status==='logout'){
    //return <Redirect to='/login/Enterprise'/>
    authDispatch(AA.logoutSuccess({isAuthenticated: false,user: null,token: null}));
  }
  return (       
    <Container style={{display:'flex',justifyContent:'center',alignItems: 'center',height: '100vh'}}>
      <CirculerProgress visible={state.loading} color={state.ptheme}/>
      <Card className={classes.root}>
        <CardContent>
          <Container>
            <Row>
              <Col xs={5} id="colLoginImg" className="nopadding">
                <img src={loginimg} alt="loginpg" height={500} width="100%"/>
              </Col>
              <Col>                
                <Container>
                  <Row>
                    <Col className="center">
                      <h3>{content.lblAfwLogin}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="center">                       
                      {content.lblAfwDiscription1}&nbsp;{content.lblAfwDiscription2}<br/>                      
                    </Col>
                  </Row> 
                  <Row>
                    <Col className="center">                                               
                      {content.lblAfwDiscription3}                      
                    </Col>
                  </Row>                                   
                  <Row>
                    <Col>                    
                      <div style={{margin:'10px'}}>
                        <TextField 
                          required 
                          id="tbemail" 
                          label="Required" 
                          value={state.email}
                          placeholder="email"
                          onChange={(e)=>loginDispatch({type:LA.EMAIL,payload : e.target.value})} 
                          />                             
                      </div>                                      
                    </Col>                   
                  </Row>  
                  <Row>
                    <Col>                    
                      <div style={{margin:'10px'}}>
                        <TextField 
                          required 
                          id="tbpassword" 
                          label="Required" 
                          placeholder="password"
                          value={state.fpassword}
                          onKeyUp={(e)=>loginDispatch({type:LA.P_STRENGTH,payload:e.target.value})}  
                          onChange={(e)=>loginDispatch({type:LA.F_PASSWORD,payload : e.target.value})}
                          /> 
                        <span id="password_strength">{state.passwordStrength}</span>                            
                      </div>                                      
                    </Col>                     
                  </Row> 
                  <Row id="rwsecpassword" style={{display:'none'}}>
                    <Col>                    
                      <div style={{margin:'10px'}}>
                        <TextField 
                          required id="tbrepassword" 
                          label="Required" 
                          placeholder="re entered password" 
                          value={state.spassword}
                          onKeyUp={(e)=>loginDispatch({type:LA.M_PASSWORD,payload:e.target.value})}
                          onChange={(e)=>loginDispatch({type:LA.S_PASSWORD,payload:e.target.value})}  
                          />                                                     
                      </div>                                      
                    </Col>                     
                  </Row> 
                  <Row id="rwrecaptcha">
                    <Col>
                      <Recaptcha
                        sitekey="6Lf_4NEZAAAAABFmYOi_fAHdmCKeSlk-wiXzMKgh"
                        render="explicit"
                        verifyCallback={()=>loginDispatch({type:LA.CAPTCHA,payload:null})}
                      />
                    </Col>
                  </Row>                  
                  <Row>
                    <Col xs={6}>                    
                      <div style={{margin:'10px'}}>
                        <Button 
                          id="btnlogin" 
                          size="sm" 
                          className="mybtn"
                          onClick={()=>LS.authenticateUser(state,loginDispatch,authDispatch)}>LOGIN                      
                        </Button>                        
                      </div>                                      
                    </Col>                                        
                  </Row>   
                  <Row>
                    <Col>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.isSignUp}                              
                            name="cblogintoggel"
                            color="primary"
                            onChange = {(e)=>loginDispatch({type:LA.SIGN_UP,payload:e.target.value})}/>
                        }
                        label="signup"/>                                                               
                    </Col>                                        
                  </Row>                   
                  {/* <Row>
                    <Col>                    
                      <div style={{marginLeft:'10px'}}>
                        <a href="#">forgot password</a>                        
                      </div>                                      
                    </Col>  
                  </Row>   */}
                  <Row>
                    <Col>
                      {state.error ? <ErrorAlert message={state.msg} style={{marginTop:'10px'}}/>:<></>}      
                      {state.success ?<SuccessAlert message={state.msg} style={{marginTop:'10px'}}/>:<></>}      
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
export default Login;
