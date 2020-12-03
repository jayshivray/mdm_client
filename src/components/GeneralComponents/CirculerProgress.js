import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const light = '#f2f2f2', dark = '#d9d9d9';

function CirculerProgress(props) {
  let opacity = props.color==='light'?'0.4':'';
  let color = props.color==='dark'? dark : light;
  let visible = props.visible? 'flex' : 'none';

  let overlay = {
    position : 'fixed', /* Sit on top of the page content */  
    width: '100%', /* Full width (cover the whole page) */
    height: '100%', /* Full height (cover the whole page) */
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',    
    backgroundColor: color,
    zIndex: 2, /* Specify a stack order in case you're using a different order for other elements */
    cursor  : 'pointer', /* Add a pointer on hover */
    display : visible,
    justifyContent: 'center',
    alignItems: 'center',
    opacity   
  }

  return (    
    <>
      <div style={overlay} >
        <CircularProgress disableShrink />        
      </div>
    </>
  )
}

export default CirculerProgress;