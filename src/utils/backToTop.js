import React, { useState, useEffect } from "react";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`back_to_top ${visible ? "show" : "hide"}`} onClick={scrollToTop}>
      <ArrowCircleUpRoundedIcon className="back_totop_icon" />
    </div>
  );
};

export default BackToTop;
