'use client';
import { Checkbox, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useAccount } from 'wagmi';

import useGetPayments from '@/hooks/useGetPayments';
import useFetchUserDetails from '@/hooks/user/useFetchUserDetails';
import { checkUserBalanceBase } from '@/lib/func';
import { scaleDown, shortenAddress } from '@/lib/utils';

import TextButton from '@/components/buttons/TextButton';
import UnderlineLink from '@/components/links/UnderlineLink';
import { StyledTableCell, StyledTableRow } from '@/components/ui/marketPlaceTable';

import PieChartExample from '@/app/(main)/payments/PieChart';
import { allModelData } from '@/utils/modelData';

import Bitcoin from '../../../../public/images/Bitcoin-amico 1.png';
import Coins from '../../../../public/images/Coins-amico 1.png';



enum TYPE {
  ACTIVE = "ACTIVE",
  PAYMENTS = "PAYMENTS"
}
export default function Page() {
  const [activeCheckBox, setActiveCheckBox] = useState([])
  const [activeSelected, setSelectedActive] = useState(TYPE.PAYMENTS)
  const { data: userDetails } = useFetchUserDetails()

  const { address } = useAccount()
  const { data: payments } = useGetPayments()

  const { data: balance } = useQuery({
    queryKey: ["userbalance" + address],
    enabled: !!address,
    queryFn: () => checkUserBalanceBase(address)
  })

  const totalAmt = useMemo(() => {
    if (activeCheckBox.length === 0) return 0
    return activeCheckBox.reduce((prev, curr) => {
      return prev + curr.fees
    }, 0)
  }, [activeCheckBox])

  const checkIsEnabled = (id: string): boolean => {
    const isExist = activeCheckBox.find((e) => e.id === id)
    return isExist ? true : false
  }


  const toggleCheckBox = (data: any) => {
    const isActive = checkIsEnabled(data.id);
    if (isActive) {
      setActiveCheckBox(activeCheckBox.filter((e) => e.id !== data.id))
    }
    else {
      setActiveCheckBox([...activeCheckBox, data])
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 pt-5 gap-10 place-content-center w-fit max-w-[90%] lg:max-w-[80%] mx-auto'>
      <div className='border p-4 aspect-square bg-white rounded-2xl shadow-lg flex place-self-center gap-4'>
        <div className='flex items-end'>
          <div className=' flex flex-col gap-4'>
            <Image src="/images/stripe.png" width={256} height={256} />
            <Image src={Coins} alt='bitcoin' width={256} height={256} />
            <TextButton className='border-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg shadow-lg px-10 py-2 text-nowrap hover:text-white'>
              Add Funds
            </TextButton>
          </div>
        </div>
        <div className=' flex flex-col gap-4 mt-6'>
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
          <PieChartExample balance={balance ? parseInt(balance?.signerBalance) : 0} />
          {/* <div className='absolute text-3xl font-semibold text-[#0088FE] left-[45%] bottom-[48%]'>{balance?.signerBalance}</div> */}
          <div className='absolute text-lg font-semibold left-1/2 -translate-x-1/2 bottom-[10%]'>
            Balance: {balance?.signerBalance} {" "}
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
          <div className='flex items-start w-full justify-between'>
            <div onClick={() => {
              setSelectedActive(TYPE.PAYMENTS)
            }} className='text-2xl font-semibold cursor-pointer text-[#0051FE]'>Payment dashboard</div>
            <div>
              <p onClick={() => {
                setSelectedActive(TYPE.ACTIVE)
              }} className='text-2xl font-semibold cursor-pointer text-[#0051FE]'>Active Subscriptions</p>
              {activeSelected === TYPE.ACTIVE && <div className='flex gap-4 items-center mt-2'>
                <p className='text-lg font-medium'>Total {totalAmt} {" "}
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
              }
            </div>
          </div>

        </div>
        {
          activeSelected === TYPE.PAYMENTS ? <TableContainer
            component={Paper}
            style={{
              borderRadius: "10px",
              border: "2px solid #FA78FF "
            }}
            className='w-full  bg-white text-white border-fuchsia-700 border'
          >
            <Table
              sx={{ minWidth: 100, border: 'none' }}
              aria-label='customized table'
            >
              <TableHead>
                <TableRow className=''>
                  <StyledTableCell align='left'>Model</StyledTableCell>
                  <StyledTableCell align='left'>Amount Paid</StyledTableCell>
                  <StyledTableCell align='right'>Date</StyledTableCell>
                  <StyledTableCell align='right'>Tx&nbsp;Hash</StyledTableCell>
                  <StyledTableCell align='right'>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments && payments.map((row: any) => {
                  const modelData = row.modelData
                  return (
                    <StyledTableRow key={modelData.id}>
                      <StyledTableCell component='th' scope='row'>
                        <div className='flex items-center space-x-3 justify-start'>
                          <Image
                            src={modelData.icon}
                            className='w-10 h-10 rounded-full'
                            alt='modelIcon'
                          />
                          <div className='flex items-center  gap-2 '>
                            {modelData.name}
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell component='th' scope='row'>
                        {scaleDown(row.value, 6)} <svg
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
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <span> {format(parseInt(row.blockTimestamp) * 1000, 'yyyy-MM-dd HH:mm:ss')}</span>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <UnderlineLink href={"https://sepolia.basescan.org/tx/" + row.transactionHash}>
                          {(shortenAddress(row.transactionHash))}
                        </UnderlineLink>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <div className='flex items-center justify-end'>
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9.5" cy="9.5" r="9" stroke="#03A400" />
                            <path d="M17.0764 5.99918L8.37224 13.9336L4.38281 10.297L5.40556 9.36468L8.37224 12.0624L16.0537 5.06689L17.0764 5.99918Z" fill="#03A400" />
                          </svg>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer> :
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {userDetails && userDetails.subscriptions?.length > 0 ? userDetails.subscriptions.map((item) => {
                const currentModelData = allModelData.filter((e) => e.name === item.modelName)[0]
                if (!currentModelData) return;
                return (
                  <div
                    key={item.modelId}
                    className='rounded-xl relative w-full aspect-square overflow-hidden place-self-center'
                  >
                    <Checkbox
                      checked={checkIsEnabled(Number(item.modelId))}
                      onChange={() => toggleCheckBox(item.modeldata)}
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
                    <div className='absolute inset-0 hover:bg-gradient-to-t from-white via-white/10 to-transparent transition-all duration-300'></div>
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
              }) : <div className='h-[100px] flex items-center justify-center w-full'>
                <p className='text-xl font-medium text-center w-full'>No data</p>
              </div>
              }
            </div>
        }
      </div >
    </div >
  );
}
