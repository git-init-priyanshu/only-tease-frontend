'use client';
import { Drawer } from '@mui/material';
import React from 'react';

import useWindowSize from '@/hooks/useWindowSize';

import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header';
import SideBar from '@/components/ui/sideBar';

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  const windowSize = useWindowSize();

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className='flex items-start h-full w-full justify-between'>
        {windowSize.width <= 1090 ?
          <Drawer open={isOpen} onClose={toggleDrawer}>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          </Drawer>
          :
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        }
        <div className='w-full min-h-screen h-full'>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className='h-[100px]' />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientComponent;

{/* <Headers isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='  flex  mt-28  '>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        {children}
      </div> */}
