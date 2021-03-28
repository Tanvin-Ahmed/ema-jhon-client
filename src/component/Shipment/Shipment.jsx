import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const savedCardData = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCardData,
      shipment: data,
      orderTime: new Date(),
    };

    fetch("http://localhost:5000/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("Your Order Placed Successfully.");
        }
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        defaultValue={loggedInUser.name}
        placeholder="Name"
        ref={register({ required: true })}
      />
      {errors.exampleRequired && (
        <span className="error">Name is required</span>
      )}
      <input
        name="email"
        defaultValue={loggedInUser.email}
        placeholder="Email"
        ref={register({ required: true })}
      />
      {errors.exampleRequired && (
        <span className="error">Email is required</span>
      )}
      <input
        name="address"
        placeholder="Address"
        ref={register({ required: true })}
      />
      {errors.exampleRequired && (
        <span className="error">Address is required</span>
      )}
      <input
        name="phone"
        placeholder="Phone Number"
        ref={register({ required: true })}
      />
      {errors.exampleRequired && (
        <span className="error">Phone Number is required</span>
      )}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
