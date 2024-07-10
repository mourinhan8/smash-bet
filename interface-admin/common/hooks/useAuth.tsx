import { IMeProfile, IUserProfile, UserRole } from "@/common/types";
import React, { createContext, useCallback, useEffect, useReducer } from "react";

import { APP_TOKEN_KEY, APP_VERIFY_KEY } from "@/common/utils/constants";

import instance from "@/common/utils/fetch";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { handleApi } from "../utils";
import { loginAdminApi, verifyOtpLogin, getMeProfile } from "../api/admin";

type Action =
  | { type: "setUser"; data: any }
  | { type: "setProfile"; data: any }
  | { type: "setAuthenticated"; data: any }
  | { type: "setInitial"; data: any }
  | { type: "setRole"; data: UserRole }
  | { type: "setSFBalance"; data: any }
  | { type: "setInitialState"; data: any }
  | { type: "reset" };
type Dispatch = (action: Action) => void;

export type AuthContextState = {
  user: string;
  isAuthenticated: boolean;
  isInitial: boolean;
  profile: IUserProfile;
};
type AuthProviderProps = { children: React.ReactNode };

const initialState: AuthContextState = {
  user: "",
  isAuthenticated: false,
  isInitial: false,
  profile: {} as IUserProfile,
};

export const AuthContext = createContext<{ state: AuthContextState; dispatch: Dispatch } | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //Init data from api
    const token = localStorage.getItem(APP_TOKEN_KEY);
    if (token) {
      (async () => {
        try {
          const { data } = (await getMeProfile()).data;
          if (data) {
            dispatch({
              type: "setInitialState",
              data: {
                isAuthenticated: true,
                isInitial: true,
                profile: {
                  email: data.email,
                  wallet: data.wallet
                },
              } as AuthContextState,
            });
          } else {
            localStorage.removeItem(APP_TOKEN_KEY);
            localStorage.removeItem("smash_key");
            dispatch({ type: "setAuthenticated", data: false });
            dispatch({ type: "setProfile", data: {} as IMeProfile });
            dispatch({ type: "setUser", data: "" });
            instance.defaults.headers.common["Authorization"] = ``;
            // dispatch({ type: "reset" });
            window.location.href = "/";
          }
        } catch (error) {
          console.log(error);
          localStorage.removeItem(APP_TOKEN_KEY);
          localStorage.removeItem("smash_key");
          dispatch({ type: "setAuthenticated", data: false });
          dispatch({ type: "setProfile", data: {} as IMeProfile });
          dispatch({ type: "setUser", data: "" });
          instance.defaults.headers.common["Authorization"] = ``;
          // dispatch({ type: "reset" });
          window.location.href = "/";
        }
      })();
    }
  }, []);
  const value = { state, dispatch };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.data,
      };
    case "setProfile":
      return {
        ...state,
        profile: action.data,
      };
    case "setAuthenticated":
      return {
        ...state,
        isAuthenticated: action.data,
      };
    case "setInitial":
      return {
        ...state,
        isInitial: action.data,
      };
    case "setInitialState":
      return {
        ...state,
        ...action.data,
      };
    case "setRole":
      return {
        ...state,
        profile: {
          ...state.profile,
          role: action.data,
        },
      };
    case "setSFBalance":
      return {
        ...state,
        profile: {
          ...state.profile,
          sfBalance: action.data,
        },
      };
    case "reset":
      return initialState;

    default:
      return state;
  }
};

export const useAuth = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  const router = useRouter();

  const loginLocal = async (email: string, password: string) => {
    const response = await handleApi(loginAdminApi({ email, password }));
    const { data } = response;
    if (data) {
      const verifyToken = data.data.token;
      localStorage.setItem(APP_VERIFY_KEY, verifyToken);
    }
    return response;
  };

  const verifyLogin = async (token: string, otp: string) => {
    const response = await handleApi(verifyOtpLogin({ verifyToken: token, otp }));
    const { data } = response;
    if (data) {
      const accessToken = data.data.token;
      if (accessToken) {
        localStorage.removeItem(APP_VERIFY_KEY);
        localStorage.setItem(APP_TOKEN_KEY, accessToken);
        dispatch({ type: "setProfile", data: response.data.data });
        dispatch({ type: "setAuthenticated", data: true });
      }
    }
    return response;
  };

  const logout = async () => {
    localStorage.removeItem(APP_TOKEN_KEY);
    dispatch({ type: "setAuthenticated", data: false });
    dispatch({ type: "setProfile", data: {} as IMeProfile });
    dispatch({ type: "setUser", data: "" });
    instance.defaults.headers.common["Authorization"] = ``;
    // dispatch({ type: "reset" });
    router.push("/authen/login");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(APP_TOKEN_KEY);
    if (!accessToken) {
      dispatch({ type: "setInitial", data: true });
      dispatch({ type: "setAuthenticated", data: false });
    }
  }, [dispatch]);

  return {
    user: state.user,
    isInitial: state.isInitial,
    logout,
    loginLocal,
    verifyLogin,
    isAuthenticated: state.isAuthenticated,
    profile: state.profile,
  };
};
