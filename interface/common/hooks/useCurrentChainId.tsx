import { useState, useEffect } from "react";

export const useCurrentChainId = () => {
  const [chainId, setChainId] = useState(null);

  const handleChainChanged = (chainId: string) => {
    setChainId(+chainId);
  };

  useEffect(() => {
    const { ethereum } = window as any;
    const chainId = !ethereum ? 56 : Number(ethereum?.chainId);
    setChainId(chainId);

    if (ethereum) {
      ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (ethereum?.removeListener) {
        ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  return chainId;
};

export default useCurrentChainId;
