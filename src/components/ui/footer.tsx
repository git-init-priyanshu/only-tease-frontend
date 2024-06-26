import Image from 'next/image';

import buildathon from '../../../public/images/370 1.png'
import onchainkit from '../../../public/images/Ellipse 24.png'

export default function Footer() {
  return (
    <div className='w-full border-t-2 border-[#FCC0FF] flex justify-between py-2 px-6 my-4'>
      <div className='flex gap-2 items-center'>
        <Image src={buildathon} alt="buildathon" className='size-20 w-full' />
        {/* <p className='text-5xl'>Buildathon</p> */}
      </div>
      <div className='flex gap-2 items-center'>
        <Image src={onchainkit} alt="onchainkit" className='size-20' />
        <div>
          <p>Build with </p>
          <p className='text-5xl'>OnchainKit</p>
        </div>
      </div>
    </div>
  )
}
