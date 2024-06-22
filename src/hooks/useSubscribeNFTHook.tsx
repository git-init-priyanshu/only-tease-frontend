import { useWriteContracts } from 'wagmi/experimental'

const useSubscribeNFTHook = () => {
  const data = useWriteContracts()
  return data
}

export default useSubscribeNFTHook