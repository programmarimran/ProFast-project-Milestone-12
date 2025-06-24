import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const AddParcel = () => {
  const data = useLoaderData();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const [senderRegion, setSenderRegion] = useState("");
  const [senderDistrict, setSenderDistrict] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const [receiverDistrict, setReceiverDistrict] = useState("");
  const regions = [...new Set(data.map((item) => item.region))];

  const senderDistricts = data
    .filter((item) => item.region === senderRegion)
    .map((item) => item.district);

  const senderCoveredAreas =
    data.find((item) => item.district === senderDistrict)?.covered_area || [];

  const receiverDistricts = data
    .filter((item) => item.region === receiverRegion)
    .map((item) => item.district);

  const receiverCoveredAreas =
    data.find((item) => item.district === receiverDistrict)?.covered_area || [];

  const onSubmit = (data) => {
    alert("form subitted")
    console.log("Parcel Data:", data);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-base-100 shadow rounded-lg">
      <h1 className="text-3xl font-bold text-primary mb-6">Add Parcel</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold mb-2">
          Enter your parcel details
        </h2>

        {/* Document Type */}
        <div className="flex items-center gap-4 mb-4">
          <label className="label cursor-pointer">
            <input
              type="radio"
              value="Document"
              {...register("type")}
              defaultChecked
              className="radio checked:bg-green-500"
            />
            <span className="label-text ml-2">Document</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              value="Not-Document"
              {...register("type")}
              className="radio checked:bg-green-500"
            />
            <span className="label-text ml-2">Not-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Parcel Name"
            className="input input-bordered w-full"
            {...register("parcelName", { required: true })}
          />
          <input
            type="number"
            placeholder="Parcel Weight (KG)"
            className="input input-bordered w-full"
            {...register("parcelWeight", { required: true })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Sender Details */}
          <div>
            <h3 className="font-bold mb-2">Sender Details</h3>
            <input
              type="text"
              placeholder="Sender Name"
              className="input input-bordered w-full mb-2"
              {...register("senderName", { required: true })}
            />

            {/* **********Sender location***************** */}
            <select
              {...register("senderRegion", { required: true })}
              className="select select-bordered w-full mb-2"
              onChange={(e) => {
                setSenderRegion(e.target.value);
                setSenderDistrict("");
              }}
              value={senderRegion}
            >
              <option value="" disabled>
                Select Region
              </option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <select
              {...register("senderDistrict", { required: true })}
              className="select select-bordered w-full mb-2"
              onChange={(e) => setSenderDistrict(e.target.value)}
              value={senderDistrict}
            >
              <option value="" disabled>
                Select District
              </option>
              {senderDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <select
              {...register("senderCoveredArea", { required: true })}
              className="select select-bordered w-full mb-2"
              defaultValue={""}
            >
              <option value="" disabled>
                Select Covered Area
              </option>
              {senderCoveredAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            {/*  **********************/}
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full mb-2"
              {...register("senderAddress")}
            />
            <input
              type="text"
              placeholder="Sender Contact No"
              className="input input-bordered w-full mb-2"
              {...register("senderContact")}
            />

            <textarea
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered w-full"
              {...register("pickupInstruction")}
            ></textarea>
          </div>

          {/* Receiver Details */}
          <div>
            <h3 className="font-bold mb-2">Receiver Details</h3>
            <input
              type="text"
              placeholder="Receiver Name"
              className="input input-bordered w-full mb-2"
              {...register("receiverName", { required: true })}
            />

            {/* ...........Reciver location................ */}
            <select
              {...register("receiverRegion", { required: true })}
              className="select select-bordered w-full mb-2"
              onChange={(e) => {
                setReceiverRegion(e.target.value);
                setReceiverDistrict("");
              }}
              value={receiverRegion}
            >
              <option value="" disabled>
                Select Region
              </option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <select
              {...register("receiverDistrict", { required: true })}
              className="select select-bordered w-full mb-2"
              onChange={(e) => setReceiverDistrict(e.target.value)}
              value={receiverDistrict}
            >
              <option value="" disabled>
                Select District
              </option>
              {receiverDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <select
              {...register("receiverCoveredArea", { required: true })}
              className="select select-bordered w-full mb-2F"
              defaultValue={""}
            >
              <option value="" disabled>
                Select Covered Area
              </option>
              {receiverCoveredAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            {/* .................................... */}
            <input
              type="text"
              placeholder="Receiver Address"
              className="input input-bordered w-full mb-2"
              {...register("receiverAddress")}
            />
            <input
              type="text"
              placeholder="Receiver Contact No"
              className="input input-bordered w-full mb-2"
              {...register("receiverContact")}
            />

            <textarea
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered w-full"
              {...register("deliveryInstruction")}
            ></textarea>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          * PickUp Time 4pm - 7pm Approx.
        </p>

        <button type="submit" className="btn btn-success">Proceed to Confirm Booking</button>
      </form>
    </div>
  );
};

export default AddParcel;
