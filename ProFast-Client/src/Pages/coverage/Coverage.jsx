import React from "react";
import MapComponent from "./MapCompunent";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceAreadata = useLoaderData();
  // console.log(data);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Coverage Area
      </h1>

      <MapComponent serviceAreadata={serviceAreadata}  />

      {/* নিচে চাইলে সার্চ ও জেলা লিস্টও রাখতে পারো */}
    </div>
  );
};

export default Coverage;
