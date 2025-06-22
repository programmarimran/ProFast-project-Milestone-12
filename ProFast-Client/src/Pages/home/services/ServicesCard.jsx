import React from 'react';
import { FaBox, FaTruck, FaStore, FaMoneyBill, FaWarehouse, FaUndo } from "react-icons/fa";

const icons = [
  <FaTruck className="text-3xl text-primary" />,
  <FaBox className="text-3xl text-primary" />,
  <FaStore className="text-3xl text-primary" />,
  <FaMoneyBill className="text-3xl text-primary" />,
  <FaWarehouse className="text-3xl text-primary" />,
  <FaUndo className="text-3xl text-primary" />,
];

const ServicesCard = ({services}) => {
    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {services.map((service, index) => (
        <div key={index} className="card shadow-md bg-base-100 border hover:shadow-lg transition duration-300">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-2">
              {icons[index]}
              <h2 className="card-title">{service.title}</h2>
            </div>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
    );
};

export default ServicesCard;