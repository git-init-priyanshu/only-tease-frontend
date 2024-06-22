import { useWriteContracts } from 'wagmi/experimental';

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
