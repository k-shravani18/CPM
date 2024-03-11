import React from 'react'

import { vmData } from '@/utils/constant'

const Inactiveinstancedetails = () => {
  const nonCompleteVMs = vmData.filter((vmdetails) => vmdetails.status === 'non-complete');
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>

        {nonCompleteVMs.map((vmdetails) => (

          
          <div key = {vmdetails.id} className={`bg-white p-2 rounded-lg border-l-4  border-[#5BCF7B]  cursor-pointer ${vmdetails.status === 'complete' ? 'border-[#5BCF7B]' : 'border-[#B01F24]'} h-[200px]`}>
            <div className='flex flex-col gap-'>
              <input type="checkbox" id='checkall' className='h-5 w-5  border-2  border-[#A3A3A3] cursor-pointer' />
            </div>
            <div className='text-[18px] text-[#B01F24] font-[500] '>
              {vmdetails.name}
            </div>
            <div className='font-[400] text-[12px] text-[#6B6B6B]'>
              {vmdetails.description}
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Region :</span>  <span className='font-[500] text-[14px] text-[#5E5E5E]'>{vmdetails.region}</span>
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Type : </span> <span className='font-[500] text-[14px] text-[#5E5E5E]'>{vmdetails.type}</span>
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Status : </span> <span className='font-[500] text-[14px] text-[#5E5E5E]'>{vmdetails.status}</span>
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Created On : </span> <span className='font-[500] text-[14px] text-[#5E5E5E]'>{vmdetails.CreatedOn}</span>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default Inactiveinstancedetails