import { useState } from "react";
import Image from "next/image";
import AddProductModal from "../../components/admin/AddProductModal";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import LayoutAdmin from "../../components/LayoutAdmin";
import { useDispatch } from "react-redux";
import Loader from "../../components/admin/Loader";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../services/redux/features/productApiSlice";
const Products = () => {
  const [productModal, setProductModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [deleteProduct, {}] = useDeleteProductMutation();

  const handleProductModal = () => {
    setProductModal(!productModal);
  };

  const handleConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
  };
  return (
    <>
      {isLoading && !products && !error && <Loader />}
      {!isLoading && !products && error && <p>Something went wrong</p>}
      {!isLoading && !error && products?.products && (
        <div className="absolute ml-[230px] w-[calc(100vw_-_248px)] flex flex-col h-full  text-white">
          <div className=" w-full flex justify-end px-2 py-6">
            <a
              className="px-2 py-1 bg-slate-600/70 text-white cursor-pointer "
              onClick={() => {
                handleProductModal();
                setDetails({});
              }}
            >
              Add Product
            </a>
          </div>
          <div className="w-full px-2 py-8">
            <table className="table-auto  divide-y bg-slate-600/70 w-full ">
              <thead>
                <tr className="flex justify-between w-full ">
                  <th className="w-1/6">productID </th>
                  <th className="w-1/6">Name</th>
                  <th className=" w-1/6">Image </th>
                  <th className=" w-1/6">Size Wise Price </th>
                  <th className="w-1/5">Extra Options</th>
                  <th className="w-1/6">Ingridients</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dotted">
                {products?.products.map((el) => {
                  return (
                    <tr
                      key={el._id}
                      className="relative flex  w-full group cursor-pointer"
                    >
                      <td className="w-1/6  flex items-center justify-center">
                        {el._id.slice(el._id.length - 7, el._id.length)}
                      </td>
                      <td className="w-1/6 flex items-center ">
                        <div className="w-full text-center">{el.name}</div>
                      </td>
                      <td className="w-1/6  flex items-center justify-center">
                        <Image
                          alt=""
                          src={el.image.url}
                          width="40"
                          height="40"
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="w-1/6 flex flex-col items-center justify-center">
                        {el.sizeWisePrice.map((el) => {
                          return (
                            <div
                              key={el._id}
                              className="flex  items-center justify-center"
                            >
                              <p>{el.size}</p>
                              <p>-</p>
                              <p>Tk. {el.price}</p>
                            </div>
                          );
                        })}
                      </td>
                      <td className=" w-1/5 flex flex-col items-center justify-center">
                        {el.optionWisePrice.map((el) => {
                          return (
                            <div
                              key={el._id}
                              className="flex  items-center justify-center"
                            >
                              <p>{el.option}</p>
                              <p>-</p>
                              <p>Tk. {el.price}</p>
                            </div>
                          );
                        })}
                      </td>
                      <td className=" w-1/6 flex flex-col items-center justify-center">
                        {el.ingredients.map((el, i) => (
                          <p key={i}>{el}</p>
                        ))}
                      </td>

                      <td className=" backdrop-blur-sm absolute w-full h-full bg-black/30 hidden group-hover:flex group-hover:gap-2 justify-center items-center backdrop transition-all ease-in-out duration-150">
                        <div
                          className="bg-red-600 px-2 py-1 cursor-pointer "
                          onClick={() => {
                            handleConfirmationModal();
                            setDetails(el);
                          }}
                        >
                          Delete{" "}
                        </div>
                        <div
                          className=" bg-cyan-500 px-2 py-1 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            handleProductModal();
                            setDetails(el);
                          }}
                        >
                          Edit
                        </div>
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
        id={details?._id}
        publicId={details?.image?.publicId}
        open={confirmationModal}
        handleModal={handleConfirmationModal}
        deleteFunction={deleteProduct}
        message="Are you sure you want to delete this product?"
      />

      {details && (
        <AddProductModal
          products={products}
          productToEdit={details}
          open={productModal}
          setDetails={setDetails}
          handleModal={handleProductModal}
        />
      )}
    </>
  );
};
Products.layout = LayoutAdmin;
Products.requiredAuthAdmin = true;
export default Products;
