import React from "react";
import faqsData from "../../../assets/data/faqsData";

const AskedFAQ = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqsData.map((data) => (
            <div
              key={data.id}
              className="collapse collapse-arrow bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <input type="checkbox" />
              <div className="collapse-title font-medium text-gray-800 text-lg">
                {data.question}
              </div>
              <div className="collapse-content text-gray-600 text-sm leading-relaxed">
                {data.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AskedFAQ;
