import { CheckoutFormBody } from "./CheckoutFormBody";
import * as Yup from "yup";
import "yup-phone";
import * as React from "react";
import { Step1, Step2 } from "./FormSteps";
import { useSession } from "next-auth/react";

const CheckoutForm = () => {
  const { data: session, status } = useSession();

  const checkoutSchemaStep = Yup.object().shape({
    fullName: Yup.string().max(50, "Too Long!").required("Required"),
    phoneNo: Yup.string().phone("BD", true).required(),
    email: Yup.string().email("Invalid email").required("Required"),
    deliveryAddress: Yup.string().max(200, "Too Long!").required("Required"),
  });

  return (
    <CheckoutFormBody
      initialValues={{
        fullName: "",
        phoneNo: "",
        email: session.user.email,
        customerId: session.user.id,
        deliveryAddress: "",
      }}
    >
      <FormikStepper
        validationSchema={checkoutSchemaStep}
        render={(values) => <Step1 values={values} />}
      />
      <FormikStepper render={(values) => <Step2 values={values} />} />
    </CheckoutFormBody>
  );
};

export function FormikStepper({ children }) {
  return <>{children}</>;
}

export default CheckoutForm;
