import React from "react";
import "./Card.css";
const Card = (props) => {
  const card = props.card;
  let shipping = 0;
  // let shipping = caed.reduce((shipping, card) => shipping + card.shipping,0);
  // shipping = Number(shipping.toFixed(2));
  let total = card.reduce(
    (total, card) => total + card.price * card.quantity || 1,
    0
  );
  total = Number(total.toFixed(2));
  const tax = Number((total * 0.1).toFixed(2));
  const grandTotal = Number((total + tax).toFixed(2));
  return (
    <div className="Card-container">
      <h2>Ordered Card</h2>
      <p>Ordered Items : {card.length}</p>
      <p>Price : {total}$</p>
      <p>
        <small>Shipping : {shipping}$</small>
      </p>
      <p>Tax : {tax}$</p>
      <p>Total Price : {grandTotal}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Card;
