import quota from "../../../assets/reviewQuote.png";

const CustomerReviewCard = ({ reviewData }) => {
  const { image, review, name, position } = reviewData;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col mx-auto">
      {/* Top: Quote icon */}
      <div className="w-10 mx-auto mb-4">
        <img src={quota} alt="quote" />
      </div>

      {/* Review Message */}
      <p className="text-gray-600 text-base mb-4 text-center">“{review}”</p>

      {/* Dotted line */}
      <div className="border-t border-dotted border-gray-300 w-full my-4" />

      {/* Bottom: User info */}
      <div className="flex w-full items-center justify-center gap-4 mt-2">
       <div className=" w-1/4">
         <img
          src={image}
          alt={''}
          className=" w-10 h-10 rounded-full object-cover"
        />
       </div>
        <div className=" w-3/4 text-left">
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewCard;
