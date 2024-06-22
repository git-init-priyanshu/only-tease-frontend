import { baseSepolia } from 'viem/chains';

import { generateContractHook } from '@/hooks/contracts';
import { abi } from '@/hooks/PurchaseBunderAbi';

export const usePurchasePaymaster = generateContractHook({
  abi: abi,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0xD55E9250959D8689819015e24761eCB3891126dc',
  },
});
