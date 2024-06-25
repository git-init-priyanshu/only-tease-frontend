'use client';
import React from 'react';

import ModelCard from '@/components/ui/modelCard';

import { IndianModelCardData, modelCardData } from '@/utils/modelData';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
type Props = {
  params: {
    feed: string;
  };
};


const CreatorsPage = ({ params }: Props) => {
  const searchParams = useSearchParams()
  console.log(searchParams.get("type"), "searchParams");
  const type = searchParams.get("type") ?? "global"
  return (
    <div className='w-full pt-5 max-w-[1200px] mx-auto'>
      {type === "indian" ? <>
        <p className='text-[#0051FE] underline text-[25px] mt-3 pl-4 font-semibold'> Indian Creators</p>
        <div className='grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-2  p-3 xl:p-5'>
          {IndianModelCardData.map((item, index) => (
            <React.Fragment key={index}>
              <ModelCard {...item} index={index + 1} />
            </React.Fragment>
          ))}
        </div></> :
        <> <p className='text-[#0051FE] underline text-[25px] mt-3 pl-4 font-semibold'> Global Creators</p>
          <div className='grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-2  p-3 xl:p-5'>
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

const Page = ({ params }: Props) => {
  return <Suspense>
    <CreatorsPage params={params} />
  </Suspense>
}

export default Page;
