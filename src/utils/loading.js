import React from "react";
import MoonLoader from "react-spinners/MoonLoader";


export default function Loading({ loading }) {
  return (
    <div className={`loading ${loading ? "active" : null}`}>

      <MoonLoader
        color="#1DCF9F"
        size={35}
        speedMultiplier={1}
        loading={loading}
      />
    </div>
  );
}
