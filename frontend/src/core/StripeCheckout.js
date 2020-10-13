import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import {API} from "../backend";
import{createOrder} from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
    const body = {
      token,
      products
    }
    const headers = {
      "Content-Type":"application/json"
    }
    return fetch(`${API}/stripepayment`,{
      method: "POST",
      headers,
      body:JSON.stringify(body)}).then(response =>{
        console.log(response)
        const{status} = response;
        console.log("STATUS",status);
        const orderData = {
          products : products,
          transaction_id: response.transaction_id,
          amount: response.transaction.amount,
        }
        createOrder = (userId, token, orderData);
        cartEmpty(() => {
          console.log("did the app crash ?");
        });
        setReload(!reload);
      }).catch(err => console.log(err));
    };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51HZp9MIUT73NPmbJvGXP4C8qvbiPAXy245nCr9J2YtHxUJvpfOlQGVv361UkuSR7sW7J5eD8B1hMieQ1wPFMxO8p00Dt0uqZjo"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Checkout with Stripe to pay ₹ {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
