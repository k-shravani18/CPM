"use client"
import React, { useEffect, useState } from 'react';
import Addcloud from './addcloud';
import Adddevice from './addcloud';
import Addvm from './addvm';
import Addbusiness from './addbusiness';
import { useRouter } from 'next/navigation'
import Navbar from '../navbar/NavBar';

interface NavbarProps {
    isInstanceValue:any,
    
}
/**
   * This component is the entry point to /adminPanel route
   * @prop isInstanceValue this is the instance data retrieved from mongoDb through Prisma 
   */
const Paneldata = ({isInstanceValue}:NavbarProps) => {
    const [step, setStep] = useState(0);
    

      const router = useRouter()
      const isAdmin = sessionStorage.getItem("isAdmin") === "true";
      const isUser = sessionStorage.getItem("isUser") === "true"
      const isSuperAdmin = sessionStorage.getItem("isSuperAdmin") === "true"
      const access_token = sessionStorage.getItem("access_token")
  
      useEffect(() => {
          // Check if the session is loaded and the user is authenticated
          if (access_token && isAdmin) {
              setStep(1); 
          }
         
      }, [access_token, isAdmin, isUser, router]);
  
      //shows the forbidden page if the user doesnot have the access
       if (access_token && isUser) {
          router.push('/dashboard')
          return <p>Forbidden...</p>;
      }
      const activeStatus = 1;
    return (
        <>
        
        <Navbar allData={isInstanceValue} activeStatus={activeStatus} />
            <div className='grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-2'>
                <div className='lg:col-span-2 2xl:col-span-1'>
                    <div className='grid grid-cols-2 lg:grid-cols-4 mt-5 px-10'>

                        {(isSuperAdmin &&
                            <div className='border border-[#E2E2E2] text-[16px] font-[500]'>
                                <button className={`px-[4px] py-[12px] w-full rounded-tl-lg rounded-tr-lg  
                            ${step === 0 ? 'bg-red-700 text-white' : 'bg-transparent text-black'} 
                              } justify-center items-center`}
                                    onClick={() => setStep(0)}
                                >
                                    Add Business</button>
                            </div>
                        )}

                        <div className='border border-[#E2E2E2]  text-[16px] font-[500]'>
                            <button className={`px-[4px] py-[12px] w-full rounded-tl-lg rounded-tr-lg 
                            ${step === 1 ? 'bg-red-700 text-white' : 'bg-transparent  text-black'}  
                              justify-center items-center`}
                                onClick={() => setStep(1)}
                            >Add Cloud</button>
                        </div>

                        {/* <div className='border border-[#E2E2E2]  text-[16px] font-[500]'>
                            <button className={`px-[4px] py-[12px] w-full rounded-tl-lg rounded-tr-lg 
                             ${step === 2 ? 'bg-red-700 text-white' : 'bg-transparent text-black'}  
                             justify-center items-center`}
                                onClick={() => setStep(2)}
                            >Add Device</button>
                        </div>
                        <div className='border border-[#E2E2E2]  text-[16px] font-[500]'>
                            <button className={`px-[4px] py-[12px] w-full rounded-tl-lg rounded-tr-lg 
                            ${step === 3 ? 'bg-red-700 text-white' : 'bg-transparent  text-black'}  
                             justify-center items-center`}
                                onClick={() => setStep(3)}
                            >Add VM</button>
                        </div> */}
                    </div>
                </div>

            </div>

            {step === 0 && <Addbusiness />}
            {step === 1 && <Addcloud onSuccessMessage={function (): void {
                throw new Error('Function not implemented.');
            } } />}
            {/* {step === 2 && <Adddevice />}
            {step === 3 && <Addvm />} */}
        </>

    );
};


export default Paneldata