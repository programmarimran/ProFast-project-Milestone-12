import React from "react";
import Slider from "react-slick";
import bannar1 from "../../../assets/banner/banner1.png";
import bannar2 from "../../../assets/banner/banner2.png";
import bannar3 from "../../../assets/banner/banner3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Bannar = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        <div>
          <img src={bannar1} alt="Banner 1" className="w-full object-cover" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={bannar2} alt="Banner 2" className="w-full object-cover" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={bannar3} alt="Banner 3" className="w-full object-cover" />
          <p className="legend">Legend 3</p>
        </div>
      </Slider>
    </div>
  );
};

export default Bannar;
