import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { name, price, img, seller, stock, key } = props.product;
  return (
    <div className="product-container">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4>
          {" "}
          <Link to={"/product/" + key }>{name}</Link>{" "}
        </h4>
        <p>
          <small>By : {seller}</small>
        </p>
        <p>$ {price}</p>
        <p>
          <small>Only {stock} left in stock - Order soon</small>
        </p>
        {props.ShowAddToCard && <button
          type="submit"
          onClick={() => props.handleAddProduct(props.product)}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to Car
        </button>}
      </div>
    </div>
  );
};

export default Product;
