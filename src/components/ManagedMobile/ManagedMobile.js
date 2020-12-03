import React,{useEffect,useReducer,useContext} from 'react'
import {Container} from 'react-bootstrap';  //for bootstrap 
import CirculerProgress from '../GeneralComponents/CirculerProgress';
import Table from '../GeneralComponents/Table';
import MyModal from '../GeneralComponents/MyModal';
import content from '../../content';
import Heading from '../GeneralComponents/Heading';
import MMA from '../../actionCreator/managedMobile';
import AA from '../../actionCreator/app';
import manageMobile from '../../reducers/managedMobile';
import methods from '../../Services/managedMobile';
import ActionBar from './ActionBar';
import General from '../../Services/General';
import AddDeviceModalBody from './AddDeviceModalBody';
import initialState from '../../compState/managedDeviceState';
import { AuthContext } from "../../App";

export const ManageMobileContext = React.createContext(null);

function ManagedMobile() {
  const [state,dispatch] = useReducer(manageMobile,initialState);  
  const { authDispatch } = useContext(AuthContext);

  const addDeviceInManaged=()=>{
    methods.addDeviceOnServer(state,dispatch,authDispatch);
  }
  const closeAddDeviceDialog=()=>{
    dispatch(MMA.toggelAddNewDeviceModal());
    General.gettableData(dispatch,'mb',authDispatch);
  }  

  return (
    <ManageMobileContext.Provider value={{state,dispatch}}>
      <>      
        <CirculerProgress visible={state.loading} color={state.ptheme}/>
        <Heading heading={content.lblManageMobH} description={content.lblManageMobD}/>   
        <Container fluid style={{backgroundColor:'#ffffff',marginTop:'2%'}}> 
          <ActionBar/>  
          <Table type='mb' state={state} dispatch={dispatch}/> 
            <MyModal 
              title={content.lblAddNewDev} 
              show={state.showAddDevModal} 
              saveHandler={addDeviceInManaged}
              cancelHandler={closeAddDeviceDialog}>          
                <AddDeviceModalBody/> 
            </MyModal> 
        </Container>                   
      </>
    </ManageMobileContext.Provider>
  )
}

export default ManagedMobile;
