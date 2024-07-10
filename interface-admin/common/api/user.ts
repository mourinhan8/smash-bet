import { IMeProfile, IMeResponse, UserRole } from "@/common/types";
import { ListResponse, Rating } from "@/common/types";

import { IAuthInformation } from "./../types/index";
import { METHOD } from "@/common/utils/constants";
import { fetchApi } from "@/common/utils";
import queryString from "query-string";

export interface IUpdateProfileDTO {
  roleType?: UserRole;
  wallet_address?: string;
  skills?: string[];
}

export const getMeProfile = (isCache: boolean = false) => {
  return fetchApi<IMeResponse>(`user/me`, null, METHOD.GET, {}, isCache);
};

export const updateUserProfile = (id: string, body: IUpdateProfileDTO, isCache: boolean = false) => {
  return fetchApi<IMeProfile>(`profile/update/${id}`, body, METHOD.PUT, {}, isCache);
};

export const getMeProfileDetail =
  (id: string, isCache: boolean = false) =>
  () =>
    fetchApi<IMeProfile>(`profile/detail/${id}`, {}, METHOD.GET, {}, isCache);

export const getOAuth2Information = (isCache: boolean = false) => {
  return fetchApi<IAuthInformation>(`auth/information`, null, METHOD.GET, {}, isCache);
};

export const signUpLocal =
  (data: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`user/signup`, data, METHOD.POST, isCache);

export const getOtpSignup =
  (data: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`user/get-otp`, data, METHOD.POST, isCache);

export const verifyOtpEmail =
  (data: any, isCache: boolean = false) =>
  () =>
    fetchApi<any>(`user/verify-otp`, data, METHOD.POST, isCache);
