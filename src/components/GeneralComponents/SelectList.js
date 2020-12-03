import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //for bootstrap
import {Form} from 'react-bootstrap';  //for bootstrap 

const ddl = {
  height : '34px',
  fontSize : '12px'
}

class SelectList extends Component {
  render() {    
    let list = this.props.list;
    return (
      <>
        <Form.Control 
          id={this.props.id}
          value={this.props.value} 
          disabled={this.props.disabled}
          as="select" 
          onChange={(event)=>{this.props.changeHandler(event)}}
          style={ddl}>        
          {
            list.map(name=>(
              <option key={name} value={name}>{name}</option>
            ))    
          }
        </Form.Control>
     </>
    )
  }
}

export default SelectList;
