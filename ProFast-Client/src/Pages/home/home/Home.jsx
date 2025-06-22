import React from 'react';
import Bannar from '../bannar/Bannar';
import Services from '../services/Services';
import ClientLogosMarquee from '../clientLogosMarquee/ClientLogosMarquee';
const Home = () => {
    return (
        <div className='bg-gray-200'>
            <Bannar></Bannar>
            <Services></Services>
            <ClientLogosMarquee></ClientLogosMarquee>
        </div>
    );
};

export default Home;