import React from "react";
import ServicesCard from "./ServicesCard";

const Services = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <div className=" py-24">
      <div className=" py-12">
        <h2 className="text-3xl text-primary font-bold text-center mb-4">
          Reliable & Nationwide Logistics Services
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Discover a complete range of fast, secure, and tailored delivery
          solutions designed to meet both individual and corporate needs. From
          express delivery to inventory management and reverse logistics, our
          services ensure your business operates seamlessly across all regions
          of Bangladesh.
        </p>
      </div>

      <ServicesCard services={services}></ServicesCard>
    </div>
  );
};

export default Services;
