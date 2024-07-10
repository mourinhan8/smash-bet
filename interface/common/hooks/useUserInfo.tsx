import { getUserInfo } from "@/common/api/user";
import { fetchData } from "@/common/redux/actions/fetchAction";
import { useAppDispatch } from "@/common/redux/hooks";
import types from "@/common/redux/types";
import { APP_TOKEN_KEY } from "@/common/utils/constants";
import { useCallback } from "react";
import { useAccount } from "wagmi";

export const useUserInfo = () => {
  const { isConnected, address } = useAccount();
  const dispatch = useAppDispatch();
  const fetchUserInfo = useCallback(() => {
    const token = localStorage.getItem(APP_TOKEN_KEY);
    if (isConnected && address && token) {
      dispatch(fetchData(types.userInfo, getUserInfo(address)));
    }
  }, [isConnected, address, dispatch]);

  return { fetchUserInfo };
};

export default useUserInfo;
