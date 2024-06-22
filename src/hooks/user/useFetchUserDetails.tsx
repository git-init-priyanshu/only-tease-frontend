import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { API_URL, fetchJSON } from '@/utils';

const useFetchUserDetails = (
  modelId?: string
) => {
  const session = useSession()
  return useQuery({
    queryKey: ["user-data", !!session.data, modelId],
    enabled: !!session.data,
    queryFn: async () => {
      const data = await fetchJSON(API_URL + `/user-info-base?email=${session.data?.user.email}`, {
        method: "GET"
      })
      if (data.success) {
        const isUnlocked = !!data.data.subscriptions.find((s: {
          modelId: string
        }) => s.modelId.toString() === modelId?.toString())
        return {
          isFound: true,
          isUnlocked: isUnlocked ?? false,
          open_ai_id: data.data.user.openAi_tokenId,
          ipfs: data.data.user.ipfs_url
        }
      } else if (data.message === 'User not found') {
        return {
          isFound: false,
          isUnlocked: false,
        }
      }
    },
    refetchOnWindowFocus: false,
    // refetchInterval: 50000
  })
}

export default useFetchUserDetails