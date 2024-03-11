import React from "react";
import { getInstance } from "../../../prisma/Instances";
import { Metadata } from "next";
import Dashboard from "@/component/dashboard/dashboard";

import { transformData } from "@/utils/common";

export const metadata: Metadata = {
  title: "Dashboard",
};
const Page = async () => {
  const data = await getInstance();
  
  const transformedData = transformData(data);

  return <Dashboard isInstanceValue={transformedData} />;
};

export default Page;
