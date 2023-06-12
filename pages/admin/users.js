import React, { useState, useEffect, useRef, useMemo, createRef } from "react";
import AddUser from "../../components/admin/AddUser";
import LayoutAdmin from "../../components/LayoutAdmin";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import isEmpty from "../../lib/isEmpty";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "animate.css";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import { useDispatch } from "react-redux";
import { signOut } from "../../services/redux/features/authSlice";
import loadingImage from "../../public/images/loading.gif";
import Image from "next/image";
import Loader from "../../components/admin/Loader";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserMutation,
  useGetUsersQuery,
} from "../../services/redux/features/userApiSlice";
const Users = () => {
  const dispatch = useDispatch();
  const axiosPrivate = usePrivateAxios();
  const [addUserModal, setAddUserModal] = useState(false);
  const [details, setDetails] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const { data: users, error, isLoading } = useGetUsersQuery();
  const handleAddUserModal = () => {
    setAddUserModal(!addUserModal);
  };
  const handleConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
  };

  const [editUser, {}] = useEditUserMutation();
  const [deleteUser, {}] = useDeleteUserMutation();
  const [getUser, {}] = useGetUserMutation();
  let menuRef;
  if (users) {
    menuRef = users.users.map(() => React.createRef());
  }

  const toggleMenu = (e, i) => {
    e.stopPropagation();
    if (menuRef[i].current.style.display === "none") {
      for (const index in menuRef) {
        if (i === Number(index)) {
          menuRef[Number(index)].current.style.display = "block";
        } else {
          menuRef[Number(index)].current.style.display = "none";
        }
      }
      return;
    }
    menuRef[i].current.style.display = "none";
  };
  // close menu on click anywhere
  useEffect(() => {
    const closeModal = () => {
      if (menuRef) {
        for (const item of menuRef) {
          item.current.style.display = "none";
        }
      }
    };
    document.addEventListener("click", closeModal);
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [menuRef]);

  //change status of the user

  const handleStatus = async (id, status) => {
    let newStatus = status === 1 ? 0 : 1;
    try {
      await editUser({
        userId: id,
        body: { status: newStatus },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!users && null}
      {isLoading && !error && !users && <Loader />}
      {!isLoading && error && !users && <p>Something went wrong</p>}
      <div className="absolute ml-[230px] w-[calc(100vw_-_235px)] flex flex-col h-full  text-white">
        <div className=" flex justify-end px-2 py-8">
          <a
            onClick={() => {
              handleAddUserModal();
              setDetails({});
            }}
            className="px-2 py-1 bg-slate-600/90 text-red cursor-pointer "
          >
            Add User
          </a>
        </div>
        <div className="flex gap-8 w-full px-4 justify-around flex-wrap ">
          {/* User Card */}

          {!isLoading &&
            !error &&
            users &&
            users.users.map((el, i) => (
              <div className="flex bg-white flex-col rounded-lg pb-1 shadow-md w-1/6 relative group cursor-pointer hover:scale-[1.01] hover:shadow-xl transition-all ease-in-out duration-100">
                <div className="w-full">
                  <Image
                    src={el?.image?.url}
                    alt="User Image"
                    width={155}
                    height={155}
                    className="object-cove w-full h-[155px] rounded-tl-lg	 rounded-tr-lg	"
                  />
                </div>
                <div className="text-slate-600 text-xs font-semibold px-1 w-full ">
                  <p>User: {el.name}</p>
                  <p>Role: {el.role}</p>
                  <p>Status: {el.status === 1 ? "Active" : "Inactive"}</p>
                </div>
                <div
                  className={`absolute hidden right-1 top-1 text-black animate__animated animate__flipInX animate__faster  group-hover:flex justify-center items-center rounded-full bg-gray-600/40 w-6 h-6`}
                >
                  <MoreVertIcon
                    fontSize="small"
                    className="text-white"
                    onClick={(e) => {
                      toggleMenu(e, i);
                    }}
                  />
                </div>
                <div
                  className="text-center absolute  right-0 top-[30px] z-10 bg-white text-gray-600  rounded drop-shadow-md animate__animated animate__flipInX animate__faster"
                  ref={menuRef[i]}
                  style={{ display: "none" }}
                >
                  <ul className="divide-y divide-dashed divide-[#FF6347] py-1 ">
                    <li className="hover:bg-gray-300 px-4 py-1 ease-in duration-150">
                      <div
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          setDetails(el);
                          handleAddUserModal();
                        }}
                      >
                        Edit
                      </div>
                    </li>
                    <li className="hover:bg-gray-300 px-4 py-1 ease-in duration-150">
                      <div
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          setDetails(el);
                          handleConfirmationModal();
                        }}
                      >
                        Delete
                      </div>
                    </li>
                    <li className="hover:bg-gray-300 px-4 py-1 ease-in duration-150">
                      <div
                        className="flex items-center justify-start gap-2"
                        onClick={() => handleStatus(el._id, el.status)}
                      >
                        {el.status === 1 ? "Inactive" : "Active"}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
      {details && (
        <AddUser
          users={users}
          userToEdit={details}
          open={addUserModal}
          setDetails={setDetails}
          handleAddUserModal={handleAddUserModal}
        />
      )}

      {details && (
        <ConfirmationModal
          id={details?._id}
          publicId={details?.image?.publicId}
          open={confirmationModal}
          handleModal={handleConfirmationModal}
          deleteFunction={deleteUser}
          message="Are you sure you want to delete this user?"
        />
      )}
    </>
  );
};
Users.layout = LayoutAdmin;
Users.requiredAuthAdmin = true;
export default Users;
