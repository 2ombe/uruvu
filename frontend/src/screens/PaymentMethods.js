import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import CheckoutSteps from "../components/Checksteps";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

export default function PaymentMethods() {
  const [paymentMethodName, setPaymentMethod] = useState();
  const navigate = useNavigate();
  const { dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHODS", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);

    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment</title>
        </Helmet>
        <h1 className="my-3">Payment</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <>
              <div className="mb-3">
                <Form.Check
                  type="radio"
                  value="Paypal"
                  id="Paypal"
                  label="Paypal"
                  checked={paymentMethodName === "Paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type="radio"
                  value="MoMo"
                  id="MoMo"
                  label="MoMo"
                  checked={paymentMethodName === "MoMo"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </>
          </div>

          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
