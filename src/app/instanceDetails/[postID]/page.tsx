import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from '../[postID]/styles.module.css'
import Right from '../../../../public/images/right.svg'
import Rightarrow from '../../../../public/images/rightarrow.svg'
import Bargraph from './bargraph';

const page = async () => {

  const HOME = "AzureCascade"
  const Cpu = "60%"
  const bgcolor = '#27AE60';
  const percentage = 90;
  const bg = ` radial-gradient(closest-side, white 79%, transparent 80% 100%)`
  const conicGradient = `conic-gradient(#27AE60 ${percentage}%, #D9D9D9 0)`;

  const cricleBar = {
    backgroundImage: `${bg}, ${conicGradient}`,
  };

  return (
    <div className='h-[90vh] w-full'>
      
      <div className='my-5 h-14  mx-2 md:mx-5  px-2 md:px-5 flex items-center justify-between '>
        <div className='flex gap-3 items-center'>
          <div className=' text-[14px] sm:text-[18px] font-[500]'>{HOME}</div>
          <div className='text-[12px] sm:text-[14px]'><Link href="/myInstances">Instance</Link></div>
          <div className='hidden lg:block'>{'> '}<span className='font-[500]'>Details</span> </div>
        </div>
        <div className='block lg:hidden'>
          <div className='flex  flex-col'>
            <div className='text-[11px] sm:text-[16px]'>
              {Cpu} CPU Utilized
            </div>
            <div className='h-2 w-full bg-white   rounded-md'>
              <div className={`w-[60%] bg-[#5BCF7B] h-full rounded-md`}></div>
            </div>
          </div>
        </div>
      </div>
      <div className=' m-2 md:m-5 px-2 md:px-5  grid grid-cols-7'>
        <div className='col-span-1 hidden lg:block' >
          <div className='mr-4'>
            <div>
              {Cpu} CPU Utilized
            </div>
            <div className='h-2 w-full bg-white   rounded-md'>
              <div className={`w-[60%] bg-[#5BCF7B] h-full rounded-md`}></div>
              <div className='mt-5 h-11 border-l-4 border-[#3340B1] flex items-center px-5'>
                <div className='text-[#3340B1]'>
                  Details
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-7 lg:col-span-6 bg-white h-[85vh] overflow-y-auto'>
          <div className='p-3 '>
            <div className='font-medium text-[16px] flex gap-1'>
              <div className='block lg:hidden'>
                <Image src={Rightarrow} alt='image' />
              </div>
              Details
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-5 my-5 h-[400px]'>
              <div className='col-span-1 md:col-span-1 flex justify-between lg:justify-center items-start'>
                <div className='block lg:hidden'>
                  Details
                </div>
                <div className={`${styles.progress_bar} flex items-center justify-center`} style={cricleBar} >
                  {percentage}%
                </div>

                {/* <Progresscircle   percentage={percentage} /> */}

              </div>
              <div className='col-span-1 md:col-span-4'>
                <Bargraph/>
              </div>
            </div>
            {/* report */}
            <div className='my-5 border p-2'>

              <div className='flex justify-between items-end'>
                <div> Site 24/7</div>
                <Image src={Right} alt='right flex ' />
              </div>

              <div className=' flex  gap-2 justify-between items-center '>
                <div className='hidden lg:block'>
                  <div className={` ${styles.dashborshow} w-20 h-20 flex justify-end items-end  `}>
                    <Image src={Right} alt='right flex ' />
                  </div>
                </div>
                <div className='hidden lg:block'>
                  <div className={` ${styles.dashborshow} h-20 w-20 flex justify-end items-end`}>
                    <Image src={Right} alt='right flex ' />
                  </div>
                </div>
                <div className='hidden lg:block'>
                  <div className={` ${styles.dashborshow} h-20 w-20 flex justify-end items-end `}>
                    <Image src={Right} alt='right flex ' />
                  </div>
                </div>
                <div className='hidden lg:block'>
                  <div className={` ${styles.dashborshow} h-20 w-20 flex justify-end items-end `}>
                    <Image src={Right} alt='right flex ' />
                  </div>
                </div>
                <div className='hidden lg:block'>
                  <div className={` ${styles.dashborshow} h-20 w-20 flex justify-end items-end`}>
                    <Image src={Right} alt='right flex ' />
                  </div >
                </div>
                <div className='hidden lg:block'>

                  <div className={` ${styles.dashborshow} h-20 w-20 flex justify-end items-end`}>
                    <Image src={Right} alt='right flex ' />
                  </div>
                </div>
                <div className='h-[80px] w-[80px] rounded-full flex justify-center items-center' style={cricleBar} >
                  {percentage}%
                </div>
                <div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
