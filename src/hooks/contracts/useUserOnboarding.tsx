import { baseSepolia } from 'viem/chains';
import { useWriteContracts } from 'wagmi/experimental';

import { USER_ONBOARDING_ABI } from '@/hooks/abi/USER_ONBOARDING_ABI';
import { generateContractHook } from '@/hooks/contracts/contracts';
import { useMockUSDContract } from '@/hooks/contracts/useMockUSD';

import { USER_ONBOARDING_ADDRESS } from '@/utils/addresses';

export const useUserOnbordingContract = generateContractHook({
  abi: USER_ONBOARDING_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: USER_ONBOARDING_ADDRESS,
  },
});


const useUserOnBoarding = ({ amount }: {
  amount: string
}) => {
  const mockUsdContract = useMockUSDContract()

  const userOnboardingContract = useUserOnbordingContract()
  const { writeContractsAsync } = useWriteContracts({
    mutation: {
      onSettled: () => {
        console.log("success")
      }
    }
  })

  const onBoarding = async () => {
    const result = await writeContractsAsync({
      contracts: [
        {
          abi: mockUsdContract.abi,
          address: mockUsdContract.status === "ready" ? mockUsdContract.address : '0xx',
          functionName: "approve",
          args: []
        }
      ]
    })
  }
  return {
    onBoarding
  }
}

export default useUserOnBoarding