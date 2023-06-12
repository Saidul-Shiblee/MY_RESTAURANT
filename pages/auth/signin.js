import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getProviders, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Signin({ providers }) {
  const router = useRouter();
  const providerIcon = {
    Facebook: {
      icon: <FacebookIcon fontSize="small" />,
      style:
        " px-2 py-1 text-gray-500 shadow-lg bg-white rounded-sm flex items-center gap-2 cursor-pointer  hover:text-[#3b5998] font-semibold transition-all duration-300 ease-linear",
    },
    Twitter: {
      icon: <TwitterIcon fontSize="small" />,
      style:
        " px-2 py-1 text-gray-500 shadow-lg bg-white rounded-sm flex items-center gap-2 cursor-pointer  hover:text-[#00acee] font-semibold transition-all duration-300 ease-linear",
    },
    Google: {
      icon: <GoogleIcon fontSize="small" />,
      style:
        " px-2 py-1 text-gray-500 shadow-lg bg-white rounded-sm flex items-center gap-2 cursor-pointer hover:text-[#db3236] font-semibold transition-all duration-300 ease-linear",
    },
    GitHub: {
      icon: <GitHubIcon fontSize="small" />,
      style:
        " px-2 py-1 text-gray-500 shadow-lg bg-white rounded-sm flex items-center gap-2 cursor-pointer hover:text-black font-semibold transition-all duration-300 ease-linear",
    },
  };

  return (
    <div className="flex h-[calc(100vh_-_80px)] justify-center items-center">
      <div className="flex flex-col  gap-4 bg-[#d1411e] p-20 shadow-lg">
        {Object.values(providers).map((provider) => {
          const providerName = provider.name;
          return (
            <div
              key={providerName}
              className={providerIcon[providerName].style}
              onClick={() => signIn(provider.id)}
            >
              {providerIcon[providerName].icon}
              <p>Sign In {providerName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  const providers = await getProviders();

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: { providers },
  };
}
