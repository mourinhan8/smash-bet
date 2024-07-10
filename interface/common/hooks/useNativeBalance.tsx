
import { ethers } from "ethers";
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

export const useNativeBalance = (userAddress: string) => {
  const [balance, setBalance] = useState<string>("0");

  const fetchBalance = useCallback(async (userAddress: string) => {
    try {
      const web3 = new Web3(Web3.givenProvider);
      let response = await web3.eth.getBalance(userAddress && ethers.utils.getAddress(userAddress));
  
      if (response) {
        let wallet = Web3.utils.fromWei(response, "ether");
        let walletParsed = parseFloat(wallet)?.toFixed(4);
        setBalance(walletParsed);
      }
    } catch (error) {
      console.log("useNativeBalance error", error);
    }
  }, []);
  useEffect(() => {
    if (userAddress) {
      fetchBalance(userAddress);
    }
  }, [fetchBalance, userAddress]);

  return balance;
};

export default useNativeBalance;
