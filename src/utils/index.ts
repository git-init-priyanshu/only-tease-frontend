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

export const fetchJSON = async (
  url: string,
  options: RequestInit
): Promise<any> => {
  const response = await fetch(url, options);
  return response.json();
};

export const createFetchOptions = (
  method: string,
  body: object
): RequestInit => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export enum API_ROUTES {
  PURCHASE_SUBSCRIPTION_BASE = 'purchase-subscription-base',
  LIST_SUBSCRIPTION_BASE = 'list-subscription-base',
  LIST_SUBSCRIPTIONS = 'listed-subscriptions-base',
  USER_INFO = 'user-info-base',
  UPDATE_SUBSCRIPTION_BASE = 'update-subscription-base',
}
export const API_URL = 'https://onlytease-db-graph-backend.onrender.com/api';
export const OPEN_AI_API_URL = 'https://open-ai-avatar-nft-gen.onrender.com';
