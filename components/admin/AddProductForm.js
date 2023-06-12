import React, { useEffect, useState, useRef } from "react";
import "animate.css";
import axios from "axios";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { CircularProgress } from "../CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { signOut } from "../../services/redux/features/authSlice";
import { useDispatch } from "react-redux";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetProductQuery,
  productsApiSlice,
} from "../../services/redux/features/productApiSlice";
import useFormValidaton from "../../hooks/useFormValidaton";
import Error from "./Error";
import { useDeleteImageMutation } from "../../services/redux/features/imageApiSlice";

const instance = axios.create();

function AddProducForm({
  products,
  handleModal,
  modalRef,
  productToEdit,
  setDetails,
}) {
  const [productId, setProductId] = React.useState(productToEdit?._id || "");
  const [productName, setProductName] = React.useState(
    productToEdit?.name || ""
  );
  const [productDescription, setProductDescription] = React.useState(
    productToEdit?.desc || ""
  );
  let [sizeList, setSizeList] = React.useState(
    productToEdit?.sizeWisePrice || [{ size: "", price: "" }]
  );
  let [extraOptionList, setExtraOptionList] = React.useState(
    productToEdit?.optionWisePrice || [{ option: "", price: "" }]
  );
  const [ingredients, setIngredients] = React.useState(
    productToEdit?.ingredients || []
  );
  const [imageToEdit, setImageToEdit] = React.useState(
    productToEdit?.image || {}
  );

  const dispatch = useDispatch();
  const axiosPrivate = usePrivateAxios();
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [publicId, setPublicId] = useState("");
  const [staleImage, setStaleImage] = useState(null);
  const [percentage, setPercentage] = useState(0);
  // const [inputError, setInputError] = useState([]);

  const progressRef = useRef();
  const deleteRef = useRef();
  const okRef = useRef();

  const [createProduct, {}] = useCreateProductMutation();
  const [editProduct, {}] = useEditProductMutation();
  const [deleteImage, {}] = useDeleteImageMutation();

  const [inputError, setInputError, validateForm, resetError, isFilled] =
    useFormValidaton();
  const filled = isFilled({
    productName,
    productDescription,
    sizeList,
    ingredients,
  });

  // Form Validator
  // const validateForm = (value, name, i, checkExistance) => {
  //   if (value.length <= 0) {
  //     if (i) {
  //       setInputError((previousError) => [
  //         ...previousError,
  //         {
  //           name,
  //           message: `${name} cannot be left blank`,
  //           index: i,
  //         },
  //       ]);
  //     } else {
  //       setInputError((previousError) => [
  //         ...previousError,
  //         {
  //           name,
  //           message: `${name} cannot be left blank`,
  //         },
  //       ]);
  //     }
  //   }
  //   if (value.length > 0 && checkExistance) {
  //     setProductCheck(true);
  //   }
  // };

  //Construct product object to save in the db
  const productData = {
    name: productName,
    desc: productDescription,
    sizeWisePrice: sizeList.map((el) => ({ ...el, price: Number(el.price) })),
    optionWisePrice: extraOptionList.map((el) => ({
      ...el,
      price: Number(el.price),
    })),
    ingredients: ingredients,
    image: {
      url,
      publicId,
    },
  };
  //check if there is any image that has not been saved the in db
  useEffect(() => {
    const prvImage = localStorage.getItem("foody_publicId");
    if (prvImage !== null) {
      setStaleImage(prvImage);
    }
  }, []);
  //Set the percetage while uploading the data
  useEffect(() => {
    let timeOutId;
    let timeOutId1;
    if (percentage <= 0) {
      progressRef.current.style.display = "none";
      deleteRef.current.style.display = "none";
      okRef.current.style.display = "none";
    }
    if (percentage >= 1 && percentage <= 100) {
      progressRef.current.style.display = "flex";
      deleteRef.current.style.display = "none";
      okRef.current.style.display = "none";
    }
    if (percentage === 100) {
      timeOutId = setTimeout(() => {
        progressRef.current.style.display = "none";
        okRef.current.style.display = "block";
      }, 1000);
    }
    if (percentage === 100) {
      timeOutId1 = setTimeout(() => {
        okRef.current.style.display = "none";
        deleteRef.current.style.display = "block";
      }, 2000);
    }

    return () => {
      clearTimeout(timeOutId);
      clearTimeout(timeOutId1);
    };
  }, [percentage]);

  //set the file to be uploaded
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setPercentage(0);
  };
  const upload = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.post("/api/admin/signature", {
        folder: "foody/products",
      });
      const data = new FormData();
      data.append("file", file);
      data.append("api_key", process.env.CLOUDINARY_API_KEY);
      data.append("signature", res.data.signature);
      data.append("timestamp", res.data.timestamp);
      data.append("folder", "foody/products");
      const uploadRes = await instance.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload/`,
        data,
        {
          onUploadProgress: function (e) {
            setPercentage(Math.floor((e.loaded / e.total) * 100));
          },
        }
      );
      setUrl(uploadRes.data.url);
      setFile(null);
      setPublicId(uploadRes.data.public_id);
      localStorage.setItem("foody_publicId", uploadRes.data.public_id);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(signOut({}));
      }
    }
  };
  //Delete image from cloudinary
  const handleDeleteImage = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteImage(staleImage);
      setStaleImage("");
      localStorage.removeItem("foody_publicId");
    } catch (error) {
      console.log(error);
    }
  };
  //handle change in size wise price field
  const handleSizeAndPriceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...sizeList];
    list[index][name] = value;
    setSizeList(list);
  };

  //handle change in the option wise price field
  const handleExtraOptionAndPriceChange = (e, index) => {
    const { name, value } = e.target;
    const list = extraOptionList.map((el) => ({ ...el }));
    list[index][name] = value;
    setExtraOptionList(list);
  };

  const formReset = () => {
    //reset form
  };
  //add new fileld
  const handleAddClick = (e, i, sizeOrExtraOptionList) => {
    e.preventDefault();
    let list =
      sizeOrExtraOptionList === "sizeList" ? sizeList : extraOptionList;

    sizeOrExtraOptionList === "sizeList"
      ? setSizeList([...list, { size: "", price: "" }])
      : setExtraOptionList([...list, { option: "", price: "" }]);
  };
  //remove field
  const handleRemoveClick = (e, i, sizeOrExtraOptionList) => {
    e.preventDefault();
    let list =
      sizeOrExtraOptionList === "sizeList"
        ? [...sizeList]
        : [...extraOptionList];
    list.splice(i, 1);
    sizeOrExtraOptionList === "sizeList"
      ? setSizeList(list)
      : setExtraOptionList(list);
  };
  // add/Edit product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (imageToEdit?.url) {
      // Edit Product
      if (url) {
        try {
          const res = await deleteImage(imageToEdit?.publicId);

          await editProduct({
            data: productData,
            productId,
          });

          handleModal();
          localStorage.removeItem("foody_publicId");
        } catch (error) {
          console.log(error);
        }
      } else {
        const { image, ...newProductData } = productData;
        try {
          await editProduct({
            data: newProductData,
            productId,
          });

          handleModal();
          localStorage.removeItem("foody_publicId");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      // Save Product
      try {
        const res = await createProduct({
          data: productData,
        });

        localStorage.removeItem("foody_publicId");

        handleModal();
      } catch (error) {
        console.log(error);
      }
    }
  };
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
  }) => {
    const res = dispatch(
      productsApiSlice.endpoints.getProduct.initiate(value)
    ).unwrap();
    res.then((data) =>
      validateForm({ value, name, index, max, min, type, data, pattern, title })
    );
    // res.unsubscribe();
  };

  return (
    <>
      <h1 className="mt-20 mb-8 text-3xl font-extrabold text-red-500">
        {productToEdit?.productName ? "Edit Product" : "Add Product"}
      </h1>
      <form className="flex flex-col gap-[12px] mb-8">
        <div>
          <label className="text-red-500 cursor-pointer" htmlFor="productName">
            Product Name:
          </label>
          <input
            id="productName"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            value={productName}
            onFocus={() => resetError("productName")}
            onBlur={(e) => {
              validateOnFetchedData({
                value: e.target.value,
                name: "productName",
                max: 50,
                min: 5,
                type: "string",
              });
            }}
            name="productName"
            type="text"
            required
            className=" relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Product Name"
          />
          <div>
            <Error errorArray={inputError} fieldName="productName" />
          </div>
        </div>
        <div>
          <label
            className="text-red-500 cursor-pointer"
            htmlFor="product-description"
          >
            Product Description:
          </label>
          <textarea
            id="product-description"
            rows={4}
            onChange={(e) => setProductDescription(e.target.value)}
            value={productDescription}
            onFocus={() => resetError("productDescription")}
            onBlur={(e) => {
              validateOnFetchedData({
                value: e.target.value,
                name: "productDescription",
                max: 50,
                min: 5,
                type: "string",
              });
            }}
            name="product-description"
            required
            className=" relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Product Description"
          />
          <div>
            <Error errorArray={inputError} fieldName="productDescription" />
          </div>
        </div>
        <div>
          <label className="text-red-500 cursor-pointer " htmlFor="image">
            Image:
          </label>
          <div className="flex justify-center gap-4 w-full mt-2">
            <div className="w-4/5">
              <div className="w-full px-[14px] py-[10px] border-white border-[1px] flex gap-2 justify-start items-start">
                <label
                  htmlFor="image"
                  className="bg-gray-300 py-1 px-2 rounded-sm shadow-lg text-gray-600"
                >
                  {imageToEdit?.url ? "Change Image" : "Choose Image"}
                </label>
                <p className=" py-1 px-2">{file?.name}</p>
              </div>
              <input
                disabled={staleImage || url}
                id="image"
                name="image"
                type="file"
                required
                className="hidden relative  w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                onChange={handleFileUpload}
              />
              {staleImage && (
                <p
                  onClick={handleDeleteImage}
                  className="text-xs font-semibold text-red-600 cursor-pointer animate-pulse"
                >
                  You have a stale image,click to remove that first{" "}
                </p>
              )}
            </div>
            <div className="w-1/4 flex items-center justify-center">
              {percentage === 0 && (
                <button onClick={upload} disabled={staleImage || !file}>
                  <CloudUploadIcon
                    fontSize={"large"}
                    className="text-cyan-500 cursor-pointer drop-shadow-lg"
                  />
                </button>
              )}
              <ChangeCircleIcon
                ref={deleteRef}
                fontSize={"large"}
                className="text-green-500 cursor-pointer drop-shadow-lg"
              />
              <CheckCircleOutlineIcon
                ref={okRef}
                fontSize={"large"}
                className="text-green-500 cursor-pointer drop-shadow-lg"
              />
              <CircularProgress percentage={percentage} ref={progressRef} />
            </div>
          </div>
        </div>
        <div>
          <div>
            {" "}
            <label className="text-red-500 cursor-pointer">
              Size wise price:
            </label>{" "}
          </div>
          {sizeList.map((el, i) => {
            return (
              <div key={i} className="w-full flex gap-2">
                <div className="w-5/6 flex gap-2 my-2">
                  <div className=" flex flex-col justify-start w-full">
                    <input
                      name="size"
                      value={el.size}
                      type="text"
                      required
                      placeholder="Size"
                      onFocus={() => resetError("size", i)}
                      onBlur={(e) => {
                        validateForm({
                          value: e.target.value,
                          name: "size",
                          index: i,
                        });
                      }}
                      onChange={(e) => handleSizeAndPriceChange(e, i)}
                      className="relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    />
                    <div>
                      <Error
                        errorArray={inputError}
                        fieldName="size"
                        index={i}
                      />
                    </div>
                  </div>
                  <div className=" flex flex-col justify-start w-full">
                    <input
                      name="price"
                      value={el.price}
                      type="text"
                      required
                      placeholder="Price"
                      onFocus={() => resetError("price", i)}
                      onBlur={(e) => {
                        validateForm({
                          value: e.target.value,
                          name: "price",
                          index: i,
                        });
                      }}
                      onChange={(e) => handleSizeAndPriceChange(e, i)}
                      className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    />
                    <div>
                      <Error
                        errorArray={inputError}
                        fieldName="price"
                        index={i}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/6 h-[37.33px] flex gap-2 my-2">
                  {sizeList.length !== 1 && (
                    <button
                      onClick={(e) => handleRemoveClick(e, i, "sizeList")}
                      className="w-1/2 bg-white px-1 py-2"
                    >
                      -
                    </button>
                  )}
                  {sizeList.length - 1 === i && (
                    <button
                      onClick={(e) => handleAddClick(e, i, "sizeList")}
                      className={`${
                        sizeList.length === 1 ? "w-full" : "w-1/2"
                      } bg-white px-1 py-2`}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div>
            {" "}
            <p className="text-red-500 cursor-pointer">
              Option wise price:
            </p>{" "}
          </div>
          {extraOptionList.map((el, i) => {
            return (
              <div key={i} className="w-full flex gap-2">
                <div className="w-5/6 flex gap-2 my-2">
                  <div className=" flex flex-col justify-start w-full">
                    <input
                      name="option"
                      value={el.option}
                      type="text"
                      required
                      placeholder="Option"
                      onChange={(e) => handleExtraOptionAndPriceChange(e, i)}
                      className="relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  <div className=" flex flex-col justify-start w-full">
                    <input
                      name="price"
                      value={el.price}
                      type="text"
                      required
                      placeholder="Price"
                      onChange={(e) => handleExtraOptionAndPriceChange(e, i)}
                      className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-1/6 h-[37.33px] flex gap-2 my-2">
                  {extraOptionList.length !== 1 && (
                    <button
                      onClick={(e) =>
                        handleRemoveClick(e, i, "extraOptionList")
                      }
                      className="w-1/2 bg-white px-1 py-2"
                    >
                      -
                    </button>
                  )}
                  {extraOptionList.length - 1 === i && (
                    <button
                      onClick={(e) => handleAddClick(e, i, "extraOptionList")}
                      className={`${
                        extraOptionList.length === 1 ? "w-full" : "w-1/2"
                      } bg-white px-1 py-2`}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <label className="text-red-500 cursor-pointer " htmlFor="ingredients">
            Ingredients:
          </label>
          <input
            id="ingredients"
            onChange={(e) =>
              e.target.value === ""
                ? setIngredients([])
                : setIngredients(e.target.value.split(","))
            }
            onFocus={() => resetError("ingredients")}
            onBlur={(e) => {
              validateOnFetchedData({
                value: e.target.value,
                name: "ingredients",
                max: 50,
                min: 5,
                type: "string",
                title: "comma seperated without any trailing comma or period",
                pattern: /^.*[.,]\s*$/,
              });
            }}
            name="ingredients"
            value={ingredients}
            type="text"
            required
            className=" relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Ingredients seperated with comma(e.g: Onion,Garlic)"
          />
          <div>
            <Error errorArray={inputError} fieldName="ingredients" />
          </div>
        </div>

        <div className="relative flex justify-between items-center gap-4 my-2">
          <button
            type="submit"
            disabled={!filled || inputError.length > 0}
            onClick={handleAddProduct}
            className={
              filled && inputError.length <= 0
                ? `w-1/2 bg-cyan-500 bg-cyan-500/90 px-3 py-2  font-semibold text-white 
            active:scale-[97%] ease-linear duration-75`
                : `w-1/2 bg-gray-200  px-3 py-2  font-semibold text-gray-600 `
            }
          >
            {imageToEdit?.url ? "Edit" : "Save"}
          </button>

          <button
            className="w-1/2 bg-red-500 hover:bg-red-500/90 px-3 py-2  font-semibold text-white active:scale-[97%] ease-linear duration-75"
            onClick={(e) => {
              e.preventDefault();
              modalRef?.current?.classList.add("animate__zoomOut");
              modalRef?.current?.addEventListener("animationend", (event) => {
                handleModal();
                setDetails(null);
              });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddProducForm;
