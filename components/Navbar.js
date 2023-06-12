import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  getTotalNoOfOrder,
  resetCart,
} from "../services/redux/features/cartSlice";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useHasMounted from "../hooks/useHasMounted";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const Navbar = () => {
  const hasMounted = useHasMounted();
  let currentLocation;
  if (typeof window !== "undefined") {
    currentLocation = window.location.href;
  } else {
    currentLocation = null;
  }

  const totalNoOfOrder = useSelector(getTotalNoOfOrder);
  const cartItems = useSelector(getItems);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [navBackground, setNavBackground] = React.useState("");
  const handleUserLogin = () => {
    if (session) {
      signOut({
        callbackUrl: "/",
      });
    } else {
      router.push({
        pathname: `auth/signin`,
      });
    }
  };

  React.useEffect(() => {
    const nabBarTransparent = "bg-gradient-transparent shadow-lg ";
    let navBarSolid;

    if (currentLocation === "https://myrestaurant-saidul-shiblee.vercel.app/") {
      navBarSolid = "bg-transparent";
    } else {
      navBarSolid = "bg-gradient-solid";
    }
    setNavBackground(navBarSolid);

    const handleScroll = () => {
      const show = window.scrollY < 80;
      if (show) {
        setNavBackground(navBarSolid);
      } else {
        setNavBackground(nabBarTransparent);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [currentLocation]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (menuRef.current.style.display === "none") {
      menuRef.current.style.display = "block";
      return;
    }
    menuRef.current.style.display = "none";
  };

  const menuRef = React.useRef();

  React.useEffect(() => {
    const closeModal = () => (menuRef.current.style.display = "none");
    document.addEventListener("click", closeModal);

    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [menuRef]);

  if (!hasMounted) {
    return null;
  }
  return (
    <div
      className={`w-full h-20  flex justify-between px-10 items-center ${navBackground} 
      text-white fixed top-0 z-50 transition-all duration-100 ease-in-out`}
    >
      <div className="logo text-3xl font-semibold relative w-[15%]">
        <h1>
          F<span className="text-black">o</span>
          <span className="text-black">o</span>dy
        </h1>
        <div className="semi-circle absolute bottom-0 left-7"></div>
      </div>

      <div className="w-[60%] flex justify-center ">
        <ul className="flex  gap-14 justify-center items-center w-full">
          <li className=" ">
            <Link
              href={"/#hero"}
              className="block  before:text-center relative top-0 left-0  text-base cursor-pointer before:content-['Home'] before:absolute
            before:text-[#FF6347] before:top-0 before:left-0 before:w-0
            before:overflow-hidden before:transition-all before:ease-in-out
            before:duration-300 before:hover:w-[101%] before:font-semibold before:hover:bg-white font-semibold before:hover:opacity-100 before:opacity-0 "
            >
              Home
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              href={"/#menu"}
              className="block  before:text-center relative top-0 left-0  text-base cursor-pointer before:content-['Menu'] before:absolute
            before:text-[#FF6347] before:top-0 before:left-0 before:w-0
            before:overflow-hidden before:transition-all before:ease-in-out
            before:duration-300 before:hover:w-[101%] before:font-semibold before:hover:bg-white font-semibold before:hover:opacity-100 before:opacity-0 "
            >
              Menu
            </Link>
          </li>
          <li className="   cursor-pointer">
            <Link
              href={"/#footer"}
              className="block  before:text-center relative top-0 left-0  text-base cursor-pointer before:content-['Contact\00a0Us'] before:absolute
            before:text-[#FF6347] before:top-0 before:left-0 before:w-0
            before:overflow-hidden before:transition-all before:ease-in-out
            before:duration-300 before:hover:w-[101%] before:font-semibold before:hover:bg-white font-semibold before:hover:opacity-100 before:opacity-0 "
            >
              Contact Us
            </Link>
          </li>
          <li className="   cursor-pointer">
            <a
              className="block  before:text-center relative top-0 left-0  text-base cursor-pointer before:content-['Blog'] before:absolute
            before:text-[#FF6347] before:top-0 before:left-0 before:w-0
            before:overflow-hidden before:transition-all before:ease-in-out
            before:duration-300 before:hover:w-[101%] before:font-semibold before:hover:bg-white font-semibold before:hover:opacity-100 before:opacity-0 "
            >
              Blog
            </a>
          </li>
          <li className="   cursor-pointer">
            <Link
              href={"/#about-us"}
              className="block  before:text-center relative top-0 left-0  text-base cursor-pointer before:content-['About\00a0Us'] before:absolute
            before:text-[#FF6347] before:top-0 before:left-0 before:w-0
            before:overflow-hidden before:transition-all before:ease-in-out
            before:duration-300 before:hover:w-[101%] before:font-semibold before:hover:bg-white font-semibold before:hover:opacity-100 before:opacity-0 "
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-[25%] flex justify-between items-center">
        <div className="flex justify-between items-center gap-3 ">
          <div>
            <PhoneInTalkIcon />
          </div>
          <div className="leading-5">
            <h2>Order Now!</h2>
            <h2 className="font-semibold">+88-01829-586393</h2>
          </div>
        </div>
        <div
          className="relative cursor-pointer flex flex-col justify-center items-center "
          onClick={toggleMenu}
        >
          <AccountCircleIcon fontSize={"medium"} />
          <div
            className="text-center absolute  top-[52px] bg-white text-gray-600  rounded drop-shadow-md ease-in duration-300"
            ref={menuRef}
            style={{ display: "none" }}
          >
            <ul className="divide-y divide-dashed divide-[#FF6347] py-1 ">
              <li className="  px-4 py-1 ease-in duration-150">
                <a href="#">
                  Hi!{" "}
                  {session
                    ? session?.user?.name.split(" ")[0].toUpperCase()
                    : "Guest"}
                </a>
              </li>
              <li className="hover:bg-gray-300 px-4 py-1 ease-in duration-150">
                <Link
                  href="#"
                  className="flex items-center justify-start gap-2"
                >
                  <SettingsIcon fontSize={"small"} />
                  Settings
                </Link>
              </li>
              <li className="hover:bg-gray-300 px-4 py-1 ease-in duration-150">
                <Link
                  href="/order"
                  className="flex items-center justify-start gap-2"
                >
                  <FormatListBulletedIcon fontSize={"small"} />
                  Orders
                </Link>
              </li>
              <li
                className="hover:bg-gray-300 px-4 py-1 ease-in duration-150 flex items-center  justify-start gap-2"
                onClick={handleUserLogin}
              >
                {session ? (
                  <>
                    <LogoutIcon fontSize={"small"} /> Logout
                  </>
                ) : (
                  <>
                    <LoginIcon fontSize={"small"} /> Login
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        <Link href={"/cart"}>
          <div className=" relative cursor-pointer">
            <ShoppingBagIcon fontSize={"medium"} />
            <div className="  text-xs font font-semibold absolute w-4 h-4 rounded-full bg-white text-[#FF6347] -top-1 -right-1 flex justify-center items-center">
              {session && session?.user?.id === cartItems?.[0]?.userId
                ? totalNoOfOrder
                : 0}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
