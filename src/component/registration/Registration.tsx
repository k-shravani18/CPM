"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import abglogo from '../../../public/images/Dashboard/abg_logo.svg'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

/**
   * This is the user registration component
   */
const Registration = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter()
    const [error, setError] = useState('')//password doesnot match error
    const [userError, setUserError] = useState('')//to set duplicate username error
    const [emailError, setEmailError] = useState('')//to set duplicate email error
    const [emptyFieldsError, setEmptyFieldsError] = useState('');//empty fields error
    const [successMessage, setSuccessMessage] = useState('')
    const [realms, setRealms] = useState([])//getting the list of realms
    const [realm, setRealm] = useState('')//user selected realm

    useEffect(() => {
  /**
   * This function is used to fetch realms from keycloak
   * @description the fetched realms will be set into the state realms.
   */
        const getRealms = () => {
            try {
                const response = fetch(`/api/v2/getRealms`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }).then((response) => {
                    if (response.status === 200) {
                        return response.json()
                            .then((responseData) => {
                                setRealms(responseData.data)
                            })

                    } else {
                        setError('fetching realms failed');
                    }
                });

            } catch (error) {
                console.error('Login failed:', error);
            }
        }
        getRealms()
    }, [])
  
  /**
   * this function is called on register form submit
   * @param e this is the form submit event
   * @description setting a error message if an error exists
   */
    const submitData = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!firstName || !lastName || !email || !confirmPassword || !username || !password || !realm) {
            setEmptyFieldsError('Please fill all the fields.');
            return
        }

        if (password !== confirmPassword) {
            setError('Password does not match')
            return
        }

        const body = { firstName, lastName, email, username, password, confirmPassword, realm }
       //registering the new user
        fetch(`/api/v2/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.status === 201) {
                setIsSuccess(true)
                toast.success("User Registered Successfully")
                setTimeout(() => {
                    router.push("/")
                }, 6000)
                return response.json();
            } else {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
        })
            .catch((error) => {
                if (error.message === 'User exists with same username') {
                    setUserError('username already exists')
                }
                else if (error.message === 'User exists with same email') {
                    setEmailError('email already exists')
                }
            });
    }
    return (
        <>
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-3 bg-red-700'>
                    <div className='col-span-1 flex-grow-1 p-20 bg-red-700 lg:h-screen'>
                        <Image className="lg:w-full mx-auto h-auto lg:mt-[170px]" alt="#" src={abglogo} />
                        <div className="flex justify-center items-center text-white font-size-[14px] md:text-2xl font-medium mt-20 whitespace-nowrap">Cloud Posture Management</div>
                    </div>
                    {/* form */}
                    <div className='px-5 py-5 col-span-2 bg-white flex flex-col justify-center items-center overflow-auto'>
                        <form onSubmit={submitData} className="md:w-[50%] sm:w-full">
                            <div className="text-black text-center text-2xl font-medium ">Register</div>
                            <div>
                                {emptyFieldsError && <div className='text-red-500 text-sm font-medium mb-2'>{emptyFieldsError}</div>}
                                <label htmlFor="firstName" className="text-neutral-500 text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${emptyFieldsError && !firstName ? 'border-red-500' : 'border-neutral-200'}
                                    placeholder-stone-300 text-black text-sm font-normal`}
                                    placeholder="Enter Firstname "
                                    onChange={(e) => { setFirstName(e.target.value); setEmptyFieldsError('') }}
                                />

                                <label htmlFor="lastName" className="text-neutral-500 text-sm font-medium">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${emptyFieldsError && !lastName ? 'border-red-500' : 'border-neutral-200'}
                                    placeholder-stone-300 text-black text-sm font-normal`}
                                    placeholder="Enter Lastname "
                                    onChange={(e) => { setLastName(e.target.value); setEmptyFieldsError('') }}
                                />

                                {emailError && <div className='text-red-500 text-sm font-medium mb-2'>{emailError}</div>}
                                <label htmlFor="emailId" className="text-neutral-500 text-sm font-medium">
                                    Email ID
                                </label>
                                <input
                                    type="email"
                                    id="emailId"
                                    className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${emptyFieldsError && !email || emailError ? 'border-red-500' : 'border-neutral-200'}
                                    placeholder-stone-300 text-black text-sm font-normal`}
                                    placeholder="Email ID"
                                    onChange={(e) => { setEmail(e.target.value); setEmptyFieldsError(''); setEmailError('') }}
                                />
                                {userError && <div className='text-red-500 text-sm font-medium mb-2'>{userError}</div>}
                                <label htmlFor="Username" className="text-neutral-500 text-sm font-medium">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${emptyFieldsError && !username || userError ? 'border-red-500' : 'border-neutral-200'}
                                     placeholder-stone-300 text-black text-sm font-normal`}
                                    placeholder="Enter Username"
                                    onChange={(e) => { setUserName(e.target.value); setEmptyFieldsError(''); setUserError('') }}
                                />


                                <label htmlFor="password" className="text-neutral-500 text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${emptyFieldsError && !password || error ? 'border-red-500' : 'border-neutral-200'}
                                    placeholder-stone-300 text-black text-sm font-normal`}
                                    placeholder="Password"
                                    onChange={(e) => { setPassword(e.target.value); setError(''); setEmptyFieldsError('') }}
                                />

                                <label htmlFor="confirmPassword" className="text-neutral-500 text-sm font-medium">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${emptyFieldsError && !confirmPassword || error ? 'border-red-500' : 'border-neutral-200'}
                                    placeholder-stone-300 text-black text-sm font-normal`}
                                    placeholder="Confirm Password"
                                    onChange={(e) => { setConfirmPassword(e.target.value); setError(''); setEmptyFieldsError('') }}
                                />
                                <label htmlFor="realms" className="text-neutral-500 text-sm font-medium">
                                    Accounts
                                </label>
                                <select id="realms"
                                    className='w-full h-[42px] my-2 pl-3 bg-white rounded border border-neutral-200
                                   placeholder-stone-300 text-black text-sm font-normal'
                                    onChange={(e) => { setRealm(e.target.value); setEmptyFieldsError('') }}
                                >
                                    <option value="">Account Name</option>
                                    {realms.map((data: any, index) => {
                                        return <option key={index} value={data}>{data}</option>
                                    })}

                                </select>
                                {error && <div className='text-red-500 text-sm font-medium mb-2'>{error}</div>}
                            </div>
                            <div className=''>
                                <span className='text-blue-500'>
                                    <a className='text-blue-500 text-xs hover:underline' href='/'>&lt;&lt; Back to Login</a>
                                </span>

                                <button type='submit' className="w-full px-[15px] py-[5px]  bg-red-700 rounded justify-center items-center gap-3 inline-flex mt-8">
                                    <span className="text-white text-base font-medium">Register</span>
                                </button>
                            </div>

                            {/* {successMessage} */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration