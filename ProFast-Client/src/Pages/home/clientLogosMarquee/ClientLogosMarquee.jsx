import React from "react";
import Marquee from "react-fast-marquee";
// Example logo imports (replace with your own paths)
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start_people from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";


const ClientLogosMarquee = () => {
  const logos = [amazon, amazon_vector, casio, moonstar, randstad, start_people, start];
  return (
    <section className=" py-8 bg-gray-100">
      <h2 className="text-2xl text-primary font-bold text-center mb-6">
        We've helped thousands of sales teams
      </h2>
      <Marquee speed={60} gradient={true} pauseOnHover={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-6 flex justify-between  gap-24">
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="w-24 h-24 ml-30 object-contain  hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientLogosMarquee;
