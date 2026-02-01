import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CategorySlider = ({ categories }) => {
  const settings = {
    dots: false,
    lazyLoad: true,
    arrows: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    pauseOnHover: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {categories?.map((category) => (
                    <div className='flex flex-col g-10 alc brand_stores m-5 mt-15 w-125p'key={category.id}>
                            <div className='border b-image'>
                            <Link to={`/}`} className="product-link">
                                <img src={category.category_image} className='icon' width="60px" />
                                </Link>
                            </div>
                            <p className="cat_title">{category.name}</p>
                        </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
