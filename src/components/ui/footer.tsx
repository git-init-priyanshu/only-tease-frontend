import Image from 'next/image';

import '@/styles/robotoFont.css';

import buildathon from '../../../public/images/Buildathon.png';
import onchainkit from '../../../public/images/Ellipse 24.png';

export default function Footer() {
  return (
    <div className='w-full border-t-2 border-[#FCC0FF] flex justify-between py-2 px-6 mt-4'>
      <div className='flex gap-2 items-center'>
        <Image src={buildathon} alt='buildathon' className='size-24 w-full' />
      </div>
      <div className='flex gap-2 items-center'>
        <Image src={onchainkit} alt='onchainkit' className='size-20' />
        <div>
          <p className='font-roboto text-2xl font-thin text-[#4C4C4C]'>Build with</p>
          <p className='font-roboto text-5xl font-semibold text-[#4C4C4C]'>OnchainKit</p>
        </div>
      </div>
    </div>
  );
}
