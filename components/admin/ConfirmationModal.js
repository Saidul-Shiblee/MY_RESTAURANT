import React, { useEffect } from "react";
import { useDeleteImageMutation } from "../../services/redux/features/imageApiSlice";
import notify from "../../lib/toastNotification";
const ConfirmationModal = ({
  open,
  handleModal,
  message,
  publicId,
  id,
  deleteFunction,
}) => {
  const [deleteImage, {}] = useDeleteImageMutation();

  const handleClose = () => {
    handleModal();
  };
  const handleDelete = async () => {
    deleteFunction(id)
      .unwrap()
      .then((payload) => notify(payload.message, "success"))
      .then(() => {
        if (publicId) {
          deleteImage(publicId);
        }
      })
      .catch((err) => notify(err.data.message, "error"))
      .finally(handleModal());
  };
  return open ? (
    <div
      className={`fixed  inset-0 z-10 flex flex-col items-center justify-center bg-black/10  `}
    >
      <div className={`bg-white flex flex-col  justify-center   w-96`}>
        <div className="flex justify-between w-full pb-2 pt-4 px-4">
          <div className="font-semibold text-2xl text-gray-500 ">
            Delete Confirmation
          </div>
          <div
            className="font-semibold text-md text-gray-500 cursor-pointer"
            onClick={handleClose}
          >
            X
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-gray-600/40"></div>
        <div className="py-8 px-4">
          <p className="py-2 px-4 bg-red-200 rounded-sm text-red-700">
            {message}
          </p>
        </div>
        <div className="w-full h-[0.5px] bg-gray-600/40"></div>
        <div className="flex pt-2 pb-4 px-4 justify-end gap-2 items-center">
          <a
            className=" bg-cyan-500 px-2 py-1 text-white cursor-pointer"
            onClick={handleClose}
          >
            Cancel
          </a>
          <a
            className=" bg-red-500 px-2 py-1 text-white cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmationModal;
