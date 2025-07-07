import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  // 1. Fetch pending riders
  const {
    data: riders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });
  console.log(riders);

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
  const handleDecision = async (riderId, decision) => {
    try {
      if (!decision) {
        // Delete rider
        await axiosSecure.patch(`/riders/deactivate/${riderId}`);
        toast.success("Rider application Deactived.");
      } else {
        // Approve rider
        await axiosSecure.patch(`/riders/approve/${riderId}`, {
          status: "approved",
          email: user.email,
        });
        toast.success("Rider approved successfully.");
      }

      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto rounded-xl shadow bg-base-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Creatd</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, idx) => (
              <tr key={rider._id}>
                <td>{idx + 1}</td>
                <td>{rider.riderName}</td>
                <td>{rider.email}</td>
                {/* <td>{new Date(rider.created_at).toISOString()}</td> */}
                <td>{new Date(rider.created_at).toLocaleDateString()}</td>
                <td>{rider.brand}</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => {
                      setSelectedRider(rider);
                      setIsModalOpen(true);
                    }}
                  >
                    <FaEye className="mr-1" /> Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedRider && (
        <dialog id="riderModal" className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-xl mb-2">Rider Information</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedRider.riderName}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.number}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.idCard}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>Upazila:</strong> {selectedRider.upozila}
              </p>
              <p>
                <strong>Vehicle:</strong> {selectedRider.brand} (
                {selectedRider.model})
              </p>
              <p>
                <strong>Registration:</strong> {selectedRider.regNumber}
              </p>
              <p>
                <strong>AddressInfo:</strong> {selectedRider.addressInfo}
              </p>
            </div>

            <div className="modal-action justify-between">
              <button
                onClick={() => handleDecision(selectedRider._id, true)}
                className="btn btn-success"
              >
                <FaCheck className="mr-1" /> Approve
              </button>
              <button
                onClick={() => handleDecision(selectedRider._id, false)}
                className="btn btn-error"
              >
                <FaTimes className="mr-1" /> Reject
              </button>
              <button
                onClick={() => setSelectedRider(null)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
