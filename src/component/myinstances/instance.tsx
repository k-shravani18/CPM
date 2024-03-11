"use client";
import React, { useState } from "react";
import Inactiveinstancedetails from "./inactiveinstancedetails";
import style from "./styles.module.css";
import { BiPlayCircle } from "react-icons/bi";
import Navbar from "../navbar/NavBar";
import { useRouter } from "next/navigation";
import Vmdetails from "./vmdetails";
import { Instances } from "@/utils/type";
import {
  reduceFunction,
  removeDuplicates,
  transformedDataToOriginalStructure,
} from "@/utils/common";

interface InstanceDetailsProps {
  isInstances: any;
  setSelectedItems: any; // passed it from vmdetails
}
/**
 * This component is the entry point to /myInstance route
 * @prop isInstances this is the instance data retrieved from mongoDb through Prisma
 */
const Instance = ({ isInstances }: InstanceDetailsProps) => {
  const [instance, setInstance] = useState(0);
  const [cloudValue, setCloudValue] = useState("");
  const [applicationValue, setApplicationValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const vmdetails: Instances[] = removeDuplicates(reduceFunction(isInstances));
  const [selectedItems, setSelectedItems] = useState<Instances[]>([]);

  /*  const vmdetails: Instances[] = isInstances.reduce(
    (result: Instances[], currentData: DataItem) => {
      const instances: any = currentData.instances.map((data: Instances) => {
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
          applicationname: data.applicationname
        };
      });
      result = result.concat(instances);
      return result;
    },
    []
  ); */

  const [filteredData, setFilteredData] = useState<Instances[]>(vmdetails);
  const applicationName = filteredData.map(
    (data: any, index: number) => data.applicationname
  );
  const uniqueApplicationType = [...new Set(applicationName)];
  const clouds = filteredData.map((data: any, index: number) => data.cloud);

  const uniqueCloudsType = [...new Set(clouds)];
  const handleInstanceSelection = (instanceId: string) => {
    console.log(instanceId);
  };

  console.log(selectedItems);

  /* changes code */
  const selectInstaceWholeDeatils = (selectedItems: Instances[]) => {
    console.log("Selected data", selectedItems);
    const awsInstances = selectedItems.filter((e) => e.cloud === "aws");
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>AWS RAW INSTANCES>>>>>>>>>>>>>>>>>>>>>>"
    );
    console.log(awsInstances);
    const azureInstances = selectedItems.filter((e) => e.cloud === "AZ");
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>AZURE RAW INSTANCES>>>>>>>>>>>>>>>>>>>>>>"
    );
    console.log(azureInstances);
    // Perform any actions with the selected data in the Instance component

    if (azureInstances.length > 0) {
      const transformedAzureData =
        transformedDataToOriginalStructure(azureInstances);
      console.log(transformedAzureData);
    }
    if (awsInstances.length > 0) {
      const transformedAWSData =
        transformedDataToOriginalStructure(awsInstances);
      console.log(transformedAWSData);
    }
   
  };

  const instanceDetails = [
    {
      instanceDet: (
        <Vmdetails
          isInstanceValue={isInstances}
          cloudValue={cloudValue}
          applicationValue={applicationValue}
          onInstanceSelect={handleInstanceSelection}
          setSelectedItems={setSelectedItems}
        />
      ),
    },
    {
      instanceDet: (
        <Inactiveinstancedetails
          isInstanceValue={isInstances}
          searchValue={searchValue}
          setSelectedItems={setSelectedItems}
        />
      ),
    },
  ];

  const router = useRouter();

  const isUser = sessionStorage.getItem("isUser") === "true";
  const access_token = sessionStorage.getItem("access_token");

  if (access_token && isUser) {
    router.push("/dashboard");
    return <p>Forbidden...</p>;
  }

  const handleCloudChange = (value: any) => {
    setCloudValue(value);
  };
  // console.log(cloudValue)
  const handleApplicationChange = (value: any) => {
    setApplicationValue(value);
  };
  //console.log(applicationValue);
  const handleChange = (value: any) => {
    setSearchValue(value);
  };

  return (
    <div
      className={`${style.banner} bg-neutral-200  h-full lg:h-[100vh]  w-full`}
    >
      <Navbar
        activeStatus={instance}
        allData={isInstances}
        handleCloudChange={handleCloudChange}
        handleApplicationChange={handleApplicationChange}
        inputChange={(e: any) => handleChange(e)}
      />

      <div className="flex my-10 mx-5 justify-between">
        <div className="flex">
          <div
            className={`px-5 py-3 rounded-tl-lg rounded-tr-lg rounded-b-none ${
              instance === 0 ? "bg-[#B01F24] text-white" : "bg-[none]"
            }`}
          >
            <button
              className="text-[12px] md:text-[16px]"
              onClick={() => setInstance(0)}
            >
              Active Instances
            </button>
          </div>
          <div
            className={`px-5 py-3  rounded-tl-lg rounded-tr-lg rounded-b-none  ${
              instance === 1 ? "bg-[#B01F24] text-white " : "bg-[none]"
            }`}
          >
            <button
              className="text-[12px] md:text-[16px] "
              onClick={() => setInstance(1)}
            >
              Inactive Instances
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-2">
            {/* <input
              type="checkbox"
              id="checkall"
              className="h-5 w-5  border-2  border-[#A3A3A3]"
            /> */}

            <div className="bg-[#B01F24] text-white px-5 py-3  border border-1 rounded-md  text-[15px] ">
              <button
                className="flex  items-center gap-2"
                onClick={() => selectInstaceWholeDeatils(selectedItems)}
              >
                {" "}
                <div>Run Checks </div>{" "}
                <BiPlayCircle size={30} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <div className="flex flex-col gap-3 justify-center  px-5">
          {/* <div className="w-[100%]">
            <select
              id="orgination"
              className="border border-1 focus:outline-none rounded-md h-10  w-full"
            >
              <option value="">select orgination</option>
              <option value="">aditybirla</option>
              <option value="">prodevans</option>
            </select>
          </div> */}
          <div className="w-[100%]">
            <select
              id="cloud"
              className="border border-1 focus:outline-none rounded-md h-10  w-full"
              onChange={(e) => handleCloudChange(e.target.value)}
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
              className="border border-1 focus:outline-none rounded-md h-10  w-full"
              onChange={(e) => handleApplicationChange(e.target.value)}
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
      </div>

      <div className="block md:hidden my-5">
        <div className="flex items-center gap-2 justify-center">
          {/* <input
            type="checkbox"
            id="checkall"
            className="h-5 w-5  border-2  border-[#A3A3A3]"
          /> */}
          <div className="bg-[#B01F24] text-white px-5 py-3  border border-1 rounded-md  ">
            <button
              className="flex  items-center gap-2"
              onClick={() => selectInstaceWholeDeatils(selectedItems)}
            >
              {" "}
              <div>Run Checks </div>{" "}
              <BiPlayCircle size={30} className="text-black" />
            </button>
          </div>
        </div>
      </div>
      <div className="my-5 mx-5">{instanceDetails[instance].instanceDet}</div>
    </div>
  );
};

export default Instance;
