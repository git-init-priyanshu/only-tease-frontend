'use client';

import React from 'react';

import useFetchUserDetails from '@/hooks/user/useFetchUserDetails';

import FeedCard from '@/app/(main)/profile/(components)/feddCard';

type props = {
  modelData: {
    id: number;
    slug: string;
    name: string;
    icon: any;
    image: any;
    value: number;
    views: number;
    likes: number;
    location: string;
    index: number;
    posts: number;
  };
  modelFees: number;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  isUnlocked: boolean;
};

const ModelFeed = ({
  modelData,
  modelFees,
  isUnlocked,
  setIsUnlocked,
}: props) => {

  return (
    <div className='w-full '>
      <div className='bg-white border border-[#9A3CFFB2] rounded-md p-[0.8px] h-fit w-full  '>
        <div className=' flex flex-col items-center rounded-md  gap-1 to-[99%] '>
          <section className=' w-full    flex   bg- justify-around h-12 items-center   '>
            <div className='border-b-4 text-[#fb0393] border-[#fb0393] p-1 rounded-md transition-all ease-in-out duration-100 cursor-pointer'>
              Posts
            </div>
            <div className=' p-1 rounded-md text-[#49454F] transition-all ease-in-out duration-100 cursor-pointer'>
              Media
            </div>
          </section>
          <div className=' flex justify-between w-full px-10 text-lg text-[#CEB9E9] '>
            <span className='text-[#49454F]'>Latest post</span>
            <span className='text-[#49454F]'>4 hrs ago</span>
          </div>
          <FeedCard
            {...modelData}
            modelFees={modelFees}
            setIsUnlocked={setIsUnlocked}
            isUnlocked={isUnlocked}
          />
          <FeedCard
            {...modelData}
            modelFees={modelFees}
            setIsUnlocked={setIsUnlocked}
            isUnlocked={isUnlocked}
          />
          <FeedCard
            {...modelData}
            modelFees={modelFees}
            setIsUnlocked={setIsUnlocked}
            isUnlocked={isUnlocked}
          />
          <FeedCard
            {...modelData}
            modelFees={modelFees}
            setIsUnlocked={setIsUnlocked}
            isUnlocked={isUnlocked}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelFeed;
