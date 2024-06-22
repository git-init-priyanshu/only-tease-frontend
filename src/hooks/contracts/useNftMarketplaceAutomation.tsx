import { parseUnits } from 'ethers/lib/utils';
import { useSession } from 'next-auth/react';
import { baseSepolia } from 'viem/chains';
import { useCallsStatus, useWriteContracts } from 'wagmi/experimental';

import { NFT_MARKETPLACE_ABI } from '@/hooks/abi/NFT_MARKETPLACE_ABI';
import { generateContractHook } from '@/hooks/contracts/contracts';
import { useMockUSDContract } from '@/hooks/contracts/useMockUSD';
import useFetchUserDetails from '@/hooks/user/useFetchUserDetails';

import { API_ROUTES, API_URL, createFetchOptions, defaultUrl, fetchJSON } from '@/utils';
import { NFT_MARKET_PLACE_ADDRESS } from '@/utils/addresses';
import { getSubscriptionId } from '@/utils/getSubscriptionId';

export const useNftMarketplaceAutomationContract = generateContractHook({
  abi: NFT_MARKETPLACE_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: NFT_MARKET_PLACE_ADDRESS,
  },
});


const updateSubscription = async ({ email, subscriptionId, modelId }: {
  email: string, modelId: string, subscriptionId: number
}) => {
  const fetchOptions = createFetchOptions("POST", {
    email: email,
    modelId: modelId,
    tokenId: (
      BigInt(1e18) * BigInt(modelId) +
      BigInt(subscriptionId)
    ).toString(),
  })
  return await fetchJSON(API_URL + "/" + API_ROUTES.PURCHASE_SUBSCRIPTION_BASE, fetchOptions)
}

const useNftMarketPlaceAutomation = ({ amount, modelId, onSuccess }: {
  amount: string, modelId: number, onSuccess: () => void
}) => {
  const { refetch } = useFetchUserDetails()
  const mockUsdContract = useMockUSDContract()
  const nftMarketPlaceContract = useNftMarketplaceAutomationContract()
  const { data: id, writeContractsAsync, isPending } = useWriteContracts()
  const session = useSession()
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
    try {
      if (mockUsdContract.status === "ready" && nftMarketPlaceContract.status === "ready" && session.data?.user) {
        const subscriptionId = getSubscriptionId()
        await writeContractsAsync({
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
              args: [modelId, subscriptionId],
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
        await updateSubscription({
          email: session.data?.user.email,
          modelId: modelId.toString(),
          subscriptionId: subscriptionId
        })
        await refetch()
        onSuccess()
      }
    } catch (error) {
      throw new Error("purchase failed")
    }
  }
  return {
    purchaseSubscription, callsStatus,
    isLoading: isPending,
    txHash: callsStatus && callsStatus.receipts && callsStatus.receipts[0] ? callsStatus.receipts[0].transactionHash : ""
  }
}

export default useNftMarketPlaceAutomation