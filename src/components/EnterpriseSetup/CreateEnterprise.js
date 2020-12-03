import React,{useContext} from 'react'
import content from '../../content';
import data from '../../constant';
import {
Container,
Row,
Col,
Button} from 'react-bootstrap';
import methods from '../../Services/enterprise';
import {EntContext} from './EnterpriseSetup';
import {AuthContext} from '../../App';

function CreateEnterprise(props) {
  const {dispatch} = useContext(EntContext);
  const {authDispatch} = useContext(AuthContext);

  return (
    <>
      <Container fluid style={{marginTop:'2%',backgroundColor:'#002080'}}>
        <Row>
          <Col xs={8}>
            <div style={{fontSize:'30px',color:'#ffffff',marginTop:'2%'}}>
              {content.androidForWorkH}
            </div>
            <div style={{color:'#ffffff',marginTop:'6%'}}>                
              {content.androidForWorkD1}<br/> 
              {content.androidForWorkD2}<br/> 
              {content.androidForWorkD3}
            </div> 
            <div style={{marginTop:'10%'}}>
              <Button 
                id="btnCreEnt" 
                variant="warning" 
                style={{borderRadius:'0px',height:'43px'}}
                onClick={()=>methods.getSignupUrl(dispatch,authDispatch)}>
                {content.lblAfwButton}
              </Button>          
            </div>                                                              
          </Col>
          <Col>
            <img id="imgAdpAdd1" alt="adp" src={data.src.imgAdpAdd1}/>
          </Col>
        </Row>          
      </Container>      
    </>
  )
}

export default CreateEnterprise
