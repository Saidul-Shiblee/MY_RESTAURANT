import apiHandler from "../../../../utils/api/api-handler";
import {
  findProduct,
  findProdutAndUpdate,
  removeProduct,
} from "../../../../services/db/productServices";
import {
  productSchemaWithId,
  productIdSchema,
} from "../../../../yup_schema/products";
import validateRequest from "../../../../utils/api/yup-validator";

const editProduct = async (req, res) => {
  const {
    query,
    query: { id },
  } = req;
  console.log(id, req.body);
  const data = await validateRequest(
    { ...req.body, ...query },
    productSchemaWithId
  );
  const result = await findProdutAndUpdate({ _id: id }, req.body);
  res.status(200).json({ product: result });
};
const getProduct = async (req, res) => {
  const {
    query,
    query: { id },
  } = req;

  await validateRequest(query, productIdSchema);
  const result = await findProduct({ _id: id });
  res.status(201).json(result);
};
const deleteProduct = async (req, res) => {
  const {
    query,
    query: { id },
  } = req;

  await validateRequest(query, productIdSchema);
  const result = await removeProduct({ _id: id });
  res
    .status(200)
    .json({ result, message: "Product has been deleted successfully." });
};

export default apiHandler({
  put: editProduct,
  get: getProduct,
  delete: deleteProduct,
});
