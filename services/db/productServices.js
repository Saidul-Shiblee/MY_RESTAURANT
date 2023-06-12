import productModel from "../../models/products";

//Create a product
export const createProduct = async (productObject) => {
  const product = productModel(productObject);
  const createdProduct = await product.save();
  return createdProduct;
};

//Get all products
export const findProducts = async () => {
  const foundProducts = await productModel.find({});
  return foundProducts;
};
//Find Single Product
export const findProduct = async (filter) => {
  const foundProduct = await productModel.findOne(filter).exec();
  return foundProduct;
};
//Find a product and update/Edit

export const findProdutAndUpdate = async (filter, update) => {
  const updatedProduct = await productModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  return updatedProduct;
};

//Delete a product
export const removeProduct = async (id) => {
  const deletedProduct = await productModel.findOneAndDelete(id);
  return deletedProduct;
};
