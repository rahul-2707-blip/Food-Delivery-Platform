import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch] = useState('');
  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:4000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
      <div id="carouselExampleCaptions"  style={{objectFit: 'contain !important'}} className="carousel slide carousel-fade">
        <div className="carousel-inner" style={{'maxHeight':'500px'}}>
          <div className="carousel-caption" style={{ zIndex: '10' }}>
            <div className="d-flex justify-content-center">
              <input
                
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value = {search} 
                onChange={(e) => {setSearch(e.target.value)}}
              />
             
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://plus.unsplash.com/premium_photo-1694141252026-3df1de888a21?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              //id is distinct for every object so, the key is given as id
              <div className='row mb-4'>
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
                {console.log(data)}
              </div>
              <hr />
               {
                foodItem.length > 0
                ?             //filtered items are those food items whose categoryName is same as the categoryname in the foodCat data, so now u can segregate all food items into their own individual categories
                foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                .map(filterItems => {
                  return (
                    <div  key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card 
                      foodItem = {filterItems}
                      options={filterItems.options[0]}
                      
                      
                      
                      >  </Card>
                    </div>
                  )
                })
                : <div> No such data </div>
               
               }
              </div>
            );
          })
        ) : (
          <div>"aehuheukfh"</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
