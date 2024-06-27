import { useAccount } from 'wagmi'
import { useQuery } from 'wagmi/query'

import { createFetchOptions, fetchJSON } from '@/utils'
import { NFT_MARKET_PLACE_ADDRESS } from '@/utils/addresses'
import { IndianModelCardData, modelCardData } from '@/utils/modelData'

const useGetPayments = () => {
  const { address } = useAccount()
  return useQuery({
    queryKey: ["payments", address],
    enabled: !!address,
    queryFn: async () => {
      const fetchOptions = createFetchOptions("POST", {
        query: `{ transfers(where: {from: \"${address}\", to: \"${NFT_MARKET_PLACE_ADDRESS}\"}) { id from to value transactionHash blockTimestamp }}`
      })
      const res = await fetchJSON("https://api.studio.thegraph.com/query/80954/payment-token/v0.1", fetchOptions)

      const allModelData = [...modelCardData, ...IndianModelCardData]
      const formatted = res.data.transfers.map((s) => {
        const modelData = allModelData.find(d => d.fees === parseInt(s.value) / Math.pow(10, 6))
        return {
          ...s,
          modelData: modelData
        }
      })
      return formatted as [] || []
    },
    refetchInterval: 10000
  })
}

export default useGetPayments