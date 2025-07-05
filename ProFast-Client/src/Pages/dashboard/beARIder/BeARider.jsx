import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const axiosSecure = useAxiosSecure();
  const coverageArea = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    isLoading,
  } = useForm();
  const selectedRegion = watch("district"); // <select name="district"> এর বর্তমান মান

  // ইউনিক region লিস্ট তৈরি
  const regionOptions = React.useMemo(
    () => [...new Set(coverageArea.map((item) => item.region))],
    [coverageArea]
  );

  // বেছে‑নেওয়া region-এর সব upazila বের করুন
  const upozilaOptions = React.useMemo(() => {
    if (!selectedRegion) return [];
    return coverageArea
      .filter((item) => item.region === selectedRegion)
      .flatMap((item) => item.covered_area);
  }, [coverageArea, selectedRegion]);

  const onSubmit = (data) => {
    // console.log(data);
    data.status = "pending";
    axiosSecure.post(`/rider`, data).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire("application successfull");
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Be A Rider</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-200 p-6 rounded-xl"
      >
        <div>
          <label className="label">Rider Name</label>
          <input
            {...register("riderName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your full name"
          />
          {errors.riderName && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="label">Age</label>
          <input
            type="number"
            {...register("age", { required: true })}
            className="input input-bordered w-full"
            placeholder="Age"
          />
          {errors.age && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="label">Phone Number</label>
          <input
            type="tel"
            {...register("number", { required: true })}
            className="input input-bordered w-full"
            placeholder="01XXXXXXXXX"
          />
          {errors.number && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="label">ID Card Number</label>
          <input
            {...register("idCard", { required: true })}
            className="input input-bordered w-full"
            placeholder="National ID"
          />
          {errors.idCard && <span className="text-red-500">Required</span>}
        </div>

        {/* -------- Region (District নামে দেখানো) -------- */}
        <div>
          <label className="label">Region</label>
          <select
            {...register("district", { required: true })}
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Region --
            </option>
            {regionOptions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
          {errors.district && <span className="text-red-500">Required</span>}
        </div>

        {/* -------- Upozila -------- */}
        <div>
          <label className="label">Upozila</label>
          <select
            {...register("upozila", { required: true })}
            className="select select-bordered w-full"
            defaultValue=""
            disabled={!selectedRegion}
          >
            <option value="" disabled>
              -- Select Upozila --
            </option>
            {upozilaOptions.map((upz, i) => (
              <option key={i} value={upz}>
                {upz}
              </option>
            ))}
          </select>
          {errors.upozila && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="label">Vehicle Brand</label>
          <input
            {...register("brand", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g., Honda"
          />
          {errors.brand && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="label">Registration Number</label>
          <input
            {...register("regNumber", { required: true })}
            className="input input-bordered w-full"
            placeholder="Vehicle Reg No."
          />
          {errors.regNumber && <span className="text-red-500">Required</span>}
        </div>

        <div className="md:col-span-2">
          <label className="label">Address Info</label>
          <textarea
            {...register("addressInfo", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="House, Road, Area..."
          />
          {errors.addressInfo && <span className="text-red-500">Required</span>}
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="btn btn-primary px-10"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Apply Now"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default BeARider;
