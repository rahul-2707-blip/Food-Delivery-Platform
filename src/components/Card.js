import React, { useState , useRef , useEffect } from 'react';
import './cardcs.css'
import { useDispatchCart,useCart } from './ContextReducer';
export default function Card(props) {
  let data = useCart();
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let options = props.options || {};
  let priceOptions = Object.keys(options);
  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");
  const handleAddToCart  = async () => {
    let food = []
    for(const item of data) {
      if(item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }

    if(food !== []) {
      if(food.size === size) {
        await dispatch({type: "UPDATE" , id: props.foodItem._id , price: finalPrice , qty: qty})
        return 
      }
     else if(food.size !== size) {
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
     return 
    }
   
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});   
    return  
  }   
  
}
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          className="card-img-top"
          src={props.foodItem.img}
          alt="Card cap"
          style={{height:"150px",objectFit:"fill"}}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">{props.description}</p> */}
          <div className="container w-150">
            <select
              className="m-1 h-100 rounded"
              style={{ backgroundColor: "#686D76", color: "white" }}
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-1 h-100 rounded"
              ref = {priceRef}
              style={{ backgroundColor: "#686D76", color: "white" }}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline fs-6" style={{ fontStyle: "Bold" }}>
              {finalPrice}/-
            </div>
            <hr />
            <button style={{'backgroundColor':'#F97300','color':'white'}}className='btn justify-centre ms-2' onClick={handleAddToCart}> Add to cart </button>
          </div>
        </div>
      </div>
    </div>
  );
}
