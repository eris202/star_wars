import React from "react";
import "./preload.css";

export default function MainPreload({ msg }) {
  return (
    <div className="cover">
      <div className="bg">
        <div class="preload-container">
          <div class="dash uno"></div>
          <div class="dash dos"></div>
          <div class="dash tres"></div>
          <div class="dash cuatro"></div>
        </div>
      </div>
      {/* 
      <div className="text-white mt-5 col-12 text-center">{msg}</div> */}
    </div>
  );
}
