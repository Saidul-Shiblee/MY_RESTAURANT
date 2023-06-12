import * as Yup from "yup";

//Scehma for

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  desc: Yup.string().required("Description is required"),
  sizeWisePrice: Yup.array()
    .of(
      Yup.object().shape({
        size: Yup.string().required("Size is required"),
        price: Yup.number().required("Size wise product price is required"),
        _id: Yup.string(),
      })
    )
    .required("Size & corresponding price is required"),
  optionWisePrice: Yup.array()
    .of(
      Yup.object().shape({
        option: Yup.string().required("Option is required"),
        price: Yup.number().required("Option wise product price is required"),
        _id: Yup.string(),
      })
    )
    .required("Option & corresponding price is required"),

  ingredients: Yup.array()
    .of(Yup.string().required("Ingredient is required"))
    .required("Ingredients can not be left blank"),

  image: Yup.object().shape({
    url: Yup.string().required("Url is required"),
    publicId: Yup.string().required("publicId is required"),
    _id: Yup.string(),
  }),
});

export const productIdSchema = Yup.object().shape({
  id: Yup.string().required("Id is required"),
});

export const productSchemaWithId = productSchema.concat(productIdSchema);
