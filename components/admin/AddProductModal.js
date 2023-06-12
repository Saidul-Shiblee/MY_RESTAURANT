import React from "react";
import AddProductForm from "./AddProductForm";
import "animate.css";

const AddProductModal = ({
  open,
  handleModal,
  productToEdit,
  setDetails,
  products,
}) => {
  const modalRef = React.useRef(null);
  React.useEffect(() => {
    modalRef?.current?.classList.add("animate__zoomIn");
    modalRef?.current?.addEventListener("animationend", (event) => {
      modalRef?.current?.classList.remove("animate__zoomIn");
    });
  }, [open]);

  const handleClose = () => {
    modalRef?.current?.classList.add("animate__zoomOut");
    modalRef?.current?.addEventListener("animationend", (event) => {
      handleModal();
      setDetails(null);
    });
  };
  return open ? (
    <div
      ref={modalRef}
      className={`fixed overflow-y-auto inset-0 z-10 flex flex-col items-center justify-start  animate__animated bg-black/10 backdrop-blur-sm`}
    >
      <button
        className="fixed right-6 top-4 text-2xl  text-[#d1411e]"
        onClick={handleClose}
      >
        X
      </button>

      <AddProductForm
        handleModal={handleModal}
        modalRef={modalRef}
        productToEdit={productToEdit}
        setDetails={setDetails}
        products={products}
      />
    </div>
  ) : null;
};

export default AddProductModal;
