import React, { useEffect, useState } from "react";
import { Instances } from "@/utils/type";
import { reduceFunction, removeDuplicates } from "@/utils/common";
import Link from 'next/link';
interface InstanceDetailsProps {
  isInstanceValue: any;
  cloudValue: any;
  applicationValue: any;
  onInstanceSelect:any; // passing value from this to instance.tsx file 
 // selectInstaceWholeDeatils: any;
 setSelectedItems: (items: Instances[]) => void;
}

const Vmdetails = ({
  isInstanceValue,
  cloudValue,
  applicationValue, onInstanceSelect,setSelectedItems// selectInstaceWholeDeatils
}: InstanceDetailsProps) => {
  const sortedItems = [...isInstanceValue];
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItems, setSelectedItemsLocal]= useState<Instances[]>([]);
  //console.log(currentPage);
  /*   const vmdetails: Instances[] = sortedItems.reduce(
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
          applicationname: data.applicationname,
        };
      });
      result = result.concat(instances);
      return result;
    },
    []
  ); */
    /**
   * Select the items
   * @param instance
   */
    const onInstanceSelectItem = (instance: Instances) => {
      setSelectedItemsLocal(prevSelectedItems => {
          const index = prevSelectedItems.findIndex(item => item.instance_id === instance.instance_id);
          if (index !== -1) {
              // If already selected, remove the instance object from the array
              const updatedItems = [...prevSelectedItems];
              updatedItems.splice(index, 1);
              return updatedItems;
          } else {
              // If not selected, add the instance object to the array
              return [...prevSelectedItems, instance];
          }
      });

  };
  useEffect(() => {
    setSelectedItems(selectedItems); // Update the parent component's state after local state changes
  }, [selectedItems, setSelectedItems]);

  console.log(selectedItems);
  
  //console.log("------",selectedItems);
  
  
  
    // console.log(selectedItems);
    //console.log('-----------------------------------');
   // console.log(selectedItems);
    //console.log(typeof selectedItems);
   
    //selectInstaceWholeDeatils(selectedItems)
  
  
  
  
  
  const vmdetails: Instances[] = removeDuplicates(reduceFunction(sortedItems));
  const [filteredData, setFilteredData] = useState<Instances[]>(vmdetails);
  //console.log(filteredData);
  /* const itemsperPage = 5;
  const totalInstances = filteredData.length;
  const startIndex = currentPage * itemsperPage;
  const endIndex = Math.min(startIndex + itemsperPage, totalInstances);
  const vmList = filteredData.slice(startIndex, endIndex); */

  /*  const handleSearch = (searchWord: string) => {
    // console.log("handleSearch: " + searchWord);
      const filteredEvents = vmdetails.filter((vms) => {
        return vms.location
          .toLowerCase()
          .match(searchWord.toLocaleLowerCase());
      });
      return filteredEvents;
    };
  */
  //Applying our search filter function to our array of countries recieved from the API
  // var filteredVms;

  //Handling the input on our search bar
  //useEffect(() => {
  const handleChange = () => {
    const filteredVms = vmdetails.filter((vm) => {
      //console.log("vm.cloud", vm.cloud);
      const cloudMatchValue = vm.cloud || "";
      const cloudMatch = cloudMatchValue
        .toLowerCase()
        .includes(cloudValue.toLowerCase());
      const applicationMatchValue = vm.applicationname || "";
      const applicationMatch = applicationMatchValue
        .toLowerCase()
        .includes(applicationValue.toLowerCase());
      // You need to define how applicationValue is related to the data structure.
      // For example: const applicationMatch = vm.application.toLowerCase().includes(applicationValue.toLowerCase());

      // Combine the filters with logical AND (&&) to apply all three criteria.
      return cloudMatch && applicationMatch;
    });

    setFilteredData(filteredVms);
  };
  //console.log(filteredData);
  useEffect(() => {
    handleChange(); // Call handleChange here
  }, [cloudValue, applicationValue]); //
 
 /*  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const onInstanceSelectItem = (instanceId: any) => {
    setSelectedItems(prevSelectedItems => {
      // Check if the instanceId is already selected
      const index = prevSelectedItems.indexOf(instanceId);
      if (index !== -1) {
        // If already selected, remove it from the array
        return prevSelectedItems.filter(id => id !== instanceId);
      } else {
        // If not selected, add it to the array
        return [...prevSelectedItems, instanceId];
      }
    });
  };
  console.log("Selected Items:", selectedItems); */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {filteredData.map((instance: Instances, index: number) =>
        instance.status === "running" ? (
          <div
            key={index}
            className={`bg-white p-2 rounded-lg border-l-4  border-[#5BCF7B]  cursor-pointer ${
              instance.status === "running"
                ? "border-[#5BCF7B]"
                : "border-[#B01F24]"
            } h-[230px]`} onClick={() => onInstanceSelectItem(instance)} /*  onClick={() => onInstanceSelect(instance.instance_id)} */
          >
            <div className="flex flex-col gap-">
              <input
                type="checkbox"
                id="checkall"
                className="h-5 w-5  border-2  border-[#A3A3A3] cursor-pointer"
              />
            </div>
            <div className="text-[18px] text-[#B01F24] font-[500] ">
              <Link href={`/instanceDetails/${instance.instance_id}`}>{instance.instance_name}</Link>
            </div>
            <div>
              <span className="font-[400] text-[12px] text-[#6B6B6B]">
                Application Name :
              </span>{" "}
              <span className="font-[500] text-[14px] text-[#5E5E5E]">
                {instance.applicationname}
              </span>
            </div>
            <div>
              <span className="font-[400] text-[12px] text-[#6B6B6B]">
                Region :
              </span>{" "}
              <span className="font-[500] text-[14px] text-[#5E5E5E]">
                {instance.location}
              </span>
            </div>
            <div>
              <span className="font-[400] text-[12px] text-[#6B6B6B]">
                Type :{" "}
              </span>{" "}
              <span className="font-[500] text-[14px] text-[#5E5E5E]">
                {instance.os}
              </span>
            </div>
            <div>
              <span className="font-[400] text-[12px] text-[#6B6B6B]">
                Status :{" "}
              </span>{" "}
              <span className="font-[500] text-[14px] text-[#5E5E5E]">
                {instance.status}
              </span>
            </div>
            <div>
              <span className="font-[400] text-[12px] text-[#6B6B6B]">
                Cloud Type :{" "}
              </span>{" "}
              <span className="font-[500] text-[14px] text-[#5E5E5E]">
                {instance.cloud}
              </span>
            </div>
            <div>
              <span className="font-[400] text-[12px] text-[#6B6B6B]">
                Created On :{" "}
              </span>{" "}
              <span className="font-[500] text-[14px] text-[#5E5E5E]">
                {instance.time_stamp}
              </span>
            </div>
            <div>
              <span className="font-[400] text-[12px] text-[#6B6B6B]">
                IP Address:{" "}
              </span>{" "}
              <span className="font-[500] text-[14px] text-[#5E5E5E]">
                {instance.private_ip}
              </span>
            </div>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Vmdetails;
