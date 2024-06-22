import { parseUnits } from 'ethers/lib/utils';
import { useSession } from 'next-auth/react';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import { useCallsStatus, useWriteContracts } from 'wagmi/experimental';

import { useMockUSDContract } from '@/hooks/contracts/useMockUSD';
import { useNftMarketplaceAutomationContract } from '@/hooks/contracts/useNftMarketplaceAutomation';
import { useOnlyTeaseNFTContract } from '@/hooks/contracts/useOnlyTeaseNFTContract';
import useFetchUserDetails from '@/hooks/user/useFetchUserDetails';
import useGetListedSubscriptions from '@/hooks/user/useGetListedSubscriptions';

import { API_ROUTES, API_URL, createFetchOptions, defaultUrl, fetchJSON, publicClient } from '@/utils';


const updateSubscription = async ({ price, tokenId, listingId }: {
  price: string, listingId: string, tokenId: string
}) => {
  const fetchOptions = createFetchOptions("PATCH", {
    price: price,
    listingId: listingId,
    tokenId: tokenId,
  })
  return await fetchJSON(API_URL + "/" + API_ROUTES.LIST_SUBSCRIPTION_BASE, fetchOptions)
}

const useNFTListContract = ({ amount, tokenId, onSuccess }: {
  amount: string, tokenId: string, onSuccess?: () => void
}) => {
  const { address } = useAccount()
  const { refetch: refetchUser } = useFetchUserDetails()
  const { refetch } = useGetListedSubscriptions()
  const mockUsdContract = useMockUSDContract()
  const nftMarketPlaceContract = useNftMarketplaceAutomationContract()
  const onlyTease = useOnlyTeaseNFTContract()
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

  const listNFT = async () => {
    try {
      if (mockUsdContract.status === "ready" && nftMarketPlaceContract.status === "ready" && onlyTease.status === "ready" && session.data?.user && address) {
        const listingId = await publicClient.readContract({
          abi: nftMarketPlaceContract.abi,
          address: nftMarketPlaceContract.address,
          functionName: "listingId",
        })

        const allowance = await publicClient.readContract({
          abi: onlyTease.abi,
          address: onlyTease.address,
          functionName: "isApprovedForAll",
          args: [address, onlyTease.address]
        })

        let contracts = []

        if (allowance) {
          contracts = [
            {
              address: nftMarketPlaceContract.address,
              abi: nftMarketPlaceContract.abi,
              functionName: 'listNft',
              args: [tokenId, parseUnits(amount.toString(), 6)],
            },
          ]
        } else {
          contracts = [
            {
              abi: onlyTease.abi,
              address: onlyTease.address,
              functionName: "setApprovalForAll",
              args: [nftMarketPlaceContract.address, true]
            },
            {
              address: nftMarketPlaceContract.address,
              abi: nftMarketPlaceContract.abi,
              functionName: 'listNft',
              args: [tokenId, parseUnits(amount.toString(), 6)],
            },
          ]
        }
        await writeContractsAsync({
          contracts: contracts,
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
          price: amount,
          listingId: listingId.toString(),
          tokenId: tokenId
        })
        await refetch()
        await refetchUser()
        onSuccess && onSuccess()
      }
    } catch (error) {
      throw new Error("purchase failed")
    }
  }
  return {
    listNFT, callsStatus,
    isLoading: isPending,
    txHash: callsStatus && callsStatus.receipts && callsStatus.receipts[0] ? callsStatus.receipts[0].transactionHash : ""
  }
}

export default useNFTListContract