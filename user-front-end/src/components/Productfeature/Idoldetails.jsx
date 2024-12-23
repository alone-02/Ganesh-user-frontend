import React, { useContext, useState } from "react";
import { IdolContext } from "../ContextApi/IdolContext";
import IdolList from "../Container/IdolList";
import "./featureIdol.css";
import axios from "axios";

function Idoldetails() {
  const { idolId, idolList } = useContext(IdolContext);

  const { id, title, thumbnail, price } = idolId;
  console.log(idolId);

  function addToCart(id) {
    const response = axios.get(`/api/products/orders/place_order`, {
      orderItem: id,
    });
    const result = response.data;
    console.log(result);
  }

  return (
    <>
      <div className="featureContainer">
        <div className="feature">
          <img
            className="featureImg"
            style={{
              borderRadius: "15px",
              border: "none",
              outline: "none",
              width: "640px",
              height: "500px",
            }}
            src={thumbnail}
          />
        </div>
        <div className="Detailsdiv">
          <div className="featuredetails">
            <div className="featureTitle">
              <textarea
                className="desc_textarea"
                rows={2}
                value={title}
                readOnly
                onClick={() => feature(id)}
              >
                {title}
              </textarea>
            </div>
            <div className="price_div">
              <p className="price_para">Price : ₹{price}</p>
            </div>
          </div>
          <div className="buybtn_div">
          
            <button className="buybtn" onClick={() => feature(id)}>
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div className="similardiv">
        <h2>Similar Idols</h2>
      </div>
      <div className="feautureList">
        {idolList.map((idol) => (
          <IdolList
            key={idol._id}
            id={idol._id}
            title={idol.title}
            thumbnail={idol.thumbnail.image_url}
            price={idol.price}
          />
        ))}
      </div>
    </>
  );
}

export default Idoldetails;
