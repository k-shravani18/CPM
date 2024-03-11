"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HOME, ADMIN, MYINSTANCES } from "../../utils/constant";
import { usePathname } from "next/navigation";
import Toggle from "../../../public/images/toggle.png";
import { BsQuestionCircle, BsBell, BsSearch } from "react-icons/bs";
import MobileSidebar from "../sidebar/mobilesidebar";
import { Instances } from "@/utils/type";
//import { data } from '@/app/instanceDetails/[postID]/bargraph';
import arrow from "../../../public/images/arrow.svg";
import { reduceFunction } from "@/utils/common";

const Navbar = ({
  inputChange,
  activeStatus,
  handleCloudChange,
  handleApplicationChange,
  allData,
  //notification
}: any) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isSearchDropdownVisible, setSearchDropdownVisible] = useState(false);

  const toggleSearch = () => {
    inputChange("");
    setSearchDropdownVisible(!isSearchDropdownVisible);
  };
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  // const [notification, setNotification] = useState([]);
  // const [notification, setNotification] = useState<any[]>([]); // Change here

  const [error, setError] = useState("");
  // useEffect(() => {
  //   const getKafka = async () => {
  //     try {
  //       const response = await fetch(`/api/v2/kafka`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }).then((response) => {
  //         console.log(typeof response);
  //         if (response.status === 200) {
  //           return response.json().then((responseData) => {
  //             // Remove duplicates using Set
  //             const uniqueNotification = [...new Set(responseData.message)];
  //             console.log("uniqueNotification");
  //             console.log(typeof uniqueNotification);
  //             setNotification(uniqueNotification);
  //           });
  //         } else {
  //           setError("internal server error");
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //     }
  //   };
  //   getKafka();
  // }, []);


  // const [isDropdownVisible, setDropdownVisible] = useState(false);
  // const notifications = notification;
  //["Notification 1", "Notification 2", "Notification 3"];

  // const toggleDropdown = () => {
  //   setDropdownVisible(!isDropdownVisible);
  // };

  // Use useRef to store a reference to the dropdown element
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     // Use the non-null assertion here
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setDropdownVisible(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [isDropdownVisible]);

  const sortedItems = [...allData];
  const vmdetails: Instances[] = reduceFunction(sortedItems);
  
  const [filteredData, setFilteredData] = useState<Instances[]>(vmdetails);
  const applicationName = filteredData.map(
    (data: any, index: number) => data.applicationname
  );
  const uniqueApplicationType = [...new Set(applicationName)];

  const clouds = filteredData.map((data: any, index: number) => data.cloud);
  const uniqueCloudsType = [...new Set(clouds)];

  // Call usePathname unconditionally at the beginning of your component
  const pathname = usePathname();
  const [selectedCloud, setSelectedCloud] = useState("");
  const [selectedApplication, setSelectedApplication] = useState("");
  // Use useEffect to reset selectedApplication when selectedCloud changes
  useEffect(() => {
    setSelectedApplication("");
  }, [selectedCloud]);

  // Use useEffect to reset selectedCloud when selectedApplication changes
  /*  useEffect(() => {
    setSelectedCloud("");
  }, [selectedApplication]); */
  return (
    <>
      <div className="hidden lg:block">
        <div className="w-full bg-white h-12 py-1 px-5  flex justify-between">
          {activeStatus === 1 ? (
            <div
              className={
                pathname === "/dashboard" || pathname === "/myInstances"
                  ? "border border-1 lg:w-[30%] xl:w-[25%] xxl:w-[20%] rounded-md flex items-center"
                  : "block lg:hidden"
              }
            >
              <div className="m-1 w-6">
                <BsSearch size={18} />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="search"
                  onChange={(e) => inputChange(e.target.value)}
                  className="border-none focus:outline-none w-full"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-3 justify-center px-5">
              <div className="w-[100%]">
                <select
                  id="cloud"
                  name="cloud"
                  className="border border-1 focus:outline-none rounded-md h-10  w-full"
                  /* onChange={(e) => handleCloudChange(e.target.value)} */
                  onChange={(e) => {
                    setSelectedCloud(e.target.value);
                    handleCloudChange(e.target.value);
                    /* setSelectedApplication(""); // Reset application when cloud changes
                    handleApplicationChange(""); */
                  }}
                  value={selectedCloud}
                >
                  <option value="">Cloud Type</option>

                  {uniqueCloudsType.map((data, index) => {
                    return (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-[100%]">
                <select
                  id="application"
                  name="application"
                  className="border border-1 focus:outline-none rounded-md h-10  w-full"
                  /* onChange={(e) => handleApplicationChange(e.target.value)} */
                  onChange={(e) => {
                    setSelectedApplication(e.target.value);
                    handleApplicationChange(e.target.value);
                    /* setSelectedCloud('');
                    handleCloudChange(""); */
                  }}
                  value={selectedApplication}
                >
                  <option value="">Select application</option>
                  {uniqueApplicationType.map((data, index) => {
                    return (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
          <div className="flex gap-3 my-auto ml-auto relative">
            <div className=" ">
              <BsQuestionCircle size={18} />
            </div>
            <div className="cursor-pointer"> 
            {/* onClick={toggleDropdown} > */}
              <BsBell size={18} />
               {/* {notifications.length > 0 && (
                <span className="bg-red-500 border border-solid border-black text-white rounded-full px-1 absolute bottom-2 left-10 text-xs">
                  {notifications.length}
                </span>
              )} */}
            </div>

            {/* {isDropdownVisible && (
              <div ref={dropdownRef} className="absolute right-0 mt-3 bg-white border border-gray-300 rounded-md shadow-lg w-64 h-[200px] overflow-y-auto">
                <ul className="">
                  {notifications.length <= 0 ? (
                    <li className="px-4 py-2 mb-1 cursor-pointer bg-gray-100">
                      No notifications
                    </li>
                  ) : (
                    notifications.map((notification: any, index: number) => (
                      <li key={index} className="px-4 py-2 mb-1 bg-gray-100 cursor-pointer">
                        {notification}
                      </li>
                    ))
                  )}
                </ul>

              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        {isSearchDropdownVisible ? (
          <div className="w-full bg-white h-12 py-1 px-5 flex justify-between ">
            <div className="border border-1 rounded-md flex items-center">
              <button className="px-2 m-1 w-6" onClick={toggleSearch}>
                <Image src={arrow} alt="back" />
              </button>
              <div>
                <input
                  type="text"
                  placeholder="search"
                  onChange={(e) => inputChange(e.target.value)}
                  className="border-none focus:outline-none w-full"
                />
              </div>
              <div className="m-1 w-6">
                <BsSearch size={18} />
              </div>
            </div>
          </div>

        ) : (
          <div className="w-full bg-white h-12 py-2 px-5 flex justify-between ">
            <div className="flex gap-3 items-center">
              <div className="cursor-pointer" onClick={toggleSidebar}>
                <Image src={Toggle} alt="toggle" />
              </div>
              {pathname === "/dashboard" && <div>{HOME}</div>}
              {pathname === "/myInstances" && <div>{MYINSTANCES}</div>}
              {pathname === "/adminPanel" && <div>{ADMIN}</div>}
            </div>
            <div className="flex gap-3 items-center relative">
              {pathname === "/dashboard" && (
                <div className="cursor-pointer" onClick={toggleSearch}>
                  <BsSearch size={18} />
                </div>
              )}

              <div className=" ">
                <BsQuestionCircle size={18} />
              </div>
              <div className="cursor-pointer"> 
              {/* onClick={toggleDropdown}> */}
                <BsBell size={18} />
                {/* {notifications.length > 0 && (
                  <span className="bg-red-500 border border-solid border-black text-white rounded-full px-1 absolute bottom-3.5 ml-2 text-xs">
                    {notifications.length}
                  </span>
                )} */}
              </div>

              {/* {isDropdownVisible && (
                <div ref={dropdownRef} className="absolute right-0 mt-[143px] bg-white border border-gray-300 rounded-md shadow-lg w-64 h-[100px] overflow-y-auto">
                    <ul className="">
                  {notifications.length <= 0 ? (
                    <li className="px-4 py-2 mb-1 cursor-pointer bg-gray-100">
                      No notifications
                    </li>
                  ) : (
                    notifications.map((notification: any, index: number) => (
                      <li key={index} className="px-4 py-2 mb-1 bg-gray-100 cursor-pointer">
                        {notification}
                      </li>
                    ))
                  )}
                
                  </ul>
                </div>
              )} */}
            </div>
          </div>
        )}
      </div>
      <div className="lg:hidden">{isSidebarVisible && <MobileSidebar />}</div>
    </>
  );
};

export default Navbar;


