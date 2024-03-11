//import Instances from '@/component/myinstances/instances';
import React from 'react'
import { getInstance } from '../../../prisma/Instances';
import Instance from '@/component/myinstances/instance';
import { Metadata } from 'next'
import { transformData } from '@/utils/common';

export const metadata: Metadata = {
  title: 'Instances'
}

const Page = async () => {
  const data = await getInstance();
  const transformedData = transformData(data);

  return (
  
      <Instance isInstances={transformedData} setSelectedItems={undefined} />
   


  );
};

export default Page;