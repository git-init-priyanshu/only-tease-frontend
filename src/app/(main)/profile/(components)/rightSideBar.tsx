'use client';
import Image from 'next/image';
import TickIcon from 'public/images/tickIcon.webp';
import React from 'react';

import RippleLoader from '@/components/buttons/rippleLoader';
import MyModal from '@/components/ui/dialog';
import ExclusiveCard from '@/components/ui/exclusiveCard';
import CountdownTimer from '@/components/ui/timer';

const RightSideBar = ({
  name,
  modelFees,
  modelId,
  isUnlocked,
  setIsUnlocked,
  image,
}: {
  name: string;
  modelFees: number;
  modelId: number;
  isUnlocked: boolean;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  image: any
}) => {
  if (!name) return null;

  return (
    <div className=' flex flex-col items-start gap-4 w-full  '>
      {!isUnlocked && (
        <div className='bg-white border border-[#9A3CFFB2] rounded-md p-[0.8px] h-fit w-full shadow-lg'>
          <div className=' flex flex-col rounded-md items-center gap-4 px-4 py-5 to-[100%]'>
            <h2 className='text-md text-[#0051FE] text-center'>
              Subscribe and get these benefits
            </h2>
            <div className='flex text-start flex-col gap-2 w-full text-[#CEB9E9]'>
              <p className='flex gap-4 items-center text-[#49454F] text-md'>
                <Image src={TickIcon} alt='tickIcon' /> Unlock complete access{' '}
                <br /> to this user's exclusive content{' '}
              </p>
              <p className='flex gap-4 items-center text-[#49454F] text-md'>
                <Image src={TickIcon} alt='tickIcon' /> Dive into Dm’s
              </p>
              <p className='flex gap-4 items-center text-[#49454F] text-md'>
                <Image src={TickIcon} alt='tickIcon' /> You have the freedom to
                cancel <br /> your subscription anytime{' '}
              </p>
            </div>
            {/* <div className='mt-4' /> */}
            <MyModal
              dialogFor='Subscribe For '
              value={modelFees}
              modelId={modelId}
              setIsUnlocked={setIsUnlocked}
              name={name.split(' ')[0]}
            />
          </div>
        </div>
      )}

      <div className='rounded-md p-[0.8px] h-fit w-full bg-white border border-[#9A3CFFB2] shadow-lg '>
        <div className=' flex flex-col  rounded-md text-[#49454F] items-center gap-4 p-2  to-[100%]'>
          <div className='text-[#FA78FF] mt-2 border-[2px] w-full px-4 py-2 rounded-xl border-[#0051FE] text-sm flex gap-2  z-10 justify-center shadow-lg'>
            <RippleLoader />
            Sale ends
            <div className='text-black'>
              <CountdownTimer duration={7200 * (Math.floor(Math.random() * 10) + 1)} />
            </div>
          </div>
          <ExclusiveCard name={name.split(" ")[0]} image={image} />
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
