import React from "react";
import "./App.css";

function Stories({ data }) {
  const { description, img, title } = data;
  return (
    <div>
      <div class="container">
        <div class="card">
          <div class="card-header">
            <img src={img} alt="No picture avilibale" />
          </div>
          <div class="card-body">
            <h4>{title ? title : "No aviliable title"}</h4>
            <p>{description ? description : "No aviliable description"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stories;
