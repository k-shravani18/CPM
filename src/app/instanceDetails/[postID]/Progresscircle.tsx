import React from 'react'
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  

const Progresscircle:any = ({percentage}:any) => {
    
  return (
    <div>
       <CircularProgressbarWithChildren value={percentage} text={`${percentage}%`} />
    </div>
  )
}

export default Progresscircle
