import React from "react";
const ReviewItem = (props) => {
  const { name, quantity, key, img } = props.product;
  return (
    <>
      <h5>This is to review</h5>
      <div className="product-container">
        <div>
          <img src={img} alt="" />
        </div>
        <div>
          <h4>{name}</h4>
          <p>Quantity : {quantity}</p>
          <br />
          <button onClick={() => props.removeCardProduct(key)}>Remove</button>
        </div>
      </div>
    </>
  );
};

export default ReviewItem;
