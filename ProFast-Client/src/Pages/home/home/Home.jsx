import React from "react";
import Bannar from "../bannar/Bannar";
import Services from "../services/Services";
import ClientLogosMarquee from "../clientLogosMarquee/ClientLogosMarquee";
import FeatureSection from "../featuresSection/FeatureSection";
import BeMarchant from "../beMarchant/BeMarchant";
import CustomerReviewsSection from "../customerReviewsSection/CustomerReviewsSection";
import AskedFAQ from "../faqSection/AskedFAQ";
const Home = () => {
  return (
    <div className="bg-gray-200">
     <div className=" w-11/12 mx-auto">
      <div className=" py-12 ">
         <Bannar></Bannar>
      </div>
      <h1 className=" text-blue-500 dark:text-red-500 text-center text-2xl">
        This is home page
      </h1>
      <Services></Services>
      <ClientLogosMarquee></ClientLogosMarquee>
      <FeatureSection></FeatureSection>
      <BeMarchant></BeMarchant>
      <CustomerReviewsSection></CustomerReviewsSection>
      <AskedFAQ></AskedFAQ>
     </div>
    </div>
  );
};

export default Home;
