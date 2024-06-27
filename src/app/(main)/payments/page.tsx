'use client';

import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import TextButton from '@/components/buttons/TextButton';

import { allModelData } from "@/utils/modelData"

import Bitcoin from '../../../../public/images/Bitcoin-amico 1.png';
import Coins from '../../../../public/images/Coins-amico 1.png';

const data = [
  { name: 'Balance', value: 20 },
  { name: 'Total', value: 100 },
];
const COLORS = ['#0088FE', '#00C49F'];

type ActiveSubsType = {
  ipfsUrl: string,
  isListed: boolean,
  modelId: string,
  modelName: string,
  tokenId: string
}
type ActiveCheckBoxType = { id: number, value: number }

export default function Page() {
  const [activeCheckBox, setActiveCheckBox] = useState<ActiveCheckBoxType[]>([])
  const [activeSubs, setActiveSubs] = useState<ActiveSubsType[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        'https://onlytease-db-graph-backend.onrender.com/api/user-info-base?email=cryptokrotus@gmail.com',
        {
          method: 'GET',
        }
      );
      const data = await resp.json();
      setActiveSubs(data.data.subscriptions)
    }
    fetchData();
  }, [])
  const checkIsEnabled = (id: number): boolean => {
    const isExist = activeCheckBox.find((e) => e.id === id)
    return isExist ? true : false
  }
  const toggleCheckBox = (id: number, value: number) => {
    const isActive = checkIsEnabled(id);
    if (isActive) {
      setActiveCheckBox(activeCheckBox.filter((e) => e.id !== id))
    }
    else {
      setActiveCheckBox([...activeCheckBox, { id, value }])
    }
  }
  const totalAmt = () => {
    let amt = 0;
    activeCheckBox.forEach((e) => {
      amt = amt + e.value;
    })
    return amt;
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 pt-5 gap-10 place-content-center w-fit max-w-[90%] lg:max-w-[80%] mx-auto'>
      <div className='border p-4 aspect-square bg-white rounded-2xl shadow-lg flex place-self-center gap-4'>
        <div className='flex items-end'>
          <div className=' flex flex-col gap-4'>
            <Image src={Coins} alt='bitcoin' width={256} height={256} />
            <TextButton className='border-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg shadow-lg px-10 py-2 text-nowrap hover:text-white'>
              Add Funds
            </TextButton>
          </div>
        </div>
        <div className=' flex flex-col gap-4'>
          <Image src={Bitcoin} alt='bitcoin' width={256} height={256} />
          <TextButton className='border-2 bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-lg shadow-lg px-10 py-2 text-nowrap hover:text-white'>
            Withdraw Funds
          </TextButton>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" className='relative border p-4 aspect-square bg-white rounded-2xl shadow-lg place-self-center '>
        <>
          <div className='absolute size-5 bg-[#0088FE] rounded shadow-lg'></div>
          <div className='absolute left-12 text-[#0088FE]'>Balance</div>
          <div className='absolute top-12 size-5 bg-[#00C49F] rounded shadow-lg'></div>
          <div className='absolute top-12 left-12 text-[#00C49F]'>Value</div>
          <PieChart width={500} height={500}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={5}
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className='absolute text-3xl font-semibold text-[#0088FE] left-[45%] bottom-[48%]'>23</div>
          <div className='absolute text-2xl font-semibold left-[25%] bottom-[10%]'>
            Balance: 23 {" "}
            <svg
              aria-label='USDC'
              width='1em'
              height='1em'
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
              className='inline-block size-[.8lh] shrink-0'
            >
              <g fill='none'>
                <circle cx='16' cy='16' r='16' fill='#3E73C4'></circle>
                <g fill='#FFF'>
                  <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                  <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                </g>
              </g>
            </svg>
            {" "}USDC
          </div>
        </>
      </ResponsiveContainer>
      <div className='md:col-span-2 w-full border p-4 bg-white rounded-2xl shadow-lg place-self-center '>
        <div className='flex justify-between items-center w-full gap-10 mb-4'>
          <p className='text-2xl font-semibold text-[#0051FE]'>Active Subscriptions</p>
          <div className='flex gap-4 items-center'>
            <p className='text-lg font-medium'>Total {totalAmt()} {" "}
              <svg
                aria-label='USDC'
                width='1em'
                height='1em'
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
                className='inline-block size-[.8lh] shrink-0'
              >
                <g fill='none'>
                  <circle cx='16' cy='16' r='16' fill='#3E73C4'></circle>
                  <g fill='#FFF'>
                    <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                    <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                  </g>
                </g>
              </svg>

            </p>
            <TextButton className='border-2 border-blue-800 rounded-lg text-black shadow-lg px-10 py-2'>
              Renew
            </TextButton>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {activeSubs && activeSubs?.length > 0 ? activeSubs.map((item: ActiveSubsType) => {
            const currentModelData = allModelData.filter((e) => e.name === item.modelName)[0]
            if (!currentModelData) return;
            return (
              <div
                key={item.modelId}
                className='rounded-xl relative w-full aspect-square overflow-hidden place-self-center'
              >
                <Checkbox
                  checked={checkIsEnabled(Number(item.modelId))}
                  onChange={() => toggleCheckBox(Number(item.modelId), currentModelData.value)}
                  className="group z-10 absolute size-6 rounded-md bg-white bg-opacity-70 m-2 ring-1 ring-white ring-inset border-2 border-blue-700 shadow-lg"
                >
                  <CheckIcon className="hidden size-5 fill-pink-600 group-data-[checked]:block" />
                </Checkbox>
                <Image
                  src={currentModelData.icon}
                  layout="fill"
                  className='object-cover'
                  alt='model'
                />
                <div className='absolute bottom-0 left-0 w-full p-2 text-white'>
                  <div className='flex items-center justify-start gap-3 pb-2 relative z-20'>
                    <div className='w-[50px] h-[50px] bg-white rounded-full overflow-hidden'>
                      <Image
                        height={200}
                        width={200}
                        src={currentModelData.image}
                        alt='model icon'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <p className='capitalize text-md font-bold flex gap-1 justify-center items-center text-black'>
                      {currentModelData.name}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                        />
                      </svg>
                    </p>
                  </div>
                  <TextButton className='bg-blue-800 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md w-full px-3 py-1'>
                    Renew subscription
                  </TextButton>
                </div>
              </div>
            );
          }) : <p className='text-xl font-medium text-center'>No data</p>
          }
        </div>
      </div>
    </div>
  );
}
