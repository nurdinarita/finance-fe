import React from "react";
import "../../assets/css/style.css";
export default function Loader({ show }) {
  if (!show) return null;

  return (
    <div id="loader">
      <img
        src={require("../../assets/images/loading-icon.png")}
        alt="icon"
        className="loading-icon"
      />
    </div>
  );
}
