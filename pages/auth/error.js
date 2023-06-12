import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Link from "next/link";

const error = ({ error }) => {
  return (
    <div className="flex justify-center items-center  h-[calc(100vh_-_80px)]">
      <div className="p-10 flex flex-col justify-center items-center text-gray-600 text-lg gap-2">
        <ReportGmailerrorredIcon fontSize="large" className="text-red-500" />
        {error}
        <Link className="text-sm text-blue-600 underline" href="/auth/signin">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const error = context.query;
  console.log(context.query);
  return {
    props: error,
  };
}

export default error;
