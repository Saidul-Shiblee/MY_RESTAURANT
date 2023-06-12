import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutAdmin from "../../components/LayoutAdmin";
import { getAuth, signOut } from "../../services/redux/features/authSlice";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import LockResetSharpIcon from "@mui/icons-material/LockResetSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import "animate.css";
import ChangePasswordModal from "../../components/admin/ChangePasswordModal";
import { useGetOrdersQuery } from "../../services/redux/features/orderApiSlice";
import { useGetDashboardInfoQuery } from "../../services/redux/features/dashboardApiSlice";
import Loader from "../../components/admin/Loader";
import {
  useEditNotificationMutation,
  useGetNotificationsQuery,
} from "../../services/redux/features/notificationApiSlice";

const Dashboard = () => {
  const menuRef = React.useRef();
  const notificationRef = React.useRef();
  const [skip, setSkip] = React.useState(true);
  const auth = useSelector(getAuth);
  const { data, isLoading, error } = useGetDashboardInfoQuery(undefined, {
    pollingInterval: 5000,
  });
  console.log(data);

  const {
    data: notifications,
    isLoading: notificationLoading,
    error: notificationError,
  } = useGetNotificationsQuery(undefined, {
    skip,
  });
  console.log(skip);
  const dispatch = useDispatch();
  const [changePasswordModal, setChangePasswordModal] = React.useState(false);
  const [editNotification, {}] = useEditNotificationMutation();

  const handleChangePasswordModal = () => {
    setChangePasswordModal(!changePasswordModal);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };
  const toggleMenu = (e) => {
    e.stopPropagation();
    if (menuRef.current.style.display === "none") {
      menuRef.current.style.display = "block";
      return;
    }
    menuRef.current.style.display = "none";
  };
  const toggleNotification = (e) => {
    e.stopPropagation();
    if (notificationRef.current.style.display === "none") {
      setSkip((prev) => !prev);
      notificationRef.current.style.display = "block";
      return;
    }
    notificationRef.current.style.display = "none";

    setSkip((prev) => !prev);
  };

  const changeNotificationStatus = (el) => {
    console.log(el._id);
    if (el.status === false) {
      editNotification({
        notificationId: el._id,
        data: {
          status: true,
          readBy: auth?.user?.name,
        },
      });
    }
  };

  React.useEffect(() => {
    const closeModal = () => (menuRef.current.style.display = "none");
    document.addEventListener("click", closeModal);

    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [menuRef]);

  React.useEffect(() => {
    const closeNotification = () => {
      notificationRef.current.style.display = "none";
      setSkip((prev) => !prev);
    };
    document.addEventListener("click", closeNotification);

    return () => {
      document.removeEventListener("click", closeNotification);
    };
  }, [notificationRef]);

  return (
    <>
      <div className="ml-[230px] w-[calc(100vw_-_235px)] h-full px-4 py-10 flex flex-col gap-6 ">
        <div className="flex justify-between  ">
          <div className="flex grow">
            <div class=" relative mx-auto text-gray-600">
              <input
                class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />
              <button
                type="submit"
                class="absolute right-2 -translate-y-1/2 top-1/2 text-center"
              >
                <SearchIcon fontSize="small" />
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative " onClick={toggleNotification}>
              <NotificationsActiveIcon
                fontSize="large"
                className="w-20 h-20 bg-gray-400/60 p-2 rounded-full shadow-md hover:shadow-xl cursor-pointer"
              />
              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full -top-[11px] -right-[11px] dark:border-gray-900 ">
                {data && data.result.totalNotifications}
              </div>

              <div
                ref={notificationRef}
                style={{ display: "none" }}
                className="z-50 animate__animated  animate__flipInX animate__faster top-10 -left-80 text-center absolute  bg-white text-gray-600  rounded drop-shadow-md ease-in duration-300 h-[450px]  overflow-y-scroll divide-y divide-dashed"
              >
                {notificationLoading &&
                  !notificationError &&
                  !notifications && <Loader />}
                {!notificationLoading &&
                  notificationError &&
                  !notifications && <p>Somthing Went Wrong!</p>}
                {!notificationLoading &&
                  !notificationError &&
                  notifications && (
                    <>
                      {notifications.result.map((el) => (
                        <p
                          className={`p-3  cursor-pointer hover:bg-slate-300 ${
                            el.status === false
                              ? " bg-slate-200 font-semibold"
                              : "bg-white"
                          }`}
                          key={el._id}
                          onClick={() => changeNotificationStatus(el)}
                        >
                          {el.message}
                        </p>
                      ))}
                    </>
                  )}
              </div>
            </div>
            <div className="relative" onClick={toggleMenu}>
              <ManageAccountsSharpIcon
                fontSize="large"
                className="w-20 h-20 bg-gray-400/60 p-2 rounded-full shadow-md hover:shadow-xl cursor-pointer"
              />
              <div
                className="z-50 animate__animated  animate__flipInX animate__faster top-10 -left-20 text-center absolute  bg-white text-gray-600  rounded drop-shadow-md ease-in duration-300"
                ref={menuRef}
                style={{ display: "none" }}
              >
                <ul className="divide-y divide-dashed divide-[#FF6347] py-1 ">
                  <li className="hover:bg-gray-300 px-4 py-1 ease-in duration-150 flex gap-2 cursor-pointer items-center">
                    <SettingsIcon fontSize={"small"} />
                    Account Settings
                  </li>
                  <li
                    className="hover:bg-gray-300 px-4 py-1 ease-in duration-150 flex gap-2 cursor-pointer items-center"
                    onClick={() => {
                      handleChangePasswordModal();
                    }}
                  >
                    <LockResetSharpIcon fontSize={"small"} />
                    Change Password
                  </li>
                  <li
                    className="hover:bg-gray-300 px-4 py-1 ease-in duration-150 flex gap-2 cursor-pointer items-center"
                    onClick={handleSignOut}
                  >
                    <LogoutSharpIcon fontSize={"small"} />
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <Loader />}
        {!isLoading && !data && error && <p>Something went wrong</p>}
        {!isLoading && !error && data && (
          <div className="flex w-full justify-between relative px-10 gap-4">
            <div class=" justify-center w-1/4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 flex  items-center gap-10">
              <ProductionQuantityLimitsIcon
                style={{ fontSize: 60 }}
                className="w-28 h-28 bg-gray-400/60 p-2 rounded-full shadow-md hover:shadow-xl cursor-pointer"
              />
              <div className="flex flex-col">
                <h2 class="font-bold text-4xl text-gray-700 ">
                  {data.result.totalProducts}
                </h2>
                <h2 class="font-normal text-gray-700 ">TOTAL</h2>
                <h2 class="font-normal text-gray-700 ">MENU</h2>
              </div>
            </div>
            <div class=" justify-center w-1/4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 flex  items-center gap-10">
              <ViewModuleIcon
                style={{ fontSize: 60 }}
                className="w-28 h-28 bg-gray-400/60 p-2 rounded-full shadow-md hover:shadow-xl cursor-pointer"
              />
              <div className="flex flex-col">
                <h2 class="font-bold text-4xl text-gray-700 ">
                  {data.result.totalOrders}
                </h2>
                <h2 class="font-normal text-gray-700 ">NEW</h2>
                <h2 class="font-normal text-gray-700 ">ORDERS</h2>
              </div>
            </div>
            <div class=" justify-center w-1/4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 flex  items-center gap-10">
              <ProductionQuantityLimitsIcon
                style={{ fontSize: 60 }}
                className="w-28 h-28 bg-gray-400/60 p-2 rounded-full shadow-md hover:shadow-xl cursor-pointer"
              />
              <div className="flex flex-col">
                <h2 class="font-bold text-4xl text-gray-700 ">
                  {data.result.totalCustomers}
                </h2>
                <h2 class="font-normal text-gray-700 ">TOTAL</h2>
                <h2 class="font-normal text-gray-700 ">CUSTOMERS</h2>
              </div>
            </div>
            <div class=" justify-center w-1/4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 flex  items-center gap-10">
              <ProductionQuantityLimitsIcon
                style={{ fontSize: 60 }}
                className="w-28 h-28 bg-gray-400/60 p-2 rounded-full shadow-md hover:shadow-xl cursor-pointer"
              />
              <div className="flex flex-col">
                <h2 className="font-bold text-4xl text-gray-700 ">
                  <span className="text-lg font-normal">Tk.</span>{" "}
                  {data.result.todaysSale}
                </h2>
                <h2 class="font-normal text-gray-700 ">TODAYS</h2>
                <h2 class="font-normal text-gray-700 ">TOTAL SALE</h2>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChangePasswordModal
        open={changePasswordModal}
        handleModal={handleChangePasswordModal}
      />
    </>
  );
};
Dashboard.layout = LayoutAdmin;
Dashboard.requiredAuthAdmin = true;
export default Dashboard;
