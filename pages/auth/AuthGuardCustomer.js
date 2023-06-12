import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const AuthGuardCustomer = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(router);
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === "loading") return;
    if (!isUser)
      router.push(
        { pathname: "/auth/signin" },
        router.asPath
        // {
        //   shallow: true,
        // }
      );
  }, [isUser, status]);
  if (isUser) {
    return children;
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center text-white text-4xl"></div>
  );
};

export default AuthGuardCustomer;
