import React,{useContext} from 'react'
import EnterpriseStatusCard from './EnterpriseStatusCard';
import EnterpriseInfoCard from './EnterpriseInfoCard';
import {
  Container,
  Row,
  Col} from 'react-bootstrap';  //for bootstrap
import {EntContext} from './EnterpriseSetup';

function EnterpriseInfo(props) {
  const {state} = useContext(EntContext);

  return (
    <>
      <Container fluid style={{marginTop:'2%'}}>
        <Row>
          <Col>
            <EnterpriseStatusCard 
              name={state.name} 
              email={state.email} 
              actdate={state.actdate}                
            />                                                              
          </Col>
          <Col>
            <EnterpriseInfoCard/>                                                            
          </Col>            
        </Row>          
      </Container>       
    </>
  )
}

export default EnterpriseInfo
