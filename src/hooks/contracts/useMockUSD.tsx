import { baseSepolia } from 'viem/chains';

import ERC20_ABI from '@/hooks/abi/ERC20_ABI';
import { generateContractHook } from '@/hooks/contracts/contracts';

import { MOCK_USD_BASE } from '@/utils/tokens';

export const useMockUSDContract = generateContractHook({
  abi: ERC20_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: MOCK_USD_BASE.address,
  },
});
