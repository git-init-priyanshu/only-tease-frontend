import { parseUnits } from 'ethers/lib/utils';
import { baseSepolia } from 'viem/chains';
import { useCallsStatus, useWriteContracts } from 'wagmi/experimental';

import { NFT_MARKETPLACE_ABI } from '@/hooks/abi/NFT_MARKETPLACE_ABI';
import { generateContractHook } from '@/hooks/contracts/contracts';
import { useMockUSDContract } from '@/hooks/contracts/useMockUSD';

import { defaultUrl } from '@/utils';
import { NFT_MARKET_PLACE_ADDRESS } from '@/utils/addresses';
import { getSubscriptionId } from '@/utils/getSubscriptionId';

export const useNftMarketplaceAutomationContract = generateContractHook({
  abi: NFT_MARKETPLACE_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: NFT_MARKET_PLACE_ADDRESS,
  },
});


const useNftMarketPlaceAutomation = ({ amount, modelId }: {
  amount: string, modelId: number
}) => {
  const mockUsdContract = useMockUSDContract()
  const nftMarketPlaceContract = useNftMarketplaceAutomationContract()
  const { data: id, writeContractsAsync } = useWriteContracts()
  const { data: callsStatus } = useCallsStatus({
    id: id as string,
    query: {
      enabled: !!id,
      // Poll every second until the calls are confirmed
      refetchInterval: (data) =>
        data.state.data?.status === "CONFIRMED" ? false : 1000,
    },
  });

  const purchaseSubscription = async () => {
    if (mockUsdContract.status === "ready" && nftMarketPlaceContract.status === "ready") {
      writeContractsAsync({
        contracts: [
          {
            abi: mockUsdContract.abi,
            address: mockUsdContract.address,
            functionName: "approve",
            args: [nftMarketPlaceContract.address, parseUnits(amount.toString(), 6)]
          },
          {
            address: nftMarketPlaceContract.address,
            abi: nftMarketPlaceContract.abi,
            functionName: 'purchaseSubscription',
            args: [modelId, getSubscriptionId()],
          },
        ],
        capabilities: {
          paymasterService: {
            url: defaultUrl,
          },
          [baseSepolia.id]: {
            atomicBatch: {
              supported: true,
            },
          }
        },
      })
    }
  }
  return {
    purchaseSubscription, callsStatus
  }
}

export default useNftMarketPlaceAutomation