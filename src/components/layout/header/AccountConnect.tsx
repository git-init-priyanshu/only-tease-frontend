import { ConnectAccount } from '@coinbase/onchainkit/wallet';
import { useAccount, useChainId, useDisconnect } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

import Button from '@/components/buttons/Button';
import AccountMenu from '@/components/layout/header/AccountMenu';


/**
 * AccountConnect
 *  - Connects to the wallet
 *  - Disconnects from the wallet
 *  - Displays the wallet network
 */
function AccountConnect() {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();


  return (
    <div
      className="flex flex-grow"
    // {...(status === 'pending' && {
    //   'aria-hidden': true,
    //   style: {
    //     pointerEvents: 'none',
    //     userSelect: 'none',
    //   },
    // })}
    >
      {(() => {
        if (account.status === 'disconnected') {
          return <ConnectAccount />
        }

        if (account.status === 'connected' && chainId !== baseSepolia.id) {
          return (
            <Button
              onClick={() => disconnect()}
            >
              Wrong network
            </Button>
          );
        }

        if (account.status === 'reconnecting') {
          return <Button
          >
            Connecting...
          </Button>
        }

        if (account.status === 'connected') {
          return <div className='flex items-center justify-end'>
            <Button
              onClick={() => disconnect()}
            >
              {account.address.slice(0, 4) + "..." + account.address.slice(account.address.length - 4, account.address.length - 1)}
            </Button>
            <AccountMenu />
          </div>
        }

        return (
          <Button
          >
            Connecting....
          </Button>
        );
      })()}
    </div >
  );
}

export default AccountConnect;
