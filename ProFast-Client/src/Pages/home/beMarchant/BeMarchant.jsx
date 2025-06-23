import React from "react";
import location from "../../../assets/location-merchant.png"
import bgImage from "../../../assets/be-a-merchant-bg.png"
const BeMarchant = () => {
  return (
   <div className=" py-12">
     <div style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize:"100%",
        backgroundPositionY:"top",
        // backgroundSize: 'cover',
        backgroundRepeat:"no-repeat",
        // backgroundPosition: 'center',
      
      }} className="card flex-col-reverse max-w-7xl mx-auto card-side md:p-20 md:flex-row-reverse bg-[#03373D] shadow-sm">
      <figure className="">
        <img className=" w-full"
          src={location}
          alt="Movie"
        />
      </figure>
      <div className="card-body w-3/4 text-white">
        <h2 className="card-title">Merchant and Customer Satisfaction is Our First Priority</h2>
        <p className=" text-center">We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
        <div className="card-actions ">
          <button className="btn rounded-full btn-primary">Become a Merchant</button>
          <button className="btn rounded-full btn-primary btn-outline">Earn with Profast Courier</button>
        </div>
      </div>
    </div>
   </div>
  );
};

export default BeMarchant;
