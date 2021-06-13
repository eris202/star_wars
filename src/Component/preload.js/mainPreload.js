import React from "react";
import "./preload.css";

export default function MainPreload({ msg }) {
  return (
    <div className="cover">
      <div className="bg">
        <div className="preload-container">
          <div className="dash uno"></div>
          <div className="dash dos"></div>
          <div className="dash tres"></div>
          <div className="dash cuatro"></div>
        </div>
      </div>
      {/* 
      <div className="text-white mt-5 col-12 text-center">{msg}</div> */}
    </div>
  );
}
