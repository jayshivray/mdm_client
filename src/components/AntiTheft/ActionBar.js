import React,{useContext} from 'react'
import {
  Row,
  Col,
  Button} from 'react-bootstrap';  //for bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/mdm.css';
import content from '../../content';
import AS from '../../Services/antitheft';
import {AntiContext} from './AntiTheft';
import {AuthContext} from '../../App';

const colmd = {
  paddingLeft : '5px',
  paddingRight: '2px',
  paddingTop : '10px'
}  

function ActionBar(props) {
  const {authDispatch} = useContext(AuthContext);
  const {dispatch} = useContext(AntiContext);

  return (
    <div>
      <Row>                    
        <Col md="auto" style={colmd}>
          <Button size="sm" className="mybtn" onClick={()=>AS.sendAntiTheftCommand(dispatch,'LOCK',authDispatch)}>{content.lblLOCK}</Button>
        </Col>
        <Col md="auto" style={colmd}>
          <Button size="sm" className="mybtn" onClick={()=>AS.removeWorkProfile(dispatch,authDispatch)}>{content.lblWIPE}</Button>
        </Col>        
        <Col md="auto" style={colmd}>
          <Button size="sm" className="mybtn" onClick={()=>AS.sendAntiTheftCommand(dispatch,'REBOOT',authDispatch)}>{content.lblREBOOT}</Button>
        </Col>
        {/* <Col md="auto" style={colmd}><Button size="sm" className="mybtn" onClick={this.clientActionHandler}>execute</Button></Col>           */}
      </Row>       
    </div>
  )
}

export default ActionBar;
