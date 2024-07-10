import { METHOD } from "@/common/utils/constants";
import { fetchApi } from "@/common/utils";
import queryString from "query-string";

export const getChatMessages =
  (page: number, limit: number, isCache: boolean = false) =>
  () =>
    fetchApi(`/chat/message?${queryString.stringify({ page, pageSize: limit })}`, null, METHOD.GET, {}, isCache);
