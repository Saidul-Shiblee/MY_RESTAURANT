import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image";
import User from "../../public/images/user.png";
import { useDispatch } from "react-redux";
import isEmpty from "../../lib/isEmpty";
import _ from "lodash";
import { signOut } from "../../services/redux/features/authSlice";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserMutation,
  userApiSlice,
} from "../../services/redux/features/userApiSlice";
import { productsApiSlice } from "../../services/redux/features/productApiSlice";
import { useDeleteImageMutation } from "../../services/redux/features/imageApiSlice";
import useFormValidaton from "../../hooks/useFormValidaton";
import { title } from "process";
import Error from "./Error";

const AddUser = ({
  open,
  handleAddUserModal,
  userToEdit,
  setDetails,
  users,
  setUsers,
}) => {
  let initialData = {};
  if (!isEmpty(userToEdit)) {
    initialData.name = userToEdit.name;
    initialData.role = userToEdit.role;
    initialData.imageUrl = userToEdit?.image?.url;
  }

  const instance = axios.create();
  const dispatch = useDispatch();
  const axiosPrivate = usePrivateAxios();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(userToEdit?.image?.url || User);
  const [percentage, setPercentage] = useState(0);
  const [name, setName] = React.useState(userToEdit?.name || "");
  const [email, setEmail] = useState(userToEdit?.email || "");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const [role, setRole] = useState(userToEdit?.role || "user");

  //Reset Form
  const resetFrom = () => {
    setImageUrl(User);
    setFile(null);
    setPercentage(0);
    setName("");
    setEmail("");
    setPassword("");
    setConfrimPassword("");
    setRole("user");
    setDetails(null);
  };
  //Close Modal
  const handleClose = () => {
    handleAddUserModal();
    resetFrom();
  };
  //setFile
  const handleFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImageUrl = URL.createObjectURL(e.target.files[0]);
      setImageUrl(selectedImageUrl);
      setFile(e.target.files[0]);
    }
  };
  //Romove file from preview
  const removeFile = (e) => {
    setImageUrl(User);
    setFile(null);
  };
  //prepare user
  const userData = {
    name,
    email,
    password,
    role,
  };
  //Check if the user exists in database
  const [createUser, {}] = useCreateUserMutation();
  const [editUser, {}] = useEditUserMutation();

  const [deleteImage, {}] = useDeleteImageMutation();
  // const handleCheckUser = async (key, value) => {
  //   if (value.length > 0 && isEmpty(userToEdit)) {
  //     try {
  //       const res = dispatch(
  //         userApiSlice.endpoints.getUser.initiate({ [key]: value })
  //       ).unwrap();
  //       // const res = await getUser({ [key]: value });
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  //save user
  const saveUser = async (e) => {
    let image;
    let workprocess = 0;
    try {
      e.preventDefault();
      const res = await axiosPrivate.post("api/admin/signature", {
        folder: "foody/users",
      });
      const data = new FormData();
      data.append("file", file);
      data.append("api_key", process.env.CLOUDINARY_API_KEY);
      data.append("signature", res.data.signature);
      data.append("timestamp", res.data.timestamp);
      data.append("folder", "foody/users");
      const uploadRes = await instance.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload/`,
        data,
        {
          onUploadProgress: function (e) {
            setPercentage(Math.floor((e.loaded / e.total) * 100));
          },
        }
      );
      image = {
        url: uploadRes.data.url,
        publicId: uploadRes.data.public_id,
      };
      workprocess = 1;
      const user = await createUser({
        user: {
          ...userData,
          image: image,
        },
      });
      resetFrom();
    } catch (error) {
      if (workprocess === 1) {
        try {
          await deleteImage(image.publicId);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  //user to Edit
  const changedData = {
    name,
    role,
    imageUrl,
  };
  //Update User
  const handleEditUser = async () => {
    let image;
    let workprocess = 0;
    //Check if any data has changed
    if (_.isEqual(initialData, changedData)) {
      alert("Nothing has changed");
      return;
    }
    //Check if any image selected
    if (imageUrl === User) {
      alert("Please select an image to upload");
      return;
    }

    const changesToSave = {};
    //Getting the changed data to save in db
    for (const key in initialData) {
      if (key !== "imageUrl") {
        if (initialData[key] !== changedData[key]) {
          changesToSave[key] = changedData[key];
        }
      }
    }
    console.log(initialData.imageUrl === imageUrl);

    //Update  the user data if any other field change except image
    if (initialData.imageUrl === imageUrl && !isEmpty(changesToSave)) {
      try {
        await editUser({
          userId: userToEdit._id,
          body: { ...changesToSave },
        });
        handleAddUserModal();
      } catch (error) {
        console.log(error);
      }
      return;
    }
    //Update user the data with image
    if (imageUrl !== User && initialData.imageUrl !== imageUrl) {
      try {
        const res = await axiosPrivate.post("api/admin/signature", {
          folder: "foody/users",
        });
        console.log(res);
        const data = new FormData();
        data.append("file", file);
        data.append("api_key", process.env.CLOUDINARY_API_KEY);
        data.append("signature", res.data.signature);
        data.append("timestamp", res.data.timestamp);
        data.append("folder", "foody/users");
        const uploadRes = await instance.post(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload/`,
          data,
          {
            onUploadProgress: function (e) {
              setPercentage(Math.floor((e.loaded / e.total) * 100));
            },
          }
        );
        workprocess = 1;
        image = {
          url: uploadRes.data.url,
          publicId: uploadRes.data.public_id,
        };
        changesToSave.image = image;

        await editUser({
          userId: userToEdit?._id,
          body: { ...changesToSave },
        });
        handleAddUserModal();
        workprocess = 2;
        await deleteImage(userToEdit?.image?.publicId);
      } catch (error) {
        if (workprocess === 1) {
          try {
            await deleteImage(image.publicId);
          } catch (error) {
            console.log(error);
          }
        }
        if (workprocess === 2) {
          console.log(
            `Old Image with public Id can not be deleted please contact With vendor `
          );
        }
      }
    }
  };

  const [inputError, setInputError, validateForm, resetError, isFilled] =
    useFormValidaton();
  const filled = isEmpty(userToEdit)
    ? isFilled({ name, email, password, confrimPassword })
    : isFilled({ name, email });

  //Function to check the value exists in db then run the actual validator function based on that value,with other validatin check
  const validateOnFetchedData = ({
    value,
    name,
    index,
    max,
    min,
    type,
    pattern,
    title,
    refValue,
    refName,
  }) => {
    if (value.length > 0 && isEmpty(userToEdit)) {
      const res = dispatch(
        userApiSlice.endpoints.getUser.initiate({ [name]: value })
      ).unwrap();

      res.then((data) => {
        console.log(data);
        validateForm({
          value,
          name,
          index,
          max,
          min,
          type,
          data,
          pattern,
          title,
          refValue,
          refName,
        });
      });
    } else {
      validateForm({
        value,
        name,
        index,
        max,
        min,
        type,
        pattern,
        title,
        refValue,
        refName,
      });
    }
  };

  return open ? (
    <div
      className={`fixed  inset-0 z-10 flex flex-col items-center justify-center 
      animate__animated   animate__faster  animate__fadeInDown`}
    >
      <div
        className={`relative bg-white flex flex-col  justify-center shadow-xl  `}
      >
        <div className="flex justify-between w-full pb-2 pt-4 px-4">
          <div className="font-semibold text-2xl text-gray-500 ">Add User</div>
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-500 flex justify-center items-center text-white  text-md  cursor-pointer"
            onClick={handleClose}
          >
            X
          </div>
        </div>
        {/* border */}
        <div className="w-full h-[0.5px] bg-gray-600/40"></div>
        {/* Modal Body */}
        <div className="py-8 px-4 flex gap-4">
          <div>
            <form
              className={`flex flex-col  ${
                isEmpty(userToEdit) ? "gap-4" : "gap-10"
              }`}
            >
              <input
                type="text"
                value={name}
                onFocus={(e) => resetError(e.target.name)}
                onBlur={(e) =>
                  validateOnFetchedData({
                    value: e.target.value,
                    name: e.target.name,
                    type: "string",
                  })
                }
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="User Name"
                className="px-3 py-2 w-60  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />

              <Error errorArray={inputError} fieldName="name" />

              <input
                readOnly={isEmpty(userToEdit) ? false : true}
                type="email"
                name="email"
                onFocus={(e) => resetError(e.target.name)}
                onBlur={(e) =>
                  validateOnFetchedData({
                    value: e.target.value,
                    name: e.target.name,
                  })
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="User E-mail"
                className="px-3 py-2 w-60  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
              <Error errorArray={inputError} fieldName="email" />
              {isEmpty(userToEdit) ? (
                <>
                  <input
                    type="password"
                    name="password"
                    onFocus={(e) => resetError(e.target.name)}
                    onBlur={(e) =>
                      validateForm({
                        value: e.target.value,
                        name: e.target.name,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        title:
                          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
                      })
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="User Password"
                    className="px-3 py-2 w-60 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  />
                  <Error errorArray={inputError} fieldName="password" />
                </>
              ) : null}
              {isEmpty(userToEdit) ? (
                <>
                  <input
                    type="password"
                    name="confirmpassword"
                    value={confrimPassword}
                    onFocus={(e) => resetError(e.target.name)}
                    onBlur={(e) =>
                      validateForm({
                        value: e.target.value,
                        name: e.target.name,
                        refName: "password",
                        refValue: password,
                      })
                    }
                    onChange={(e) => setConfrimPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="px-3 py-2 w-60 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  />
                  <Error errorArray={inputError} fieldName="confirmpassword" />
                </>
              ) : null}
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className=" px-3 py-2 w-60 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              >
                <option value={"user"}>User</option>
                <option value={"admin"}>Admin</option>
              </select>
            </form>
          </div>
          <div className="flex flex-col items-center justify-between w-44">
            <div>
              <label htmlFor="image">
                <AddPhotoAlternateIcon
                  fontSize="large"
                  className="text-cyan-600 drop-shadow-lg active:scale-75 cursor-pointer"
                />
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) => handleFile(e)}
              />
            </div>
            <div className="relative border-[1px] border-dotted border-gray-400 w-40 h-40 shadow-2xl bg-slate-100">
              <Image
                src={imageUrl}
                alt="User Image"
                width={155}
                height={155}
                className="object-cove w-[155px] h-[155px] p-2"
              />
              {imageUrl === User ? null : (
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gray-500 flex justify-center items-center text-white  text-sm  cursor-pointer"
                  onClick={removeFile}
                >
                  X
                </div>
              )}
            </div>
          </div>
        </div>
        {(() => {
          console.log(_.isEqual(initialData, changedData));
        })()}
        {/* Modla Footer */}
        <div className="flex pt-2 pb-4 px-4 justify-end gap-2 items-center">
          <button
            disabled={
              _.isEqual(initialData, changedData) ||
              imageUrl === User ||
              !filled
            }
            className={
              imageUrl === User ||
              !filled ||
              _.isEqual(initialData, changedData)
                ? ` bg-gray-200  px-2 py-1   text-gray-600`
                : `bg-cyan-500 px-2 py-1 text-white cursor-pointer shadow-lg active:scale-90`
            }
            onClick={(e) => {
              isEmpty(userToEdit) ? saveUser(e) : handleEditUser();
            }}
          >
            {isEmpty(userToEdit) ? "Create" : "Edit"}
          </button>
          <button
            className=" bg-red-500 px-2 py-1 text-white cursor-pointer shadow-lg active:scale-90"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddUser;
