import React,{useEffect} from 'react';
import './App.css';
import Login from './components/Login/Login';
import PersistentDrawerLeft from './components/Menu/PersistentDrawerLeft';
import app_reducer from './reducers/app';
import initialState from './compState/authState';
import LS from './Services/LoginService';
export const AuthContext = React.createContext();

function App() {
  const [state, authDispatch] = React.useReducer(app_reducer, initialState);

  useEffect(()=>{     
    LS.isValidateToken(authDispatch);    
  },[]);

  return (
    <AuthContext.Provider value={{state,authDispatch}}>      
      <>
        {!state.isAuthenticated ? <Login /> : <PersistentDrawerLeft />}
      </>
    </AuthContext.Provider>
  );
}

export default App;
