import React, { useState, useRef } from "react";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { getItems } from "../../services/redux/features/cartSlice";
import axios from "axios";

export const CheckoutFormBody = ({ children, ...props }) => {
  const cartItems = useSelector(getItems);
  const stepsArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const CurrentStep = stepsArray[step];
  function isLastStep() {
    return step === stepsArray.length - 1;
  }
  const handleOrder = async (values) => {
    if (values.paymentoption === "Stripe Payment") {
      try {
        const res = await axios({
          method: "post",
          url: "https://myrestaurant-saidul-shiblee.vercel.app/api/customer/private/checkout",
          data: {
            ordertDetails: cartItems,
            customerDetails: values,
          },
        });
        window.location.href = res.data;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Formik {...props} validationSchema={CurrentStep.props.validationSchema}>
      {({ isValid, values, dirty }) => (
        <Form className="py-10 w-full flex justify-center items-center  mt-20 ">
          <div className=" w-2/5 flex flex-col items-center bg-[#d1411e] shadow-lg rounded-sm">
            {CurrentStep.props.render(values)}

            <div className="p-4 w-full flex gap-4   justify-center items-center  ">
              <button
                type="button"
                onClick={
                  step === 0
                    ? () => setStep((p) => p + 1)
                    : () => setStep((p) => p - 1)
                }
                className={`px-2 py-1   ${step === 0 ? "" : "bg-cyan-400"} ${
                  !(isValid && dirty) && step === 0
                    ? "bg-white text-gray-300"
                    : "bg-emerald-400 text-white"
                }`}
                disabled={!(isValid && dirty)}
              >
                {!isLastStep() ? "Next" : "Previous"}
              </button>
              {isLastStep() && (
                <button
                  type="button"
                  onClick={() => handleOrder(values)}
                  className={`px-2 py-1  ${
                    values.paymentoption
                      ? "bg-emerald-400 text-white"
                      : "bg-white text-gray-300"
                  }`}
                  disabled={!values.paymentoption}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
