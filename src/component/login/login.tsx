"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import abglogo from "../../../public/images/Dashboard/abg_logo.svg";
import formlogo from "../../../public/images/Dashboard/form-logo.svg";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

/**
   * This is the user login component
   */

const Login = () => {
  
  const [spinner, setSpinner] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(""); //incorrect credentials and emptyfields error
  const [realms, setRealms] = useState([]); //getting the list of realms
  const [realm, setRealm] = useState(""); //user selected realm

  const router = useRouter();
 
  useEffect(() => {
  /**
   * This function is used to fetch realms from keycloak
   * @description the fetched realms will be set into the state realms.
   */
    const getRealms = () => {
      try {
        const response = fetch(`/api/v2/getRealms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (response.status === 200) {
            return response.json().then((responseData) => {
              setRealms(responseData.data);
            });
          } else {
            setError("fetching realms failed");
          }
        });
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
    getRealms();
  }, [realms]);
 
  /**
   * this function is called on login form submit
   * @param e this is the form submit event
   * @description setting a error message if an error exists
   */

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!username || !password || !realm) {
      setError("Please fill all the fields.");
      return;
    }
   
    //fetching the clientsecret
    const getClientResponse = await fetch(`/api/v2/getClient`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ realm: realm }),
    });
    
    if (getClientResponse.status === 200) {
      const clientData = await getClientResponse.json();
      const clientSecret = clientData.data;

      const body = { username, password, realm, client: clientSecret };
      
      //logging in
      const response = fetch(`/api/v2/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((response) => {
        if (response.status === 200) {
          return response.json().then((responseData) => {
            const userDetails = JSON.parse(
              Buffer.from(
                responseData.access_token.split(".")[1],
                "base64"
              ).toString()
            );
            //when logged in, set the session storage with user details
            sessionStorage.setItem("email", userDetails.email);
            sessionStorage.setItem("name", userDetails.name);
            sessionStorage.setItem("username", userDetails.preferred_username);
            sessionStorage.setItem("roles", userDetails.realm_access.roles);
            sessionStorage.setItem(
              "isAdmin",
              userDetails.realm_access.roles.includes(
                process.env.NEXT_PUBLIC_SSO_ROLE_ADMIN
              )
            );
            sessionStorage.setItem(
              "isSuperAdmin",
              userDetails.realm_access.roles.includes(
                process.env.NEXT_PUBLIC_SSO_ROLE_SUPER_ADMIN
              )
            );
            sessionStorage.setItem(
              "isUser",
              userDetails.realm_access.roles.includes(
                process.env.NEXT_PUBLIC_SSO_ROLE_USER
              )
            );
            sessionStorage.setItem("refresh_token", responseData.refresh_token);
            sessionStorage.setItem("access_token", responseData.access_token);
            sessionStorage.setItem("realm", realm);
            router.push("/dashboard");
            setIsSuccess(true);
            setSpinner(true);
          });
        } else {
          setError("Incorrect username or password. Please try again.");
        }
      });
    }
    
  };

  return (
    <>
      {spinner && <Loading />}
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-red-700 ">
        <div className="col-span-1 flex-grow-1 p-20 bg-red-700 lg:h-screen ">
          <Image
            className="lg:w-full mx-auto h-auto lg:mt-[170px]"
            alt="#"
            src={abglogo}
          />
          <div className="flex justify-center items-center text-white font-size-[14px] md:text-2xl font-medium mt-20 whitespace-nowrap">
            Cloud Posture Management
          </div>
        </div>
        {/* form */}
        <div className="px-5 py-5 col-span-2 bg-white flex flex-col justify-center items-center overflow-y-auto">
          <form className="md:w-[50%] sm:w-full" onSubmit={submitData}>
            <div className="text-black text-center text-2xl font-medium ">
              Log In
            </div>
            <div className="text-center text-neutral-500 text-base font-normal mt-5">
              Enter your email address and password below to access
              <span className="block">the platform</span>
            </div>

            <div className="py-16">
              {error && (
                <div className="text-red-500 text-sm font-medium mb-2">
                  {error}
                </div>
              )}
              <label
                htmlFor="emailId"
                className="text-neutral-500 text-sm font-medium"
              >
                Email ID
              </label>
              <input
                type="text"
                id="emailId"
                className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                  error ? "border-red-500" : "border-neutral-200"
                }
                  placeholder-stone-300 text-black text-sm font-normal`}
                placeholder="Email ID"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
              />

              <label
                htmlFor="password"
                className="text-neutral-500 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                  error ? "border-red-500" : "border-neutral-200"
                }
                  placeholder-stone-300 text-black text-sm font-normal`}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <label
                htmlFor="realms"
                className="text-neutral-500 text-sm font-medium"
              >
                Accounts
              </label>
              <select
                id="realms"
                className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                  error ? "border-red-500" : "border-neutral-200"
                }
                  placeholder-stone-300 text-black text-sm font-normal`}
                onChange={(e) => {
                  setRealm(e.target.value);
                  setError("");
                }}
              >
                <option value="">Account Name</option>
                {realms.map((data: any, index) => {
                  return (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              {/* <a href='/forgotPassword' className="flex items-center justify-end text-zinc-700 text-sm font-normal hover:underline">Forget Password ?</a> */}

              <button
                type="submit"
                className="w-full px-[15px] py-[5px] mt-8 bg-red-700 rounded justify-center items-center gap-3 inline-flex"
              >
                <span className="text-white text-base font-medium">Login</span>
              </button>

              {/* <div className="flex justify-center items-center text-neutral-500 mt-5">
                <span>
                  New user?
                  <a
                    className="text-blue-500 ml-2 hover:underline "
                    href="/register"
                  >
                    Register
                  </a>
                </span>
              </div> */}
            </div>

            <div className="flex justify-center items-center mt-10">
              <Image src={formlogo} alt="" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
