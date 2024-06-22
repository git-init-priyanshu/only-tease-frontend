import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

import { isLocal } from '@/constant/env';

// Use the Paymaster Proxy when deployed.
const isLocalEnv = isLocal;
export const defaultUrl = isLocalEnv
  ? process.env.NEXT_PUBLIC_PAYMASTER_URL
  : `http://localhost:3000/api/paymaster-proxy`;

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});
