'use client';
import React from 'react';

import Header from '@/components/ui/header';
import SideBar from '@/components/ui/sideBar';


const ClientComponent = ({ children }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (

    <div className='flex items-start h-full w-full justify-between'>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='w-full min-h-screen h-full'>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='h-[100px]' />
        {children}
      </div>
    </div>
  );
};

export default ClientComponent;

{/* <Headers isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='  flex  mt-28  '>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        {children}
      </div> */}