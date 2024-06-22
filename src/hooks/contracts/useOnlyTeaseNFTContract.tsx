import { baseSepolia } from 'viem/chains';

import { ONLY_TEASE_ABI } from '@/hooks/abi/ONLY_TEASE_ABI';
import { generateContractHook } from '@/hooks/contracts/contracts';

import { ONLY_TEASE_CONTRACT_ADDRESS } from '@/utils/addresses';

export const useOnlyTeaseNFTContract = generateContractHook({
  abi: ONLY_TEASE_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: ONLY_TEASE_CONTRACT_ADDRESS,
  },
});
