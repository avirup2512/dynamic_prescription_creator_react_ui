import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { SetLoggedInUser } from "@/features/auth/store/AuthSlice";
import { useDispatch } from "react-redux";

import AuthService from "../features/auth/service/AuthService";

async function isAuthenticated()
{
    try {            
        const user = await AuthService.verifyMe();
        if(user && user.success)
        {
            return user;
        }
        return null;
    } catch (error) {            
        return false;
    }
}
function AuthGuard({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthentication] = useState(false);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const user = await isAuthenticated();
        console.log(user)
        let isVerify = user && user.success ? true : false;
        console.log(isVerify)
        console.log(user.data)
        if (isVerify && user.data)
        {
            dispatch(SetLoggedInUser(user.data?.user));
        }
        setAuthentication(isVerify);
      } catch (error) {
        setAuthentication(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);
  if (loading) {
    return "Loading ....";
  }
  if (authenticated && pathName && pathName[1] === "dashboard") {
    return children;
  } else if (authenticated && pathName && pathName[1] === "auth")
  {
    return <Navigate to="/dashboard" />
  }
  else if (!authenticated && pathName && pathName[1] === "dashboard")
  {
    return <Navigate to="/auth" />;
  }
  return children;
}
export default AuthGuard;
