import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  role: Yup.string().required("Role is required"),
  token: Yup.string(),
  status: Yup.number(),
  image: Yup.object().shape({
    url: Yup.string().url().required("Url is required"),
    publicId: Yup.string().required("publicId is required"),
  }),
});
