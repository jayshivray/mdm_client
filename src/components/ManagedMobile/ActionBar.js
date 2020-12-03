import React,{useEffect,useContext} from 'react'
import {
  Row,
  Col,
  Button} from 'react-bootstrap';
import SelectList from '../GeneralComponents/SelectList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/mdm.css';
import content from '../../content';
import MMA from '../../actionCreator/managedMobile';
import methods from '../../Services/managedMobile';
import GS from '../../Services/General';
import {ManageMobileContext} from './ManagedMobile';
import { AuthContext } from "../../App";

const colmd = {
  paddingLeft : '5px',
  paddingRight: '2px',
  paddingTop : '10px'
}

function ActionBar(props) {
  const {state,dispatch} = useContext(ManageMobileContext);
  const { authDispatch } = useContext(AuthContext);
  const {
    policyList,      
    selGroupPolicy,
    clientActList,
    clientAction,    
  } = state;

  const p_templateChangeHandler=(e)=>{        
    dispatch(MMA.policyChange(e.target.value));       
  }
  const clientListchangeHandler=(e)=>{
    dispatch(MMA.changeClientActionList(e.target.value));
  }
  const clientActHandler=()=>{      
    switch (clientAction){
      case content.lblAddNewDev :         
        dispatch(MMA.toggelAddNewDeviceModal());       
        break;
      case content.lblSync :        
        methods.syncClientData(dispatch,authDispatch);
        break;
      case content.lblRemoveDevice :                
        methods.removeClients(dispatch,authDispatch);
        break;
      default:
        return false;  
    }    
  }     
  useEffect(()=>{
    methods.getPolicyListFromServer(dispatch);
    methods.initClientActionList(dispatch);
  },[]);  
  
  return (
    <>
      <Row>            
        <Col md="auto" style={colmd}>
          <SelectList 
            id="sel-policy" 
            value={selGroupPolicy} 
            list={policyList}
            changeHandler={(e)=>p_templateChangeHandler(e)}
            />
        </Col>
        <Col md="auto" style={colmd}><Button size="sm" className="mybtn">{content.lblBtnLoadClient}</Button></Col>        
        <Col md="auto" style={colmd}>
          <SelectList 
            id="sel-client-action" 
            value={clientAction} 
            list={clientActList}
            changeHandler={(e)=>clientListchangeHandler(e)}  
            />
        </Col>
        <Col md="auto" style={colmd}>
          <Button 
            size="sm" 
            className="mybtn" 
            onClick={()=>clientActHandler()}>{content.lblExecute}
          </Button>
        </Col>          
      </Row>      
    </>
  )
}

export default ActionBar
