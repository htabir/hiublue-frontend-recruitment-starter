import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const useAuth = () => {

  const authInfo = useContext(AuthContext);
  if(!authInfo) throw new Error("authInfo Error");
  return authInfo;
};

export default useAuth;
