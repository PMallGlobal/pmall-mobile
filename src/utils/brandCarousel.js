import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const BrandSlider = ({ brands }) => {
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
        settings: { slidesToShow: 6, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings} className="flex">
        {brands?.map((brand) => (
                    <div className='flex flex-col g-10 alc brand_stores m-5 mt-15 w-125p'key={brand.id}>
                            <div className='border b-image'>
                            <Link to={`/}`} className="product-link">
                                <img src={brand.brand_image} className='icon' />
                                </Link>
                            </div>
                            <p className="cat_title">{brand.name}</p>
                        </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandSlider;
