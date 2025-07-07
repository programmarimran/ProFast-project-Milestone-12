import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: riders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const handleDeactivate = async (riderId) => {
    try {
      await axiosSecure.patch(`/riders/deactivate/${riderId}`, {
        status: "deactivated",
        email: user.email,
      });
      toast.success("Rider deactivated successfully");
      refetch();
    } catch (err) {
      if (err) {
        toast.error("Failed to deactivate");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FaSpinner className="animate-spin text-3xl text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        ⚠️ Could not load data: {error.message}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

      <div className="overflow-x-auto rounded-xl shadow bg-base-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Vehicle Brand</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders?.map((rider, idx) => (
              <tr key={rider._id}>
                <th>{idx + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.email}</td>
                <td>{rider.number}</td>
                <td>{rider.brand}</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td>
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className="btn btn-sm btn-error"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
