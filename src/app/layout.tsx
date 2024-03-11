import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ConditionalRender from '@/component/conditionalRender/ConditionalRenderer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Font optimization for Inter. All font weights are working like (300, 400, 600, 800, 900)
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template:'CPM | %s' ,
    default:'CPM'
  },
  description: 'aditya birla comp',
}


// Root page or parent component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <head><link rel='icon' href='/ABG_log.svg' /></head>
      <body className={inter.className}>
       
          <ConditionalRender>
            {children}
            <ToastContainer />
          </ConditionalRender>
       
      </body>
    </html>
  );
}