'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '@/lib/env';

import Button from '@/components/buttons/Button';

export default function HomePage() {
  const navigation = useRouter()
  return (
    <main className='text-[#AAAAAA] font-bold bg-[#F7F2FA] flex overflow-hidden items-start h-screen relative w-full'>
      <div className='absolute top-0 left-0 h-full w-auto hidden md:block'>
        <Image src="/images/onchain.webp" className='h-full w-auto' width={600} height={200} alt='onchain' />
      </div>
      <div className='flex items-center flex-col md:pt-10 min-h-screen mx-auto md:ml-[30vw] lg:ml-[50vw]'>
        <div className='hidden items-start space-x-6 justify-center z-10 md:flex'>
          <Image src="/images/Onchain-text.webp" className='aspect-[969/148]' width={300} height={100} alt='onchain' />
          <Image src="/images/summer.webp" className='aspect-[969/148]' width={300} height={100} alt='onchain' />
        </div>
        <div className='p-10 z-20 bg-card_bg h-screen md:rounded-[40px] md:h-auto md:my-10'>
          <div className='w-[296px] h-[70px] mx-auto relative'>
            <Image src="/images/onlyteaselogo.webp" fill alt='logo' />
          </div>
          <p className='font-normal text-center mt-4 text-[#1C1D40] text-2xl'>"Empower your content,
            redefine connection."</p>
          <p className=' text-center mt-6 text-[#1C1D40] text-xl font-semibold'>We know you are Excited!</p>
          <p className=' text-center text-[#1C1D40] text-xl font-semibold'>Simple Verification & you are sorted.</p>
          <div className='aspect-[296/274] mt-10 w-52 mx-auto relative'>
            <Image src="/images/qrcode.webp" fill alt='logo' />
          </div>
          <p className=' text-center mt-4 text-[#1C1D40] text-[20px] font-semibold'>Scan to verify 18+</p>
          <div className='flex items-center pt-4 justify-center'>
            <Button onClick={() => {
              navigation.push("/feed")
            }} className='mx-auto w-[196px] flex items-center justify-center'>Skip for now</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
