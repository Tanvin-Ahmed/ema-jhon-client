import React, { useEffect, useState } from "react";
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from "../../utilities/databaseManager";
import Card from "../Card/Card";
import ReviewItem from "../ReviewItem/ReviewItem";
import img from '../../images/giphy.gif';
import { useHistory } from "react-router";

const Review = () => {
  const [card, setCard] = useState([]);
  useEffect(() => {
    // card
    const savedCardData = getDatabaseCart();
    const productKeys = Object.keys(savedCardData);

    fetch('http://localhost:5000/productsByKeys', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCard(data))
  }, []);
  const removeCardProduct = (productKey) => {
    const newCard = card.filter((pd) => pd.key !== productKey);
    setCard(newCard);
    removeFromDatabaseCart(productKey);
  };
  // place order
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();
  const handleProceedCheckout = () => {
    history.push("/shipment");
  }
  // img show
  let thankYou;
  if(orderPlaced){
    thankYou = <img src={img} alt=""/>;
  }
  return (
    <>
    <h1>Selected Products : {card.length}</h1>
    <div className="interface">
      <div className="show-product">
      {card.map((pd) => (
        <ReviewItem
          key={pd.key}
          product={pd}
          removeCardProduct={removeCardProduct}
        ></ReviewItem>
      ))}
      {thankYou}
      </div>
      <div>
          <Card card={card} key={card.key}>
            <button onClick = {handleProceedCheckout} type="submit">Proceed Checkout</button>
          </Card>
      </div>
    </div>
    </>
  );
};

export default Review;
