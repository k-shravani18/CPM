import React, { useEffect, useState } from 'react'
import { DataItem, Instances } from '@/utils/type';
import { reduceFunction, removeDuplicates } from '@/utils/common';


interface InstanceDetailsProps {
  isInstanceValue: any;
  searchValue: any;
  setSelectedItems: (items: Instances[]) => void;
}


interface NavbarProps {
  instanceName: string;
}


const Inactiveinstancedetails = ({ isInstanceValue, searchValue, setSelectedItems/* ,  organizationValue, cloudValue, applicationValue */ }: InstanceDetailsProps, { instanceName }: NavbarProps) => {
 

  const sortedItems = [...isInstanceValue]
  const [currentPage, setCurrentPage] = useState(0);

  const vmdetails: Instances[] = removeDuplicates(reduceFunction(sortedItems));
 /*  const vmdetails: Instances[] = sortedItems.reduce((result: Instances[], currentData: DataItem) => {
    const instances:any = currentData.instances.map((data: Instances) => {
      return {
        time_stamp: currentData.time_stamp,
        cloud: currentData.cloud,
        instance_id: data.instance_id,
        instance_name: data.instance_name,
        status: data.status,
        vm_type: data.vm_type,
        os: data.os,
        environment: data.environment,
        location: data.location
      }
    })
    result = result.concat(instances)
    return result
  }, []) */


  const [filteredData, setFilteredData] = useState<Instances[]>(vmdetails)
  const [selectedItems, setSelectedItemsLocal]= useState<Instances[]>([]);



  const handleSearch = (searchWord: string) => {
    //console.log("handleSearch: " + searchWord)
    const filteredEvents = vmdetails.filter((vms) => {
      return (vms.instance_name.toLowerCase().match(searchWord.toLocaleLowerCase()) || 
      vms.status.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.os.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.environment.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.location.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
        vms.status.toLowerCase().match(searchWord.toLocaleLowerCase()) ||
      vms.applicationname.toLowerCase().match(searchWord.toLocaleLowerCase()))


    })
    //console.log("filteredEvents", filteredEvents);
    return filteredEvents
  }
 

  //Applying our search filter function to our array of countries recieved from the API
  var filteredVms;


   //Handling the input on our search bar
  const handleChange = (searchValue: any) => {
    const searchWord = searchValue;
    console.log("searchWord: " + searchWord)
    filteredVms = handleSearch(searchWord)
    setFilteredData(filteredVms)
  }
  
 useEffect(() => {
  handleChange(searchValue); 
}, [searchValue]);  

   


  const [isLoading, setIsLoading] = useState(true);


  // Simulate loading by setting isLoading to false after a delay (you can replace this with your actual loading logic)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the delay as needed
  }, []);
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


  return (
   
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {filteredData.map((instance: Instances, index: number) => (
          
          (instance.status !== 'running') ?
          <div key={index} className={`bg-white p-2 rounded-lg border-l-4  border-[#5BCF7B]  cursor-pointer ${instance.status === 'running' ? 'border-[#5BCF7B]' : 'border-[#B01F24]'} h-[230px]`} onClick={() => onInstanceSelectItem(instance)}>
            <div className='flex flex-col gap-'>
              <input type="checkbox" id='checkall' className='h-5 w-5  border-2  border-[#A3A3A3] cursor-pointer' />
            </div>
            <div className='text-[18px] text-[#B01F24] font-[500] '>
              {instance.instance_name}
            </div>
            
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Application Name :</span>  <span className='font-[500] text-[14px] text-[#5E5E5E]'>{instance.applicationname}</span>
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Region :</span>  <span className='font-[500] text-[14px] text-[#5E5E5E]'>{instance.location}</span>
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Type : </span> <span className='font-[500] text-[14px] text-[#5E5E5E]'>{instance.os}</span>
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Status : </span> <span className='font-[500] text-[14px] text-[#5E5E5E]'>{instance.status}</span>
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Cloud : </span><span className='font-[500] text-[14px] text-[#5E5E5E]'>{instance.cloud}</span>
            
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>Created On : </span> <span className='font-[500] text-[14px] text-[#5E5E5E]'>{instance.time_stamp}</span>
            </div>
            <div>
              <span className='font-[400] text-[12px] text-[#6B6B6B]'>IP Address : </span> <span className='font-[500] text-[14px] text-[#5E5E5E]'>{instance.private_ip}</span>
            </div>
          </div>
          : ''
        ))}


      </div>
    </div>
  )
}


export default Inactiveinstancedetails




