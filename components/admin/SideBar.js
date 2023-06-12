import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getAuth } from "../../services/redux/features/authSlice";
import Image from "next/image";

const SideBar = () => {
  const auth = useSelector(getAuth);

  return (
    <aside className="h-screen fixed z-10 w-[230px]  text-base font-semibold text-gray-300 drop-shadow-2xl bg-[#040323]	">
      <div className="p-6 w-full items-center flex flex-col gap-2">
        <div className="relative w-16 h-16 rounded-full drop-shadow-xl">
          <Image
            src={auth?.user?.image?.url}
            fill
            object-fit="contain"
            className="absolute rounded-full"
          />
        </div>
        <div className="hover:text-gray-50 cursor-pointer">
          Hi {auth?.user?.name}!
        </div>
      </div>

      <ul className="flex flex-col items-center gap-10 mt-6">
        <li className="hover:text-gray-50 cursor-pointer">
          <Link href="/admin/">Dashboard</Link>
        </li>
        <li className="hover:text-gray-50 cursor-pointer">
          <Link href="/admin/products">Products</Link>
        </li>
        <li className="hover:text-gray-50 cursor-pointer">
          <Link href="/admin/orders">Orders</Link>
        </li>
        <li className="hover:text-gray-50 cursor-pointer">
          <Link href="/admin/users">Users</Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
