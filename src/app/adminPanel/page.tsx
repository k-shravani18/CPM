import Paneldata from '@/component/adminpanel/paneldata';
import React from 'react'
import { Metadata } from 'next'
import { getInstance } from '../../../prisma/Instances';
import { transformData } from '@/utils/common';

export const metadata: Metadata = {
  title: 'Admin Panel'
}
const Page = async () => {
  const data = await getInstance()
  const transformedData = transformData(data);
  return (
    
    <Paneldata isInstanceValue={transformedData} />
    

  );
};

export default Page;