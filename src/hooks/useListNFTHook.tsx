import { generateContractHook } from '@/hooks/contracts/contracts';
import { useWriteContracts } from 'wagmi/experimental';


export const usePurchasePaymaster = generateContractHook({
  abi: abi,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0xD55E9250959D8689819015e24761eCB3891126dc',
  },
});

const useListNFTHook = () => {
  const data = useWriteContracts()

  const listNft = async () => {
    const result = await data.writeContractsAsync({
      contracts: [

      ]
    })
  }

  return data
}

export default useListNFTHook
