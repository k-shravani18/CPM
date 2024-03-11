"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import ActiveInstancesicon from "../../../public/images/Dashboard/ActiveInstances.svg";
import Complianticon from "../../../public/images/Dashboard/Compliateicon.svg";
import NonCompliant from "../../../public/images/Dashboard/NonCompliant.svg";
import TotalInstance from "../../../public/images/Dashboard/instance.svg";
import Warning from "../../../public/images/Dashboard/Warning.svg";
import Tick from "../../../public/images/Dashboard/tick.svg";
import { FcNext, FcPrevious } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import linux from "../../../public/images/Dashboard/linux.png";
import redhat from "../../../public/images/Dashboard/redhat.jpg";
import windows from "../../../public/images/Dashboard/windows.png";
import azure from "../../../public/images/Dashboard/azure.png";
import aws from "../../../public/images/Dashboard/aws.png";
import { DataItem, Instances } from "@/utils/type";
import Navbar from "../navbar/NavBar";
import filledStar from "../../../public/images/FilledStar.jpeg";
import emptyStar from "../../../public/images/EmptyStar.jpeg";
import { reduceFunction, removeDuplicates } from "@/utils/common";
import {
  /* FaFaceAngry,
  FaFaceSmile,
  FaFaceSmileBeam, */
  FaRegFaceAngry,
} from "react-icons/fa6";
import {
  FaRegAngry,
  FaRegSmile,
  FaRegSmileBeam,
  FaRegFrownOpen,
} from "react-icons/fa";

import { BsEmojiNeutral } from "react-icons/bs";
interface DashboardProps {
  //isSuccess: boolean;
  isInstanceValue: any;
}

interface NavbarProps {
  instanceName: string;
}

export interface VMS {
  cloud: string;
  time_stamp: string;
  instance: Instances;
}
/**
 * This component is the entry point to /dashboard route
 * @prop isInstanceValue this is the instance data retrieved from mongoDb through Prisma
 */
const Dashboard = ({ isInstanceValue }: DashboardProps) => {
  const [error, setError] = useState("");

  const [prismaValue, setprismaValue] = useState<DataItem[]>(isInstanceValue);
  const sortedItems = [...prismaValue];
  //const reduceddata= reduceFunction(sortedItems);
  const vmdetails: Instances[] = removeDuplicates(reduceFunction(sortedItems));
  /*  const vmdetails: Instances[] = sortedItems.reduce(
    (result: Instances[], currentData: DataItem) => {
      const instances:any = currentData.instances.map(
        (data: Instances) => {
          return {
            time_stamp: currentData.time_stamp,
            cloud: currentData.cloud,
            instance_id: data.instance_id,
            instance_name: data.instance_name,
            status: data.status,
            vm_type: data.vm_type,
            os: data.os,
            environment: data.environment,
            location: data.location,
            complianceStatus: [
              data.crodwstrike_service_status !== null ? true : false,
              data.nxlog_validate !== null ? true : false,
              data.ntp_validate !== null ? true : false,
              data.site_24_7 !== null ? true : false,
              data.zabix_agent !== null ? true : false
          ].filter(bool => bool === true).length
          };
        }
      );
      result = result.concat(instances);
      return result;
    },
    []
  ); */

  const [filteredData, setFilteredData] = useState<Instances[]>(vmdetails);

  //show all and show less
  const [showAll, setShowAll] = useState(false);
  //sorting according to column
  /*  const [sortColumn, setSortColumn] = useState<keyof Test_Instance | null>(
    null
  ); */
  // Provide the type here
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);

  const isUser = sessionStorage.getItem("isUser") === "true";
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  const isSuperAdmin = sessionStorage.getItem("isSuperAdmin") === "true";
  const access_token = sessionStorage.getItem("access_token");

  if (access_token && !isUser && !isAdmin && !isSuperAdmin) {
    return <p>Forbidden...</p>;
  }

  const getExtractedData = (str: string, value: string) => {
    return str.split(value)[1].split("/")[0];
  };

  const initialItemsToShow = 2;

  const handleViewAll = () => {
    setShowAll(!showAll); // Toggle the value of showAll on each click
  };

  /*  const handleSort = (column: any) => {
    if (column === sortColumn) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    } else {
      setSortOrder("asc");
      setSortColumn(column);
    }
  }; */

  const parseDate = (dateStr: string) => {
    // Assuming the date format is "DD-MM-YYYY, HH:mm AM/PM"
    const [datePart, timePart] = dateStr.split(", ");
    const [day, month, year] = datePart
      .split("-")
      .map((part) => parseInt(part));
    const [time, meridiem] = timePart.split(" ");

    let hours = parseInt(time.split(":")[0]);
    const minutes = parseInt(time.split(":")[1]);

    if (meridiem === "PM") {
      hours += 12;
    }

    return new Date(year, month - 1, day, hours, minutes);
  };

  const itemsperPage = 5;
  const totalInstances = vmdetails.length;
  const startIndex = currentPage * itemsperPage;
  const endIndex = Math.min(startIndex + itemsperPage, totalInstances);
  const vmList = filteredData.slice(startIndex, endIndex);
  //console.log("vmList",filteredData);
  const totalPages = Math.ceil(filteredData.length / itemsperPage);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  var countNonCompliant: number = 0;
  var countCompliant: number = 0;

  vmdetails.filter((vms: Instances) => {
    vms.status === "running" ? ++countCompliant : ++countNonCompliant;
  });
  var countActiveInstance: number = countCompliant;

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  /**
   * Start of Search
   */
  const handleSearch = (searchWord: string) => {
    const filteredEvents = vmdetails.filter((vms) => {
      return (
        vms.instance_name.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.status.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.os.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.environment.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.location.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.status.toLowerCase().match(searchWord.toLocaleLowerCase())
      );
    });

    return filteredEvents;
  };

  //Applying our search filter function to our array of countries recieved from the API
  var filteredVms;

  //Handling the input on our search bar
  const handleChange = (e: any) => {
    const searchWord = e;
    filteredVms = handleSearch(searchWord);

    //console.log(typeof filteredVms);
    if (filteredVms.length <= itemsperPage) {
      // If filtered items are less than or equal to itemsperPage, set currentPage to 0
      setCurrentPage(0);
    } else {
      // Otherwise, keep the current page as is (e.g., when navigating from page 2 to page 1)
      setCurrentPage(currentPage);
    }
    setFilteredData(filteredVms);
  };
  /**
   * End of Search
   */
  const activeStatus = 1;

  return (
    <>
      <Navbar
        inputChange={(e: any) => handleChange(e)}
        allData={isInstanceValue}
        activeStatus={activeStatus}
      />
      {/* dashboard */}
      {/* OverView */}

      <div className="my-5 mx-3 bg-white">
        <div className="p-4">Overview </div>
        <div className="grid  grid-cols-2 lg:grid-cols-4 gap-2  lg:gap-10 xl:gap-20  p-4 ">
          <div className="">
            <div className="bg-[#FFE2E5] flex flex-col  p-3 gap-3 rounded-2xl h-32 sm:h-full justify-between">
              <div className="flex flex-row md:flex-col gap-3 justify-between">
                <div>
                  <Image src={TotalInstance} alt="totalInstance" />
                </div>
                <div className="text-[#151D48] text-[24px] font-[600] order-first md:order-last ">
                  {totalInstances}
                </div>
              </div>
              <div className="text-[#425166] font-[500] text-[14px]">
                Total Instances
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#DCFCE7] flex flex-col  p-3 gap-3 rounded-2xl h-32 sm:h-full justify-between">
              <div className="flex flex-row md:flex-col gap-3 justify-between">
                <div>
                  <Image src={Complianticon} alt="totalInstance" />
                </div>
                <div className="text-[#151D48] text-[24px] font-[600] order-first md:order-last ">
                  {countCompliant}
                </div>
              </div>
              <div className="text-[#425166] font-[500] text-[14px]">
                Compliant
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#FFF4DE] flex flex-col  p-3 gap-3 rounded-2xl h-32 sm:h-full justify-between">
              <div className="flex flex-row md:flex-col gap-3 justify-between">
                <div>
                  <Image src={NonCompliant} alt="totalInstacne" />
                </div>
                <div className="text-[#151D48] text-[24px] font-[600] order-first md:order-last ">
                  {countNonCompliant}
                </div>
              </div>
              <div className="text-[#425166] font-[500] text-[14px]">
                Non Compliant
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#F3E8FF] flex flex-col  p-3 gap-3 rounded-2xl h-32 sm:h-full justify-between">
              <div className="flex flex-row md:flex-col gap-3 justify-between">
                <div>
                  <Image src={ActiveInstancesicon} alt="totalInstacne" />
                </div>
                <div className="text-[#151D48] text-[24px] font-[600] order-first md:order-last ">
                  {countActiveInstance}
                </div>
              </div>
              <div className="text-[#425166] font-[500] text-[14px]">
                Active Instances
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mx-3 p-5">
        <div className="flex justify-between text-[16px] font-[500]">
          <div>Recent Instances</div>

          {showAll ? (
            <div className="text-blue-800 text-xs font-medium leading-none">
              <button onClick={handleViewAll} className="py-2">
                Show Less
              </button>
            </div>
          ) : (
            <div className="text-blue-800 text-xs font-medium leading-none">
              <button onClick={handleViewAll} className="py-2">
                View All
              </button>
            </div>
          )}
        </div>

        <div className="lg:w-full overflow-x-auto" id={styles.table}>
          <table className="w-full table-auto" id={styles.tableborder}>
            <thead>
              <tr className="bg-slate-100">
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  S.No
                </th>
                {/* <th className="text-violet-950 text-sm font-medium py-2 px-8 text-center whitespace-nowrap">
                                    <div className="flex items-center text-center">
                                        <span>Instance ID</span>
                                        <div onClick={() => handleSort('instanceId')} className="ml-2 cursor-pointer inline-block">
                                            <LuChevronsUpDown />
                                        </div>
                                    </div>
                                </th> */}
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  Instance Name
                </th>
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  Status
                </th>
                {/* <th className="text-violet-950 text-sm font-medium py-2 px-8 text-center whitespace-nowrap">
                                    <div className="flex items-center text-center whitespace-nowrap">
                                        <span>Created On</span>
                                        <button onClick={() => handleSort('Createdon')} className="ml-2 text-center">
                                            <LuChevronsUpDown />
                                        </button>
                                    </div>
                                </th> */}
                {/* <th className="text-violet-950 text-sm font-medium py-2 px-4 text-left">Created On</th> */}
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  Cloud Type
                </th>
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  VM Type
                </th>
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  OS
                </th>
                {/* <th className="text-violet-950 text-sm font-medium py-2 px-8 text-left whitespace-nowrap">OS Type</th> */}
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  Environment
                </th>
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  Location
                </th>
                {/* <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">Project</th> */}
                {/* <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">Zones</th> */}
                <th className="text-violet-950 text-sm font-medium py-2 px-12 text-center whitespace-nowrap">
                  Compliant Status
                </th>
              </tr>
            </thead>

            <tbody>
              {/* {prismaValue.map((data:any)=>( */}
              {vmList
                .slice(0, showAll ? totalInstances : initialItemsToShow)
                .map((instance: Instances, index: number) => (
                  <tr key={index} className="bg-gray-100">
                    <td className="px-12 py-2 text-center text-sm font-normal whitespace-nowrap">
                      {++index}
                    </td>
                    <td className="px-12 py-2 text-center text-sm font-normal whitespace-nowrap">
                      {instance.instance_name}
                    </td>
                    <td
                      className={`px-12 py-2 text-center text-sm font-normal whitespace-nowrap
                                                        ${
                                                          instance.status ===
                                                          "running"
                                                            ? "text-green-600"
                                                            : ++countNonCompliant &&
                                                              "text-red-500"
                                                        }`}
                    >
                      {instance.status}{" "}
                      {/* Add the status text inside the td element */}
                    </td>
                    <td className="px-12 py-2 text-center text-sm font-normal whitespace-nowrap">
                      <div className="flex items-center  whitespace-nowrap">
                        <Image
                          src={
                            instance.cloud?.toLocaleLowerCase() === "az"
                              ? azure
                              : aws
                          }
                          alt="vm image"
                          height={25}
                          width={25}
                        />
                        <span className="ml-2">{instance.cloud}</span>
                      </div>
                    </td>

                    <td className="px-12 py-2 text-center text-sm font-normal whitespace-nowrap">
                      {instance.vm_type}
                    </td>
                    <td className="px-12 py-2 text-center text-sm font-normal whitespace-nowrap">
                      <div className="flex items-center whitespace-nowrap">
                        <Image
                          src={
                            instance.os?.toLocaleLowerCase() === "windows"
                              ? windows
                              : instance.os?.toLocaleLowerCase() ===
                                "red hat enterprise linux with high availability"
                              ? redhat
                              : linux
                          }
                          alt="os image"
                          width={25}
                          height={25}
                        />
                        <span className="ml-2">{instance.os}</span>
                      </div>
                    </td>
                    <td className="px-12 py-2 text-center text-sm font-normal whitespace-nowrap">
                      {instance.environment}
                    </td>
                    <td className="px-12 py-2 text-center text-sm font-normal whitespace-nowrap">
                      {instance.location}
                    </td>

                    <td className="px-12 py-2 text-center">
                      <div className="flex items-center">
                        <div
                          className="bg-stone-400 h-2.5 mx-2"
                          style={{ width: "100%" }}
                        >
                          <div className="flex justify-between h-full ">
                            {Array.from({ length: 5 }, (v, i) => {
                              let emojiColor = "bg-grey-500";
                              let emoji;
                              switch (instance.complianceStatus) {
                                case 1:
                                  emojiColor =
                                    i === 0 ? "bg-red-500" : "bg-grey-500";
                                  emoji = i < 1 ? <FaRegAngry /> : null;
                                  break;
                                case 2:
                                  emojiColor =
                                    i < 2 ? "bg-orange-500" : "bg-grey-500";
                                  emoji = i < 2 ? <FaRegFrownOpen /> : null;
                                  break;
                                case 3:
                                  emojiColor =
                                    i < 3 ? "bg-yellow-500" : "bg-grey-500";
                                  emoji = i < 3 ? <BsEmojiNeutral /> : null;
                                  break;
                                case 4:
                                  emojiColor =
                                    i < 4 ? "bg-lime-500" : "bg-grey-500";
                                  emoji = i < 4 ? <FaRegSmile /> : null;
                                  break;
                                case 5:
                                  emojiColor =
                                    i < 5 ? "bg-green-500" : "bg-grey-500";
                                  emoji = i < 5 ? <FaRegSmileBeam /> : null;
                                  break;

                                default:
                                  emojiColor = "bg-grey-500";
                                  emoji = null;
                              }
                              return (
                                <div
                                  key={i}
                                  className={`w-2/5 h-full ${emojiColor}`} /* border-r-2 */
                                ></div>
                              );
                            })}
                          </div>
                        </div>
                        {/* Display the emoji */}
                        {instance.complianceStatus === 1 && (
                          <FaRegAngry style={{ color: "#b91c1c", fontSize:"20px" }} />
                        )}
                        {instance.complianceStatus === 2 && (
                          <FaRegFrownOpen style={{ color: "#f97316", fontSize:"20px" }} />
                        )}
                        {instance.complianceStatus === 3 && (
                          <BsEmojiNeutral style={{ color: "#f59e0b", fontSize:"20px" }} />
                        )}
                        {instance.complianceStatus === 4 && (
                          <FaRegSmile style={{ color: "#84cc16", fontSize:"20px" }} />
                        )}
                        {instance.complianceStatus === 5 && (
                          <FaRegSmileBeam style={{ color: "#22c55e" , fontSize:"20px"}} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center  mt-4">
          <ReactPaginate
            previousLabel={<FcPrevious className=" text-gray-600" />}
            nextLabel={<FcNext className=" text-gray-600" />}
            breakLabel={
              <span className="w-5 px-2 py-1 text-center leading-5 rounded-md">
                ...
              </span>
            }
            breakClassName="flex items-center justify-center space-x-2"
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName="flex items-center space-x-2"
            activeClassName="text-white bg-blue-600 rounded-md"
            previousClassName={`flex items-center justify-center text-sm text-gray-600 rounded-full ${
              isFirstPage ? "disabled" : "bg-white" // Add cursor not allowed style when on the first page
            }`}
            nextClassName={`flex items-center justify-center text-sm text-gray-600 rounded-full ${
              isLastPage ? "disabled" : "bg-white" // Add cursor not allowed style when on the last page
            }`}
            pageClassName="flex items-center justify-center text-sm text-gray-600  rounded-full"
            pageLinkClassName="w-full h-full px-2 py-1 text-center leading-5"
            disabledClassName="cursor-not-allowed opacity-50 pointer-events-none" // Style for disabled buttons
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
