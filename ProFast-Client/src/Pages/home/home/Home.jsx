import React from "react";
import Bannar from "../bannar/Bannar";
import Services from "../services/Services";
import ClientLogosMarquee from "../clientLogosMarquee/ClientLogosMarquee";
import FeatureSection from "../featuresSection/FeatureSection";
import BeMarchant from "../beMarchant/BeMarchant";
const Home = () => {
  return (
    <div className="bg-gray-200">
      <Bannar></Bannar>
      <Services></Services>
      <ClientLogosMarquee></ClientLogosMarquee>
      <FeatureSection></FeatureSection>
      <BeMarchant></BeMarchant>
    </div>
  );
};

export default Home;
