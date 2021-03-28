import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import Card from "../Card/Card";
import "./Shop.css";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [card, setCard] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //card details
  useEffect(() => {
    const savedCardData = getDatabaseCart();
    const productKeys = Object.keys(savedCardData);
    fetch("http://localhost:5000/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCard(data));
  }, []);

  // add summary
  const handleAddProduct = (product) => {
    let count = 1;
    let newCard;
    const sameProduct = card.find((pd) => pd.key === product.key);
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = card.filter((pd) => pd.key !== product.key);
      newCard = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCard = [...card, product];
    }
    setCard(newCard);
    // count product
    addToDatabaseCart(product.key, count);
  };
  return (
    <section className="interface">
      <div className="show-product">
        {products.map((product) => (
          <Product
            key={product.key}
            ShowAddToCard={true}
            product={product}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div>
        <Card card={card}>
          <Link to="/review">
            <button type="submit">Review Order</button>
          </Link>
        </Card>
      </div>
    </section>
  );
};

export default Shop;
