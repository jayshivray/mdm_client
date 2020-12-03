import React from 'react'
import {Button,Modal} from 'react-bootstrap';  //for bootstrap 
import {MdSave} from 'react-icons/md';

function MyModal(props) {  
  return (
    <>
      <Modal            
          show={props.show}
          size="lg"            
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="add-device-dialog"
          centered>
          <Modal.Header closeButton className="cush1">
            <Modal.Title id="contained-modal-title-vcenter">
              {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.children}             
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" size="sm" onClick={()=>props.cancelHandler()}>Close</Button>
            <Button id="btnSave" variant="primary" onClick={()=>props.saveHandler()}><MdSave/> save</Button>
          </Modal.Footer>
      </Modal>      
    </>
  )
}
export default MyModal
