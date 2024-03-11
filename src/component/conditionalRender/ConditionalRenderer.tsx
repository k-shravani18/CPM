'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidenavbar from '../sidebar/SideBar';
import Loading from '../../app/loading';
import { ToastContainer } from 'react-toastify';

/**
   * If the user is not logged in it doesnot render the sidebar 
   * If the user is logged in it checks the roles and renders the respective views
   */

const ConditionalRender = ({ children }: any) => {
  const pathname = usePathname();
  const [access_token, setAccessToken] = useState<string | null>(null)
  const [isUser, setIsUser] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<string | null>(null)
  const [isSuperAdmin, setSuperAdmin] = useState<string | null>(null)

  const router = useRouter()
  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    const isUser = sessionStorage.getItem("isUser");
    const isAdmin = sessionStorage.getItem("isAdmin");
    const isSuperAdmin = sessionStorage.getItem("isSuperAdmin");
    setAccessToken(access_token);
    setIsUser(isUser);
  
    if (!access_token&& (pathname !== '/register'))
       
       {router.push("/");}
   
    if (access_token) {
      ['/dashboard', '/adminPanel', '/myInstances'].includes(pathname)
        ? router.push(pathname)
        : pathname.startsWith('/instanceDetails/')
        ? router.push(pathname) 
        : router.push('/dashboard');
    }
   

  }, [access_token, pathname, router])

  if (pathname === "/"
    || pathname === "/register"
    || pathname === "/forgotPassword"
    || pathname === "/changePassword") {
    // If the pathname is '/', don't render Sidenavbar and Navbar
    return (
      <div>
        {children}
      </div>
    )
  }
  if (!access_token) {
    return (
      <Loading/>
    )
  }
  return (
     
    <div className='grid grid-cols-6'>
      <div className='col-span-1'>
        <div className='h-full'>
          <Sidenavbar />
        </div>
      </div>
      <div className='col-span-6 lg:col-span-5' >
        <div className='h-full w-full'>
        {/*   <Navbar /> */}
          <div className='h-full lg:h-[92vh] overflow-y-auto'>
            {children}
            <ToastContainer autoClose={2000} position="top-right" />
          </div>
        </div>
      </div>
    </div>
   
  )
};

export default ConditionalRender;
