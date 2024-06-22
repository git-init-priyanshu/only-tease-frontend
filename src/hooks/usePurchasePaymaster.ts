import { baseSepolia } from 'viem/chains';

import { abi } from '@/hooks/abi/PurchaseBunderAbi';
import { generateContractHook } from '@/hooks/contracts/contracts';

export const usePurchasePaymaster = generateContractHook({
  abi: abi,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0xD55E9250959D8689819015e24761eCB3891126dc',
  },
});
