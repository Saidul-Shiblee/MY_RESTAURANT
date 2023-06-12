import { Field, ErrorMessage } from "formik";

export const Step1 = ({ values }) => {
  return (
    <div className="p-4 w-full flex flex-col gap-10 justify-between items-center text-white">
      <p className="text-2xl font-semibold ">Shipping Address</p>
      <div>
        <div className="flex gap-4">
          <label htmlFor="fullName" className="w-32 text-right">
            Full Name:
          </label>
          <Field className="text-black" name="fullName" type="text" />
        </div>
        <ErrorMessage
          name="fullName"
          component="div"
          className="text-white ml-36 w-36 text-xs "
        />
      </div>
      <div>
        <div className="flex gap-4">
          <label htmlFor="phoneNo" className="w-32 text-right">
            Phone No:
          </label>
          <Field className="text-black" name="phoneNo" type="text" />
        </div>
        <ErrorMessage
          name="phoneNo"
          component="div"
          className="text-white ml-36 text-xs w-40"
        />
      </div>
      <div>
        <div className="flex gap-4">
          <label htmlFor="email" className="w-32 text-right">
            Email Address:
          </label>
          <Field className="text-black" name="email" type="email" />
          <Field name="customerId" type="customerId" hidden />
        </div>
        <ErrorMessage
          name="email"
          component="div"
          className="text-white ml-36 text-xs w-40"
        />
      </div>
      <div className="">
        <div className="flex items-center gap-4">
          <label htmlFor="deliveryAddress" className="w-32 text-right">
            Delivery Address:
          </label>
          <Field
            name="deliveryAddress"
            as="textarea"
            className="w-[181.33px] text-black"
            rows="3"
            maxlength="300"
          />
        </div>
        <ErrorMessage
          name="deliveryAddress"
          component="div"
          className="text-white ml-36 text-xs w-40"
        />
      </div>
    </div>
  );
};

export const Step2 = ({ values }) => {
  return (
    <div className="p-4 w-full flex flex-col gap-10 justify-between items-center">
      <p className="text-2xl font-semibold text-white">Payment Method</p>
      <div className="w-36 h-20">
        <label
          htmlFor="cash_payment"
          className={`
                bg-slate-50 
                bg-[url('../public/images/COD.png')] bg-contain bg-no-repeat
                block w-36 h-20  shadow-lg  ${
                  values.paymentoption === "Cash Payment"
                    ? " outline outline-[1.5px] outline-offset-1	 outline-emerald-400"
                    : ""
                }
               
                `}
        ></label>
        <Field
          id="cash_payment"
          type="radio"
          name="paymentoption"
          value="Cash Payment"
          className="hidden"
        />
      </div>

      <div className=" w-36 h-20 ">
        <label
          htmlFor="stripe_payment"
          className={` 
                 bg-slate-50 
                bg-[url('../public/images/stripe.png')] bg-contain bg-no-repeat
                block w-36 h-20  shadow-lg  ${
                  values.paymentoption === "Stripe Payment"
                    ? " outline outline-[1.5px] outline-offset-1 outline-emerald-400"
                    : ""
                }
               
                `}
        ></label>
        <Field
          type="radio"
          id="stripe_payment"
          name="paymentoption"
          value="Stripe Payment"
          className="hidden"
        />
      </div>
      <ErrorMessage
        name="paymentoption"
        component="div"
        className="text-white ml-32 w-36 text-xs "
      />
    </div>
  );
};
