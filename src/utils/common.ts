import Instance from "@/component/myinstances/instance";
import { DataItem, Instances } from "./type";

export const transformData = (data: any) => {
  return data.map(
    (item: {
      instances: { [s: string]: unknown } | ArrayLike<unknown> | null;
      id: any;
      cloud: any;
      time_stamp: any;
    }) => {
      if (
        item.instances !== null &&
        typeof item.instances === "object" &&
        !Array.isArray(item.instances)
      ) {
        const instances = Object.values(item.instances);
        return {
          instances,
          id: item.id,
          cloud: item.cloud,
          time_stamp: item.time_stamp,
        };
      } else {
        return {
          instances: [],
          id: item.id,
          cloud: item.cloud,
          time_stamp: item.time_stamp,
        };
      }
    }
  );
};

export const reduceFunction = (sortedItems: any) => {
  return sortedItems.reduce((result: Instances[], currentData: DataItem) => {
    const instances: any = currentData.instances.map((data: Instances) => {
      return {
        time_stamp: currentData.time_stamp,
        id:currentData.id,
        cloud: currentData.cloud,
        instance_id: data.instance_id,
        private_ip:data.private_ip,
        instance_name: data.instance_name,
        status: data.status,
        vm_type: data.vm_type,
        os: data.os,
        environment: data.environment,
        location: data.location,
        applicationname: data.applicationname,
        complianceStatus: [
          data.crodwstrike_service_status !== null ? true : false,
          data.nxlog_validate !== null ? true : false,
          data.ntp_validate !== null ? true : false,
          data.site_24x7 !== null ? true : false,
          data.zabix_agent !== null ? true : false,
        ].filter((bool) => bool === true).length,
      };
    });
    result = result.concat(instances);
    return result;
  }, []);
};

export const removeDuplicates = (records: any) => {
  const uniqueRecords: any[] = [];
  records.forEach((record: any) => {
    const duplicateIndex = uniqueRecords.findIndex(
      (r: any) =>
        r.time_stamp === record.time_stamp &&
        r.cloud === record.cloud &&
        r.instance_id === record.instance_id
    );

    if (duplicateIndex === -1) {
      uniqueRecords.push(record);
    } else {       
      uniqueRecords[duplicateIndex] = record;
    }
  });

  return uniqueRecords;
};


export const transformedDataToOriginalStructure = (instances:any[]) => {
   
  return instances.reduce((acc:any, instance:any) => {
      const { instance_name, instance_id, location, vm_type, status, applicationname, environment, os , cloud} = instance;
      acc.instances[instance_name] = {
        instance_name,
        instance_id,
        ansible_host: "", 
        vpc_id: "", 
        subnet_id: "", 
        image_id: "", 
        key_name: "", 
        location,
        vm_type,
        status,
        applicationname,
        applicationonwer: "", 
        environment,
        business: "", 
        os,
        crodwstrike_service_status: null,
        ntp_validate: null,
        nxlog_validate: null,
        site_24_7: null,           zabix_agent: null
      };
       acc.cloud = cloud;
     
      return acc;
    }, { instances: {}, cloud: instances[0].cloud, time_stamp: instances[0].time_stamp });
}




