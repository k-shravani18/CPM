import { getInstance } from "../../prisma/Instances";

// Define the type for DashboardData
interface Tags {
  environment: string;
  location: string;
  project: string;
  zones: string;
}

interface InstanceImages {
  offer: string;
}

export interface Instances {
 // complianceStatus: number;
  cloud?: string
  time_stamp?: string
  applicationname: String,
  applicationonwer: String,
  applicationowner: String,
  business: String,
  environment: String,
  image_id?: String,
  instance_id: String,
  instance_name: String,
  key_name?: String,
  location: String,
  offer?: String,
  os: String,
  private_ip: String,
  publisher: String,
  sku?: String,
  status: String,
  subnet_id?: String,
  version?: String,
  vm_size: String,
  vm_type: String,
  vpc_id?: String,
  //Compliance Status
  complianceStatus?:number,
  nxlog_validate?:string,
  site_24x7?:string,
  zabix_agent?:string,
  crodwstrike_service_status?:string,
  ntp_validate?:string
}




export interface DataItem {
  id: string;
  cloud: string;
  time_stamp: string;
  instances: Instances[];
}

interface DashboardProps {
  isSuccess: boolean;
  isInstanceValue: any;
}

export const vmData = getInstance();
