import React from "react";
import { useDispatch, useSelector } from "react-redux";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { getAuth, signOut } from "../../services/redux/features/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordModal = ({ open, handleModal }) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const axiosPrivate = usePrivateAxios();
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  //Close Modal
  const handleClose = () => {
    handleModal();
  };
  //notify
  const notify = (msg, status) => toast[status](msg);

  //check if the old password is correct
  const checkOldPassword = async (e) => {
    try {
      const res = await axiosPrivate.post("api/auth/check_password", {
        email: auth?.user?.email,
        password: oldPassword,
      });
      console.log(res);
    } catch (error) {
      notify(error.response.data.error.message, "error");
      setOldPassword("");
    }
  };
  //Check if the password matches the required format
  const checkPassword = (e) => {
    const isMatched = passwordPattern.test(e.target.value);
    if (!isMatched) {
      notify(
        "Password must contain at least one capital letter,one number,one special character and eight character",
        "error"
      );
      setNewPassword("");
      return;
    }
  };
  //Change Password
  const handleChangePassword = async () => {
    //Check if new and old password are same
    if (oldPassword === newPassword) {
      notify("Old & New Password Cannot be Same", "error");
      setNewPassword("");
      setOldPassword("");
      return;
    }
    if (oldPassword && newPassword) {
      try {
        const res = await axiosPrivate.post("api/auth/change_password", {
          email: auth?.user?.email,
          newPassword,
          oldPassword,
        });
        notify(res.data.message + ",Please re login", "success");
        dispatch(signOut({}));
      } catch (error) {
        console.log(error);
      }
    }
    setNewPassword("");
    setOldPassword("");
    handleModal();
  };
  return open ? (
    <div
      className={`fixed  inset-0 z-10 flex flex-col items-center justify-center 
      animate__animated   animate__faster  animate__fadeInDown`}
    >
      <div
        className={` flex flex-col  justify-center w-96 shadow-xl bg-gray-100 `}
      >
        <div className="flex justify-between w-full pb-2 pt-4 px-4">
          <div className="font-semibold text-2xl text-gray-500 ">
            Change Password
          </div>
          <div
            className="font-semibold text-md text-gray-500 cursor-pointer"
            onClick={handleClose}
          >
            X
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-gray-600/40"></div>
        <div className="py-8 px-4 flex flex-col justify-center items-center gap-4 ">
          <input
            className="placeholder:text-gray-400 placeholder:text-xs placeholder: px-2 placeholder:font-semibold
            appearance-none  border border-gray-300 px-2 py-1 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm
            "
            type="password"
            required
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            onBlur={checkOldPassword}
          />
          <input
            className="placeholder:text-gray-400 placeholder:text-xs placeholder: px-2 placeholder:font-semibold
            appearance-none  border border-gray-300 px-2 py-1 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm
            "
            placeholder="New Password"
            type="password"
            required
            onBlur={checkPassword}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="w-full h-[0.5px] bg-gray-600/40"></div>
        <div className="flex pt-2 pb-4 px-4 justify-end gap-2 items-center">
          <button
            type="submit"
            className={`${
              !oldPassword || !newPassword
                ? "bg-gray-300 text-gray-600 "
                : "bg-cyan-500 text-white"
            }  px-2 py-1  cursor-pointer`}
            onClick={handleChangePassword}
            disabled={!oldPassword || !newPassword}
          >
            Change Password
          </button>
          <button
            className=" bg-red-500 px-2 py-1 text-white cursor-pointer"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ChangePasswordModal;
