'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import amFlag from 'public/images/americaFlagIcon.webp';
import React, { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import { BagIcon, FavIcon, HomeIcon, PaymentIcon, StakingIcon, StarIcon, TvIcon } from '@/components/ui/icons';


const sideBarContentGenral = [
  {
    tag: 'Home',
    icon: HomeIcon,
    link: '/feed',
  },
  {
    tag: 'Payments',
    icon: PaymentIcon,
    link: '/payments',
  },
  {
    tag: 'Creators',
    icon: FavIcon,
    link: '/creators',
  },
  {
    tag: 'Favorites',
    icon: StarIcon,
    link: '#',
  },
  {
    tag: 'Live',
    icon: TvIcon,
    link: '#',
  },
];

const sideBarcontentSpecials = [
  {
    tag: 'Staking',
    icon: StakingIcon,
    link: '#',
    iconAfter: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-5 h-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
        />
      </svg>
    ),
  },
  {
    tag: 'Marketplace',
    icon: BagIcon,
    link: '/marketPlace',
  },
];
type props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = ({ isOpen, setIsOpen }: props) => {
  const sidebarRef = useRef(null);
  const navigation = useRouter()

  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    } else {
      document.removeEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={` text-white ${isOpen ? "w-[20rem]" : "w-[20rem] border-2 border-[#FCC0FF] border-y-0"}`}
    >
      <div className='flex pt-10 flex-col justify-between gap-4 overflow-hidden w-full h-full'>
        <div className='flex items-center justify-center w-full '>
          <Image src="/images/onchain-summer.webp" alt='onchain' width={213} height={178} />
        </div>
        <div className='px-5 w-full'>
          <div className='h-[1px] bg-[#625B71] w-full' />
        </div>
        <SideBarSections sectionFor='general' content={sideBarContentGenral} />
        <SideBarSections sectionFor='special' content={sideBarcontentSpecials} />

        <div className='m-4 p-[0.8px] rounded-xl max-w-sm relative'>
          <input
            placeholder='Search here'
            className='text-[##625B71] w-full h-10 bg-[##F7F2FA] outline-none focus:outline-none rounded-xl px-12'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 absolute text-[#625B71] top-0 translate-x-full translate-y-1/3'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        </div>
        <p className='text-[#0051FE] underline text-[16px] -mt-3 pl-5 font-semibold'> Country</p>
        <div className='flex items-start   justify-start gap-2 text-[#625B71] pl-4  flex-wrap max-w-[100%]'>
          <button onClick={() => {
            navigation.push("/feed?type=global")
          }} className={cn('rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 py-2')}>🌍 Global</button>
          <button onClick={() => {
            navigation.push("/feed?type=indian")
          }} className='rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 flex items-center justify-center py-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4'
              viewBox='0 0 512 512'
              id='india'
            >
              <path fill='#f0f0f0' d='M0 85.337h512v341.326H0z'></path>
              <path fill='#ff9811' d='M0 85.337h512v113.775H0z'></path>
              <path fill='#6da544' d='M0 312.888h512v113.775H0z'></path>
              <circle cx='256' cy='256' r='43.896' fill='#0052b4'></circle>
              <circle cx='256' cy='256' r='27.434' fill='#f0f0f0'></circle>
              <path
                fill='#0052b4'
                d='m256 222.146 8.464 19.195 20.855-2.268L272.927 256l12.392 16.927-20.855-2.268L256 289.854l-8.464-19.195-20.855 2.268L239.073 256l-12.392-16.927 20.855 2.268z'
              ></path>
            </svg>
            &nbsp;Indian
          </button>
        </div>
        <p className='text-[#0051FE] mt-2 underline text-[16px]  pl-5 font-semibold'> Categories</p>
        <div className='flex items-center pb-4 justify-start gap-2 text-[#625B71] pl-3 flex-wrap max-w-[90%] mx-auto'>

          <button className='rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 py-2'>🫦 Flirting</button>
          <button className='rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 py-2'>💃 Dance</button>
          <button className='rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 py-2'>🗾 Asian</button>
          <button className='rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 py-2'>🌇 Outdoor</button>
          <button className='rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 flex items-center justify-center py-2'>
            <Image src={amFlag} alt='amflag' className='w-5' />
            American
          </button>
          <button className='rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 py-2'>😈 ASMR</button>
          <button className='rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 py-2'>👀 VR cams</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

export const SideBarSections = ({
  sectionFor,
  content,
}: {
  sectionFor: string;
  content: any[];
}) => {
  const pathname = usePathname()
  return (
    <div
      className={`${sectionFor === 'specials'
        ? 'border-[#CEB9E9] border-y-[0.5px] py-6 px-4 w-[80%]'
        : ''
        } flex flex-col  items-start w-full justify-around`}
    >
      <p className='capitalize pl-10 mb-3 text-xl lg:text-2xl font-bold !text-[#0051FE] bg-clip-text text-transparent text-center'>
        {sectionFor}
      </p>
      <div className='flex gap-x-4 flex-col w-full items-start justify-center'>
        {content.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={cn('text-[#625B71] group pl-10 py-2 relative hover:bg-link w-full flex gap-x-4 items-center', pathname === item.link && "bg-link")}
          >

            <div className={cn('absolute hidden group-hover:block top-0 h-full w-[12px] shadow-link left-0 bg-[#FB0393] blur-sm', pathname === item.link && 'block bg-[#FB0393]')} />
            {/* <Image
              src={item.icon}
              priority
              alt={item.tag}
              width={20}
              height={20}
            /> */}
            <p className={cn('group-hover:text-[#FB0393]', pathname === item.link && 'text-[#FB0393]')}>
              {item.icon}
              {/* <svg
                width={20}
                height={22}
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 19.5556H6.25V12.2222H13.75V19.5556H17.5V8.55556L10 3.05556L2.5 8.55556V19.5556ZM0 22V7.33333L10 0L20 7.33333V22H11.25V14.6667H8.75V22H0Z"
                  fill="currentColor"
                />
              </svg> */}
            </p>
            <p className={cn('block text-lg font-medium group-hover:text-[#FB0393]', pathname === item.link && 'text-[#FB0393]')}>{item.tag}</p>
            {item.iconAfter ? item.iconAfter : null}
          </Link>
        ))}
      </div>
    </div>
  );
};
