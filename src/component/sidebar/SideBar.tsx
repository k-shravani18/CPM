"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import graph from '../../../public/images/AdminPanel/graph.svg'//'../../../public/images/AdminPanel/graph.svg';
import dots from '../../../public/images/AdminPanel/dots.svg';
import menuwhite from '../../../public/images/AdminPanel/menu_white.svg'
import menublack from '../../../public/images/AdminPanel/menu_black.svg'
import graphActive from '../../../public/images/AdminPanel/graphActive.svg'
import Logo from '../../../public/images/AdminPanel/logo.svg'
import { CgProfile } from 'react-icons/cg'
import style from './styles.module.css';

/**
   * This is the desktop sidebar component
   */
const Sidenavbar = () => {
    const [activeLink, setActiveLink] = useState(usePathname())
    const pathname = usePathname()

    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [name, setName] = useState('')
    const [realm, setRealm] = useState('')
    const [roles, setRoles] = useState('')
    const [client, setClient] = useState('')

    useEffect(() => {
        setActiveLink(pathname)
        // Get values from sessionStorage and update state
        const isAdmin = sessionStorage.getItem("isAdmin") === "true"
        const isSuperAdmin = sessionStorage.getItem("isSuperAdmin") === "true"
        const name = sessionStorage.getItem("name")
        const realm = sessionStorage.getItem("realm")
        const roles = sessionStorage.getItem("roles")

        setIsAdmin(isAdmin)
        setIsSuperAdmin(isSuperAdmin)
        setName(name || '')
        setRealm(realm || '')
        setRoles(roles || '')

    }, [pathname])
    const router = useRouter()

    /**
   * This function is used to logout the user
   * @description clears the session and calls the logout api
   */
    const handleLoginClick = async () => {
        //get the clientsecret
        const getClientResponse = await fetch(`/api/v2/getClient`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ realm: realm }),
        })
    
        if (getClientResponse.status === 200) {
            const clientData = await getClientResponse.json();
            const clientSecret = clientData.data
           
            //logout the user
            const response = fetch(`/api/v2/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify({
                    "refresh_token": sessionStorage.getItem("refresh_token"),
                    "realm": sessionStorage.getItem("realm"),
                    client: clientSecret
                })
            }).then((response) => {
                if (response.ok) {
                    if (response.status === 204) {
                       //clearing the userdetails from the session
                        sessionStorage.removeItem('access_token')
                        sessionStorage.removeItem('refresh_token')
                        sessionStorage.removeItem('email');
                        sessionStorage.removeItem('name');
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('roles');
                        sessionStorage.removeItem('isAdmin');
                        sessionStorage.removeItem('isSuperAdmin');
                        sessionStorage.removeItem('isUser');
                        sessionStorage.removeItem('realm');
                    }
                    router.push('/')
                }
            })
        }

    }

    return (
        <>
            <div className={`hidden lg:block ${style.sidebar_bg} h-full}`}>
                <div className='p-3'>
                    <div className={`flex flex-col justify-between ${style.panelboard}`}>
                        <div>
                            <div className=''>
                                <div className=' flex gap-3  items-center'>
                                    <div className=''>
                                        <Image src={Logo} alt='logo'></Image>
                                    </div>
                                    <div className='font-[700] text-[24px] text-white'>
                                        CPM
                                    </div>

                                </div>
                            </div>

                            <Link href="/dashboard">
                                <div className={`cursor-pointer rounded-md py-2.5 gap-2.5 ${style.dashboardicon} 
                               ${activeLink === '/dashboard' ? 'bg-white' : 'bg-none'
                                    }`}
                                    onClick={() => setActiveLink('/dashboard')}
                                >
                                    <div className='flex gap-3'>
                                        <div>
                                            <Image alt="#" src={activeLink === '/dashboard' ? menublack : menuwhite} />
                                        </div>
                                        <div className={`${activeLink === '/dashboard' ? 'text-black text-[14px] font-[400]' : 'text-white'}`}>
                                            Dashboard
                                        </div>
                                    </div>

                                </div>
                            </Link>

                            {(isAdmin || isSuperAdmin) ?
                                <Link href="/myInstances">
                                    <div className={`cursor-pointer rounded-md py-2.5 gap-2.5 ${style.dashboardicon} 
                                    ${activeLink === '/myInstances' || pathname.startsWith('/instanceDetails') ? 'bg-white' : 'bg-none'
                                        }`}
                                        onClick={() => setActiveLink('/myInstances')}
                                    >
                                        <div className='flex gap-3 '>
                                            <div>
                                                <Image alt="#" src={activeLink === '/myInstances' || pathname.startsWith('/instanceDetails') ? graphActive : graph} />
                                            </div>
                                            <div className={`${activeLink === '/myInstances' || pathname.startsWith('/instanceDetails') ? 'text-black text-[14px] font-[400]' : 'text-white'}`}>
                                                My Instances
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                                : null}


                            {(isAdmin || isSuperAdmin) ?
                                <Link href="/adminPanel">
                                    <div className={`cursor-pointer rounded-md py-2.5 gap-2.5 ${style.dashboardicon} 
                                   ${activeLink === '/adminPanel' ? 'bg-white' : 'bg-none'
                                        }`}
                                        onClick={() => setActiveLink('/adminPanel')}
                                    >
                                        <div className='flex gap-3 '>
                                            <div>
                                                <Image alt="#" src={activeLink === '/adminPanel' ? graphActive : graph} />
                                            </div>
                                            <div className={`${activeLink === '/adminPanel' ? 'text-black text-[14px] font-[400]' : 'text-white'}`}>
                                                Admin Panel
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                                : null}

                        </div>

                        <div className='text-white flex gap-2 items-center '>
                            <CgProfile size={40} />
                            <div className='flex flex-col gap-1 '>
                                {name}
                                <span className='flex gap-2 items-center font-bold text-sm'>
                                    {/* {roles} */}{realm}
                                </span>
                            </div>

                            <div className={style.dropdown}>
                                <Image alt="#" src={dots} />
                                <div className={style.dropdowncontent}>
                                    <button onClick={handleLoginClick}>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidenavbar;