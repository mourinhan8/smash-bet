import { fetchApi } from "@/common/utils";
import { METHOD } from "@/common/utils/constants";
import queryString from "query-string";
import { IMeResponse } from "../types";

export const loginAdminApi =
  (data: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`admin/login`, data, METHOD.POST, isCache);

export const verifyOtpLogin =
  (data: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`admin/verify2fa`, data, METHOD.POST, isCache);

export const createAdmin =
  (data: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`admin/create-admin`, data, METHOD.POST, isCache);

export const getMeProfile = (isCache: boolean = false) => {
  return fetchApi<IMeResponse>(`admin/me`, null, METHOD.GET, {}, isCache);
};

export const cancelDeposit =
  (id: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`admin/cancel-deposit/${id}`, {}, METHOD.PUT, {}, isCache);

export const getListWithdraw =
  (page: number, pageSize: number, status: string = null, userWallet: string = null, isCache: boolean = false) =>
  () =>
    fetchApi<any>(
      `admin/get-withdraw-request?${queryString.stringify({ page, pageSize, status, userWallet })}`,
      null,
      METHOD.GET,
      {},
      isCache
    );

export const resolveWithdraw =
  (requestId: any, result: string, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`admin/resolve-withdraw-request`, { requestId, result }, METHOD.POST, {}, isCache);

export const hashVerifier =
  (txHash: string, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`verify-hash?${queryString.stringify({ hash: txHash })}`, null, METHOD.GET, {}, isCache);

export const finishGame =
  (gameId: number, winnerId: number, isCache: boolean = false) =>
  () =>
    fetchApi(`admin/game-result`, { gameId, winnerId }, METHOD.POST, {}, isCache);

export const getWinnerInfoByGame =
  (gameId: string, isCache: boolean = false) =>
  () =>
    fetchApi(`games/winner?${queryString.stringify({ id: gameId })}`, null, METHOD.GET, {}, isCache);

export const createNewGame =
  (
    gameType: string,
    firstCharacterId: number,
    rateFirst: number,
    secondCharacterId: number,
    rateSecond: number,
    thirdCharacterId: number,
    rateThird: number,
    fourthCharacterId: number,
    rateFourth: number,
    streamUrl: string,
    startedAt: number,
    finishedAt: number,
    isCache: boolean = false
  ) =>
  () =>
    fetchApi(
      `admin/game-create`,
      {
        gameType,
        firstCharacterId,
        rateFirst,
        secondCharacterId,
        rateSecond,
        thirdCharacterId,
        rateThird,
        fourthCharacterId,
        rateFourth,
        streamUrl,
        startedAt,
        finishedAt,
      },
      METHOD.POST,
      {},
      isCache
    );

export const getCurrentGame =
  (isCache: boolean = false) =>
  () =>
    fetchApi(`admin/get-current-game`, null, METHOD.GET, {}, isCache);

export const getGameNext =
  (isCache = false) =>
  () =>
    fetchApi(`games/next`, {}, METHOD.GET, {}, isCache);

export const getAllCharacters =
  (isCache: boolean = false) =>
  () =>
    fetchApi(`characters/get-all`, null, METHOD.GET, {}, isCache);

export const getListGames =
  (page: number = 1, pageSize: number = 20, isCache: boolean = false) =>
  () =>
    fetchApi(`games/stats?page=${page}&pageSize=${pageSize}`, null, METHOD.GET, {}, isCache);

export const getListBetByGameId =
  (gameId: number, characterId: number = null, isCache: boolean = false) =>
  () =>
    fetchApi(`games/bet-for-character?gameId=${gameId}`, null, METHOD.GET, {}, isCache);
