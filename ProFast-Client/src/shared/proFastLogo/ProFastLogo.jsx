import React from 'react';
import logo from "../../assets/logo.png"
const ProFastLogo = () => {
    return (
        <div>
            <div className=" flex items-center">
            <img className=" -mr-4 mb-5" src={logo} alt="" />
            <p className=" text-3xl font-extrabold">ProFast</p>
        </div>
        </div>
    );
};

export default ProFastLogo;