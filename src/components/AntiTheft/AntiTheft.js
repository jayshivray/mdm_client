import React,{ useReducer} from 'react';
import {Container} from 'react-bootstrap';  //for bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';      //for bootstrap 
import '../../style/mdm.css';      //for bootstrap 
import Table from '../GeneralComponents/Table';
import CirculerProgress from '../GeneralComponents/CirculerProgress';
import ActionBar from './ActionBar';
import antitheft from '../../reducers/antitheft';
import content from '../../content';
import Heading from '../GeneralComponents/Heading';
import initialState from '../../compState/antiTheftState';
export const AntiContext = React.createContext(null);

function AntiTheft() {
  const [state,dispatch] = useReducer(antitheft,initialState);
  
  return (    
    <AntiContext.Provider value={{state,dispatch}}>      
      <>
        <CirculerProgress visible={state.loading} color={state.ptheme}/>
        <Heading heading={content.lblAntiTheftH} description={content.lblAntiTheftD}/>   
        <Container fluid style={{backgroundColor:'#ffffff',marginTop:'2%'}}> 
          <ActionBar/>  
          <Table type='at' state={state} dispatch={dispatch}/> 
        </Container>        
      </>
    </AntiContext.Provider>           
  )
}

export default AntiTheft;
