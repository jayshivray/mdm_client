import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'; 

function Heading(props) {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>        
            <span className="spanH">{props.heading}</span><br/> 
            <span className="spanL">{props.description}</span>          
          </Col>
        </Row>
      </Container>      
    </>
  )
}
export default Heading;
