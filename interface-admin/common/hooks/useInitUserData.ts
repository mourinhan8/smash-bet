import { getMeProfile } from "@/common/api/admin";
import { AuthContext, AuthContextState } from "@/common/hooks/useAuth";
import { useContext } from "react";

export default function useInitUserData() {
  const { dispatch } = useContext(AuthContext);

  const initUserData = async () => {
    try {
      const { data } = (await getMeProfile()).data;
      dispatch({
        type: "setInitialState",
        data: {
          user: "",
          wallet: "",
          isAuthenticated: true,
          isInitial: true,
          // profile: {
          //   wallet: '',
          //   email: data.userInfo.email,
          //   userRole: data.userInfo.userRole,
          //   verifiedEmail: data.userInfo.verifiedEmail,
          // },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return initUserData;
}
