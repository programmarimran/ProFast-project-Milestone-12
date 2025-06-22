import React from "react";
import location from "../../../assets/location-merchant.png"
const BeMarchant = () => {
  return (
   <div className=" py-12">
     <div className="card max-w-7xl mx-auto card-side p-20 flex-row-reverse bg-[#03373D] shadow-sm">
      <figure className="">
        <img className=" w-full"
          src={location}
          alt="Movie"
        />
      </figure>
      <div className="card-body w-3/4">
        <h2 className="card-title">Merchant and Customer Satisfaction is Our First Priority</h2>
        <p>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
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
