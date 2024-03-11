import React from 'react'
import Vmdetails from './vmdetails';
import { vmData } from '@/utils/constant'

const Instancedetails = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
          {vmData.map((vmdetails) => (
             <Vmdetails key={vmdetails.id} vmdetails={vmdetails} />
          
          ))}
        </div>
  )
}

export default Instancedetails