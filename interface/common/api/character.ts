import { Character, GetAllCharactersResponse } from "@/common/types";

import { METHOD } from "@/common/utils/constants";
import { fetchApi } from "@/common/utils";

export const getAllCharacters = (isCache: boolean = false) =>
  fetchApi<GetAllCharactersResponse<Character[]>>(`characters/get-all`, {}, METHOD.GET, {}, isCache);
