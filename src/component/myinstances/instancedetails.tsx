/* import React from 'react'
import Vmdetails from './vmdetails';

interface InstanceDetailsProps {
  isInstanceValue: any
}

const Instancedetails = ({isInstanceValue}:InstanceDetailsProps) => {

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {isInstanceValue.map((vmdetails:any) => (
        <Vmdetails key={vmdetails.id} vmdetails={vmdetails} />
      ))}
    </div>
  )
}

export default Instancedetails */