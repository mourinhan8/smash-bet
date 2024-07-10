import { Game } from "@/common/types";

import { METHOD } from "@/common/utils/constants";
import { fetchApi } from "@/common/utils";
import queryString from "query-string";

export interface userHistory {
  id: number;
  userId: number;
  walletId: number;
  tokenId: number;
  type: number;
  startedAt: number;
  createdAt: number;
  finishedAt: number;
}

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BET = "bet",
  REWARD = "reward",
  REFERRAL = "referral",
}

export interface Transaction {
  id: number;
  userId: number;
  walletId: number;
  tokenId: number;
  type: TransactionType;
  message: string;
  value: number;
  fee: number;
  txHash: string;
  preBalance: number;
  postBalance: number;
  createdAt: number;
  startedAt: number;
  finishedAt: number;
  status?: string;
  user: {
    id: number;
    walletAddress: string;
  };
  wallet: {
    id: number;
    tokenId: number;
  };
}
export interface GetHistoryResponse<T> {
  currentPage: number;
  totalPages: number;
  transactions: T;
  total: number;
}

export const createWithdraw =
  (userId: number, amount: number, isCache: boolean = false) =>
  () =>
    fetchApi<string>(`users/withdraw`, { userId, amount }, METHOD.POST, {}, isCache);

export const getHistory =
  (userId: number, pageSize: number, page: number, type: string, isCache: boolean = false) =>
  () =>
    fetchApi<GetHistoryResponse<Transaction[]>>(
      `user/transactions?${queryString.stringify({ userId, pageSize, page, type })}`,
      {},
      METHOD.GET,
      {},
      isCache
    );
export const getBetHistory =
  (userId: number, pageSize: number, page: number, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`user/bet-history?${queryString.stringify({ userId, pageSize, page })}`, {}, METHOD.GET, {}, isCache);

export const totalValueByTransaction =
  (userId: number, type: string, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`user/total-value-transactions?${queryString.stringify({ userId, type })}`, {}, METHOD.GET, {}, isCache);
