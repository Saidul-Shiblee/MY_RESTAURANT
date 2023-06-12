import { useRouter } from "next/router";
isEmpty;
import React from "react";
import { useSelector } from "react-redux";
import useHasMounted from "../../hooks/useHasMounted";
import isEmpty from "../../lib/isEmpty";
import { getAuth } from "../../services/redux/features/authSlice";

const AuthGuardAdmin = ({ children }) => {
  const auth = useSelector(getAuth);
  const router = useRouter();
  const hasMounted = useHasMounted();
  React.useEffect(() => {
    if (isEmpty(auth)) router.push({ pathname: "/admin/login" }, router.asPath);
  }, [JSON.stringify(auth), router]);
  if (!isEmpty(auth)) {
    return children;
  }
  if (!hasMounted) {
    return null;
  }
  return (
    <div className="w-screen h-screen  flex justify-center items-center text-white text-4xl"></div>
  );
};

export default AuthGuardAdmin;
