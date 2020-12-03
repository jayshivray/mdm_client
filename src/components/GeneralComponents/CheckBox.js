import React from 'react';

export default function CheckBox(props) {
  return (
    <>
      <input type="CheckBox" id={props.id} className={props.className} userName={props.userName} mobileNumber={props.mobileNumber} email={props.email} ostype={props.ostype} policyName={props.policyName} state ={props.state} deviceId={props.deviceId}/>
    </>
  )
}
