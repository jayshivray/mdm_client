import React from 'react'

function Atag(props) {  
  return (
    <a href='#' onClick={()=>props.clickHandler(props)}>view</a>
  )
}

export default Atag
