import { Game } from "@/common/types";

import { METHOD } from "@/common/utils/constants";
import { fetchApi } from "@/common/utils";
import queryString from "query-string";

export interface GetGameResultsResponse<T> {
  currentPage: number;
  totalPages: number;
  games: T;
}

export interface GetBetForCharacterParams {
  gameId: number;
  characterId: number;
}
export interface BetInfo {
  id: number;
  userId: number;
  walletId: number;
  tokenId: number;
  amount: number;
  gameId: number;
  characterId: number;
  createdAt: number;
  updatedAt: any;
  userWallet: string;
}

export interface NextGame {
  id: number;
  type: string;
  firstCharacterId: number;
  secondCharacterId: number;
  thirdCharacterId: number;
  fourthCharacterId: number;
  status: string;
  startedAt: number;
}

export interface CurrentGame {
  id: number;
  type: string;
  streamUrl: string;
  firstCharacterId: number;
  rateFirst: number;
  secondCharacterId: number;
  rateSecond: number;
  thirdCharacterId: number;
  rateThird: number;
  fourthCharacterId: number;
  rateFourth: number;
  status: string;
  createdAt: number;
  startedAt: number;
  finishedAt: number;
}

export interface GetGameNextResponse {
  next: NextGame;
}
export interface GetCurrentGameResponse {
  games: CurrentGame;
}

export interface PlaceBetParams {
  userId: number;
  gameId: number;
  characterId: number;
  amount: number;
}

export const getGamesResult = (page: number, pageSize: number, isCache: boolean = false) =>
  fetchApi<GetGameResultsResponse<Game[]>>(`games/stats?${queryString.stringify({ page, pageSize })}`, {}, METHOD.GET, {}, isCache);

export const getBetForCharacter = ({ gameId, characterId }: GetBetForCharacterParams, isCache = false) =>
  fetchApi<BetInfo[]>(`games/bet-for-character?${queryString.stringify({ gameId, characterId })}`, {}, METHOD.GET, {}, isCache);

export const getGameNext = (isCache = false) => fetchApi<GetGameNextResponse>(`games/next`, {}, METHOD.GET, {}, isCache);
export const getCurrentGame = (isCache = false) => fetchApi<GetCurrentGameResponse>(`games/get-current-game`, {}, METHOD.GET, {}, isCache);

export const placeBet = (data: PlaceBetParams, isCache = false)  => () => fetchApi<string>(`games/place-bet`, data, METHOD.POST, {}, isCache);

export const getGameEstimate =
  (userId: number, isCache: boolean = false) =>
  () =>
    fetchApi(`games/estimate?${queryString.stringify({ userId })}`, null, METHOD.GET, {}, isCache);
