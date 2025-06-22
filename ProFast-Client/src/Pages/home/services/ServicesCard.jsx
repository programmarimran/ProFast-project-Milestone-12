import React from 'react';
import { FaBox, FaTruck, FaStore, FaMoneyBill, FaWarehouse, FaUndo } from "react-icons/fa";

const icons = [
  <FaTruck className="text-6xl text-primary mb-4" />,
  <FaBox className="text-6xl text-primary mb-4" />,
  <FaStore className="text-6xl text-primary mb-4" />,
  <FaMoneyBill className="text-6xl text-primary mb-4" />,
  <FaWarehouse className="text-6xl text-primary mb-4" />,
  <FaUndo className="text-6xl text-primary mb-4" />,
];

const ServicesCard = ({ services }) => {
  return (
    <div className="grid gap-6 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 p-4">
      {services.map((service, index) => (
        <div
          key={index}
          className="card hover:bg-green-200 shadow-md bg-white border hover:shadow-xl transition duration-300 text-center py-6 px-4"
        >
          <div className="flex flex-col items-center">
            {icons[index]}
            <h2 className="text-xl font-semibold text-primary mb-2">{service.title}</h2>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesCard;
