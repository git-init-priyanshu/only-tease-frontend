'use client';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

import ModelCard from '@/components/ui/modelCard';

import { IndianModelCardData, modelCardData } from '@/utils/modelData';
type Props = {
  params: {
    feed: string;
  };
};

const CreatorsPage = () => {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") ?? "global"
  return (
    <div className='w-fit max-w-[90%] lg:max-w-[90%] mx-auto my-8'>
      {type === "indian" ?
        <>
          <p className='text-[#0051FE] underline text-2xl my-3 pl-4 font-semibold'> Indian Creators</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5 gap-6 place-content-center'>
            {IndianModelCardData.map((item, index) => (
              <React.Fragment key={index}>
                <ModelCard {...item} index={index + 1} />
              </React.Fragment>
            ))}
          </div>
        </>
        : <>
          <p className='text-[#0051FE] underline text-2xl my-3 pl-4 font-semibold'> Global Creators</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5 gap-6 place-content-center'>
            {modelCardData.map((item, index) => (
              <React.Fragment key={index}>
                <ModelCard {...item} index={index + 1} />
              </React.Fragment>
            ))}
          </div>
        </>
      }
    </div>
  );
};

const Page = () => {
  return <Suspense>
    <CreatorsPage />
  </Suspense>
}

export default Page;
