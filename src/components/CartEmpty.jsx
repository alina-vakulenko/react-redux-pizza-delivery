import React from "react";
import { Link } from "react-router-dom";

import emptyCartImg from "../assets/img/empty-cart.png";

export default function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>Your cart is empty 😕</h2>
      <p>
        You can place an order online on the main page or by calling us at{" "}
        <a href="tel:+491112223344">+49 111 2223344</a>
      </p>
      <img src={emptyCartImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go to main</span>
      </Link>
    </div>
  );
}
