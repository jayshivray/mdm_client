import React,{useEffect,useContext} from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import methods from '../../Services/managedMobile';
import General from '../../Services/General';
import {AuthContext} from '../../App';

export default function Table(props) {  
  const datatable = props.state.datatable;
  const {authDispatch} = useContext(AuthContext);

  useEffect(()=>{
    General.gettableData(props.dispatch,props.type,authDispatch);        
    methods.bindEventListner();
  },[]); 

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      pagingTop
      searchTop
      searchBottom={false}     
    />
  );
}