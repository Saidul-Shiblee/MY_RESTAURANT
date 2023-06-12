import { useEffect, useState } from "react";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import LayoutAdmin from "../../components/LayoutAdmin";
import hasSpace from "../../lib/hasSpace";
import Loader from "../../components/admin/Loader";
import {
  useDeleteOrderMutation,
  useEditOrderMutation,
  useGetOrdersQuery,
} from "../../services/redux/features/orderApiSlice";
import notify from "../../lib/toastNotification";

const Orders = () => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [details, setDetails] = useState(null);
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  const [editOrder, {}] = useEditOrderMutation();
  const [delelteOrder, { error: deleteError }] = useDeleteOrderMutation();
  const changeStatus = async (id, status) => {
    editOrder({ data: { status: status + 1 }, orderID: id })
      .unwrap()
      .then((payload) => notify("Order Status Changed Successfully", "success"))
      .catch((err) => notify(err.data.message, "error", "top-right"));
  };

  const handleConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
  };

  return (
    <>
      {isLoading && !error && !orders && <Loader />}
      {!isLoading && error && !orders && <p>Something went wrong</p>}
      {!isLoading && !error && orders?.orders && (
        <div className="absolute ml-[230px] w-[calc(100vw_-_250px)] h-full  text-white flex flex-col">
          <div className="w-full flex justify-center  px-2 py-6">
            <p className="px-2 py-1 text-slate-600 text-2xl font-semibold">
              Active Order Deatails
            </p>
          </div>
          <div className="w-full px-2 py-6">
            <table className="table-auto w-full divide-y bg-slate-600/70 ">
              <thead>
                <tr className="flex justify-between w-full ">
                  <th className="w-[13%] text-start ">Customer Name </th>
                  <th className="w-[12%] text-start">Customer Phone</th>
                  <th className="w-[20%] text-start">Delivery Address</th>
                  <th className=" w-[11%] text-start">Total Amount </th>
                  <th className=" w-[11%] text-start">Payment Status</th>
                  <th className="w-[11%] text-start">Payment Mode</th>
                  <th className="w-[11%] text-start">Status</th>
                  <th className="w-[11%] text-start">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dotted">
                {orders?.orders.map((el) => {
                  return (
                    <tr className="relative flex justify-around  w-full  py-1 px-1">
                      <td className="w-[12%]  flex justify-center items-center ">
                        <div className="w-full flex justify-start items-center ">
                          {el.customerName}
                        </div>
                      </td>
                      <td className="w-[11%]  flex justify-center items-center">
                        <div className="w-full flex justify-start items-center ">
                          {el.customerPhoneNo}
                        </div>
                      </td>
                      <td className="w-[22%] flex justify-center items-center flex-wrap">
                        <div className="w-full flex justify-start items-center ">
                          <p>
                            {hasSpace(el.deliveryAddress)
                              ? el.deliveryAddress
                              : `${el.deliveryAddress.slice(
                                  0,
                                  24
                                )}  ${el.deliveryAddress.slice(
                                  24,
                                  el.deliveryAddress.length
                                )} `}
                          </p>
                        </div>
                      </td>
                      <td className="w-[11%]  flex justify-center items-center">
                        <div className="w-full flex justify-start items-center ">
                          TK. {el.orderPrice}
                        </div>
                      </td>
                      <td className=" w-[11%]  flex justify-center items-center">
                        <div className="w-full flex justify-start items-center ">
                          {el.paymentStatus}
                        </div>
                      </td>
                      <td className=" w-[11%]  flex justify-center items-center">
                        <div className="w-full flex justify-start items-center ">
                          {" "}
                          {el.paymentMethod}
                        </div>
                      </td>
                      <td className=" w-[11%]  flex justify-center items-center">
                        <div className="w-full flex justify-start items-center ">
                          {el.status}
                        </div>
                      </td>
                      <td className=" w-[11%]   flex  flex-col  justify-center items-center gap-2">
                        {" "}
                        <button
                          disabled={el.status === 3}
                          className="bg-cyan-500 p-1 text-white w-4/5 text-center cursor-pointer"
                          onClick={() => changeStatus(el._id, el.status)}
                        >
                          Next Step
                        </button>
                        <button
                          className="bg-red-500 p-1  text-white w-4/5 text-center cursor-pointer"
                          onClick={() => {
                            handleConfirmationModal();
                            setDetails({
                              id: el._id,
                            });
                          }}
                        >
                          Delete
                        </button>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmationModal
        id={details?.id}
        open={confirmationModal}
        handleModal={handleConfirmationModal}
        deleteFunction={delelteOrder}
        message="Are you sure you want to delete this order?"
      />
    </>
  );
};
Orders.layout = LayoutAdmin;
Orders.requiredAuthAdmin = true;
export default Orders;
