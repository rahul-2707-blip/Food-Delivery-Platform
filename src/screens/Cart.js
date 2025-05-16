import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-white">
          The Cart is Empty!
        </div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:3000/api/auth/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div className="text-white">
      {console.log(data)}
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4 ">
            <tr>
              <th scope="col" className="text-white">
                #
              </th>
              <th scope="col" className="text-white">
                Name
              </th>
              <th scope="col" className="text-white">
                Quantity
              </th>
              <th scope="col" className="text-white">
                Option
              </th>
              <th scope="col" className="text-white">
                Amount
              </th>
              <th scope="col" className="text-white"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row" className="text-white">
                  {index + 1}
                </th>
                <td className="text-white">{food.name}</td>
                <td className="text-white">{food.qty}</td>
                <td className="text-white">{food.size}</td>
                <td className="text-white">{food.price}/-</td>
                <td className="text-white">
                  <button type="button" className="btn p-0">
                    {" "}
                    <span
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                      class="material-icons"
                      style={{color:"white"}}
                    >
                      delete
                    </span>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-white mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
