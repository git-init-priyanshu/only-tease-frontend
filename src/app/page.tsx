'use client';

import '@/lib/env';
import Image from 'next/image';

import Button from '@/components/buttons/Button';

export default function HomePage() {
  return (
    <main className='  text-[#AAAAAA] font-bold bg-[#F7F2FA] flex overflow-hidden items-start justify-end h-screen relative w-full '>
      <Image src="/images/onchain.png" width={800} height={200} alt='onchain' className='aspect-[1743/2048] absolute top-0 left-0 h-full' />
      <div className='flex items-center flex-col pt-10 w-[70%] min-h-screen justify-between'>
        <div className='flex items-start space-x-6 justify-center'>
          <Image src="/images/Onchain-text.png" className='aspect-[969/148]' width={500} height={100} alt='onchain' />
          <Image src="/images/summer.png" className='aspect-[969/148]' width={500} height={100} alt='onchain' />
        </div>
        <div className='h-[700px] w-[500px] z-20 bg-card_bg rounded-[40px]  my-10'>
          <div className='w-[296px] mt-10 h-[70px] mx-auto relative'>
            <Image src="/images/onlyteaselogo.png" fill alt='logo' />
          </div>
          <p className='font-normal  text-center mt-4 text-[#1C1D40] text-[30px]'>"Empower your content,
            redefine connection."</p>
          <p className=' text-center mt-10 text-[#1C1D40] text-[20px] font-semibold'>We know you are Excited!</p>
          <p className=' text-center text-[#1C1D40] text-[20px] font-semibold'>Simple Verification & you are sorted.</p>
          <div className='w-[296px] mt-10 h-[274px] mx-auto relative'>
            <Image src="/images/qrcode.png" fill alt='logo' />
          </div>
          <p className=' text-center mt-4 text-[#1C1D40] text-[20px] font-semibold'>Scan to verify 18+</p>
          <div className='flex items-center pt-4 justify-center'>
            <Button className='mx-auto w-[196px] flex items-center justify-center'>Skip for now</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
