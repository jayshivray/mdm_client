import React,{useState} from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
// import ManagedMobile from './ManagedMobile/ManagedMobile';
import EnterpriseSetup from './EnterpriseSetup/EnterpriseSetup';
// import AntiTheft from './AntiTheft/AntiTheft';

const Topic=()=>{
  let { topicId } = useParams();  
  
  switch (topicId) {
    case 'Enterprise':
      return(<EnterpriseSetup/>);
    // case 'ManagedMobile':
    //   return(<ManagedMobile/>);
    // case 'AntiTheft':
    //   return(<AntiTheft/>);              
    default:
      return <Redirect to='/'/>;
  }  
}

const Menu =(props)=>{
  let { path, url } = useRouteMatch();  

  const [islogin,setLogin] = useState(true);

  const logoutHandler=()=>{
    setLogin(false);        
  }
  
  if(!islogin){
    return <Redirect to='/'/>
  }
  return (    
    <div>
      <h2>Topics</h2>
      <button onClick={logoutHandler}>logout</button>
      <ul>
        <li>
          <Link to={`${url}/Enterprise`}>Foo</Link>
        </li>
        {/* <li>
          <Link to={`${url}/ManagedMobile`}>Bar</Link>
        </li>
        <li>
          <Link to={`${url}/AntiTheft`}>Baz</Link>
        </li> */}
      </ul>      
      <Switch>
        <Route exact path={`${path}/:topicId`} component={Topic}></Route>
      </Switch>
    </div>
  ); 
}

export default Menu;
