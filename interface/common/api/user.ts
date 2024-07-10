import { fetchApi } from "@/common/utils";
import { METHOD } from "@/common/utils/constants";
import queryString from "query-string";

export const userLogin =
  (walletAddress: string, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/users/create`, { walletAddress }, METHOD.POST, {}, isCache);

export const getUserInfo =
  (walletAddress: string, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/users/info?wallet=${walletAddress}`, null, METHOD.GET, {}, isCache);

export const getBetHistory =
  (userId: number, page: number, pageSize: number, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`/users/bet-history?userId=${userId}&page=${page}&pageSize=${pageSize}`, null, METHOD.GET, {}, isCache);

export const getUserGamesStats =
  (userId: number, isCache: boolean = false) =>
  () =>
    fetchApi(`/user/games-stats?${queryString.stringify({ userId })}`, null, METHOD.GET, {}, isCache);
