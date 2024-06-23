import { useSession } from 'next-auth/react';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';

import { USER_ONBOARDING_ABI } from '@/hooks/abi/USER_ONBOARDING_ABI';
import { generateContractHook } from '@/hooks/contracts/contracts';
import useFetchUserDetails from '@/hooks/user/useFetchUserDetails';

import { API_URL, createFetchOptions, defaultUrl, fetchJSON, OPEN_AI_API_URL, publicClient } from '@/utils';
import { NULL_ADDRESS, USER_ONBOARDING_ADDRESS } from '@/utils/addresses';
import { useMutation } from '@tanstack/react-query';

export const useUserOnbordingContract = generateContractHook({
  abi: USER_ONBOARDING_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: USER_ONBOARDING_ADDRESS,
  },
});


const register = async ({ session, tokenId, address }: {
  session: {
    name: string;
    email: string;
  }, tokenId: string, address: string
}): Promise<void> => {
  if (!session) throw new Error("")
  const fetchOptions = createFetchOptions('POST', {
    name: session.name,
    description: 'Welcome to Onlytease, with this NFT you gain access to our exclusive content! Enjoy (:',
  });

  const resp = await fetchJSON(OPEN_AI_API_URL + '/create-nft-pin-metadata', fetchOptions);

  if (resp.success) {
    const registerOptions = createFetchOptions('POST', {
      username: session.name,
      email: session.email,
      wallet_address: address,
      ipfs_url: resp.metadataIPFSUrl,
      openAi_tokenId: tokenId.toString(),
    });
    return fetchJSON(API_URL + '/register', registerOptions);
  }
};

const useUserOnBoarding = ({ onSuccess }: {
  onSuccess: () => void
}) => {
  const { address } = useAccount()
  const session = useSession()
  const { refetch } = useFetchUserDetails()
  const userOnboardingContract = useUserOnbordingContract()
  const { writeContractsAsync, isPending: isContractPending } = useWriteContracts()

  const onBoarding = async () => {
    try {
      if (!address || !session.data) throw new Error("")
      const fetchOptions = createFetchOptions("POST", {
        name: session.data.user.name
      })
      await fetchJSON(OPEN_AI_API_URL + '/generate-avatar-openAI', fetchOptions);
      await writeContractsAsync({
        contracts: [
          {
            abi: userOnboardingContract.abi,
            address: userOnboardingContract.status === "ready" ? userOnboardingContract.address : NULL_ADDRESS,
            functionName: "sendRequest",
            args: [BigInt(85), [session.data?.user.name], BigInt(300000)],
          }
        ],
        capabilities: {
          paymasterService: {
            url: defaultUrl,
          },
        },
      })
      const tokenId = await publicClient.readContract({
        abi: userOnboardingContract.abi,
        address: userOnboardingContract.status === "ready" ? userOnboardingContract.address : NULL_ADDRESS,
        functionName: 'getTokenId',
      });
      await register({
        address: address,
        session: session.data?.user,
        tokenId: tokenId.toString()
      })
      refetch()
      onSuccess()
    } catch (error) {
      console.error(error);
    }
  }

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["onboard"],
    mutationFn: onBoarding
  })
  return {
    onBoarding: mutateAsync, isLoading: isContractPending || isPending
  }
}

export default useUserOnBoarding