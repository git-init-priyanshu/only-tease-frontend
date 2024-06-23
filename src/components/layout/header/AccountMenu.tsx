import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useDisconnect } from '@web3modal/ethers5/react';
import { CopyIcon, EllipsisVerticalIcon, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';

import { toastStyles } from '@/lib/utils';

export default function Example() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect();



  const handleCopy = (address: string) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success('Address copied to clipboard!', toastStyles);
      })
      .catch(() => {
        toast.success('Something went wrong', toastStyles);
      });
  };

  return (
    <div className="text-right ml-2">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-button py-2 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <EllipsisVerticalIcon className="size-4 fill-white/60" />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          style={{
            zIndex: 9999999
          }}
          className="w-52 origin-top-right z-50 relative rounded-xl border bg-button border-white/5 5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button onClick={() => {
              signOut().then(() => { disconnect() })
            }} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <LogOut className="size-4 fill-white/30" />
              Disconnect
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={() => {
              if (address) {
                handleCopy(address)
              }
            }} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <CopyIcon className="size-4 fill-white/30" />
              Copy Address
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div >
  )
}
