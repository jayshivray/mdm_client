import React from 'react';
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Form} from 'react-bootstrap';  //for bootstrap 
import { FaUserEdit,FaPhoneAlt } from 'react-icons/fa';
import { MdEmail} from 'react-icons/md';
import SuccessAlert from '../GeneralComponents/SuccessAlert';
import ErrorAlert from '../GeneralComponents/ErrorAlert';
import SelectList from '../GeneralComponents/SelectList';
import MMA from '../../actionCreator/managedMobile';
import {ManageMobileContext} from './ManagedMobile';

function AddDeviceModalBody(props) {
  const {state,dispatch} = React.useContext(ManageMobileContext);

  const {
    error,
    success,
    msg,
    userName,
    mobNumber,
    email,
    policyList,      
    clientPolicy,  
    qrcodeImg,
    qrImgHeight,
    qrImgWidth,
    isDisabled   
  } = state;

  const userNameChangeHandler=(e)=>{
    dispatch(MMA.setUserName(e.target.value));
  }
  const mobileNumberChangeHandler=(e)=>{
    dispatch(MMA.setMobileNumber(e.target.value));
  }
  const emailChangeHandler=(e)=>{
    dispatch(MMA.setEmailAddress(e.target.value));
  }  
  const templateChangeHandler=(e)=>{
    dispatch(MMA.addDeviceTemplateChange(e.target.value));
  }   
  return (
    <>
      <Row>                
        <Col md="auto">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><FaUserEdit/></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              id="tbUserName"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              maxLength="25"
              value={userName}
              disabled={isDisabled}
              onChange={(e)=>userNameChangeHandler(e)}  
              />
          </InputGroup>   
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon2"><FaPhoneAlt/></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl  
              id="tbMobNumber"                    
              placeholder="Mobile Number"
              aria-label="Mobile Number"
              aria-describedby="basic-addon2"
              maxLength="12"
              value={mobNumber}
              disabled={isDisabled}
              onChange={(e)=>mobileNumberChangeHandler(e)}  
              />
          </InputGroup>   
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3"><MdEmail/></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="tbemail"
              placeholder="Email Address"
              aria-label="Email Address"
              aria-describedby="basic-addon3"
              value={email}
              disabled={isDisabled}
              onChange={(e)=>emailChangeHandler(e)}
              />
          </InputGroup>                     
          <Form.Group>
            <SelectList 
              id="selpolicytemplate" 
              value={clientPolicy} 
              list={policyList}
              disabled={isDisabled}
              changeHandler={(e)=>templateChangeHandler(e)}  
              />                      
          </Form.Group>
        </Col>
        <Col>
          <div className="box effect8 center" style={{height:200,width:200}}>
            <img id="imgqrcode" alt="qrcode" src={qrcodeImg} height={qrImgHeight} width={qrImgWidth}/>
          </div>                    
        </Col>                                 
      </Row>   
      <Row>
        <Col>
          {error ? <ErrorAlert message={msg} style={{marginTop:'10px'}}/>:<></>}      
          {success ?<SuccessAlert message={msg} style={{marginTop:'10px'}}/>:<></>} 
        </Col>                   
      </Row>      
    </>
  )
}

export default AddDeviceModalBody
