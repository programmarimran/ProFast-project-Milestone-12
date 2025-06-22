import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannar1 from "../../../assets/banner/banner1.png"
import bannar2 from "../../../assets/banner/banner2.png"
import bannar3 from "../../../assets/banner/banner3.png"
const Bannar = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
      <div>
        <img src={bannar1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={bannar2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={bannar3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Bannar;
