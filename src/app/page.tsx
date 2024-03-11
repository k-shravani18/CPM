import Login from '../component/login/login'
import React from 'react'
import startServer from './server';
import MessageSenderPage from '@/component/MessageSenderPage';
import KafkaMessages from '@/component/KafkaMessages';


//import Dashboard from '@/component/Dashboard/Dashboard'
//import { getInstance } from '../../prisma/Instances';
startServer();
export default async function Home() {

 // const data = await getInstance();  
  return (
    <>
      <Login/> {/* isInstanceValue={data} isSuccess={false} */}
      <KafkaMessages/>
      <MessageSenderPage />
    
    </>
  )
}