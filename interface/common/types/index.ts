export enum ResponseStatus {
  OK = "OK",
  NOK = "NOK",
}

export interface Abi {
  name: string;
  address: string;
  chain_id: string;
  abi: any;
}

export interface FetchReducer {
  loading: false;
  error: null;
  success: null;
}

export interface GetAllCharactersResponse<T> {
  count: number;
  rows: T;
}

export interface Network {
  _id: string;
  chain_id: string;
  block_explorer_url: string;
  usdt_address: string;
  scan_domain: string;
  currency_symbol: string;
  swap_address: string;
  new_rpc_url: string;
  scan_api_key: string;
  wrap_token_address: string;
  currency_name: string;
  network_name: string;
  gnosis_server_url: string;
  root_scan_domain: string;
  created_at: Date;
  updated_at: Date;
}

export interface Abi {
  name: string;
  address: string;
  chain_id: string;
  abi: any;
}

export interface AbiResponse {
  status: string;
  data: Abi[];
}
export interface AbiState {
  abi: AbiResponse;
  loading: boolean;
}

export interface Environment {
  block_explorer_url: string;
  chain_id: string;
  className: string;
  created_at: Date;
  currency_name: string;
  currency_symbol: string;
  gnosis_server_url: string;
  network_name: string;
  new_rpc_url: string;
  objectId: string;
  scan_api_key: string;
  scan_domain: string;
  swap_address: string;
  updated_at: Date;
  usdt_address: string;
  wrap_token_address: string;
  root_scan_domain: string;
}

export interface EnvironmentResponse {
  status: string;
  success: string;
  message: string;
  data: Environment[];
}
export interface EnvironmentState {
  environment: EnvironmentResponse;
  loading: boolean;
}

export interface Character {
  id: number;
  name: string;
  former: string;
  image: string;
  win: number;
  lost: number;
  updatedAt: number;
}

export interface Game {
  id: number;
  firstCharacterId: number;
  secondCharacterId: number;
  thirdCharacterId: number;
  fourthCharacterId: number;
  status: string;
  winnerId: number;
  finishedAt: number;
}
