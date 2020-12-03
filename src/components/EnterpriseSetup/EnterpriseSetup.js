import React,{useReducer,useEffect,useContext} from 'react';
import CirculerProgress from '../GeneralComponents/CirculerProgress';
import content from '../../content';
import Heading from '../GeneralComponents/Heading';
import CreateEnterprise from './CreateEnterprise';
import EnterpriseInfo from './EnterpriseInfo';
import enterpriseReducer from '../../reducers/enterprise';
import methods from '../../Services/enterprise';
import initialState from '../../compState/enterpriseState';
import {AuthContext} from '../../App';
export const EntContext = React.createContext();

function EnterpriseSetup() {
  const [state,dispatch] = useReducer(enterpriseReducer,initialState);
  const {authDispatch} = useContext(AuthContext);

  useEffect(()=>{    
    methods.getEnterpriseInfo(dispatch,authDispatch);        
  },[]);
  
  return (
    <EntContext.Provider value={{state,dispatch}}>
      <>
        <CirculerProgress visible={state.loading} color={state.ptheme}/>
        <Heading heading={content.enterpriseH} description={content.enterpriseD}/>      
        {state.hideConf?<EnterpriseInfo/> : <CreateEnterprise/>}        
      </>
    </EntContext.Provider>
  )
}
export default EnterpriseSetup;
