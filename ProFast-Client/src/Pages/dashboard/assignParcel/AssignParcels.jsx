// 📦 AssignParcels.jsx (with Tenstack Query CRUD)
import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignParcels = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [availableRiders, setAvailableRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);

  // Load pending parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?deliveryStatus=Pending");
      return res.data;
    },
  });
//   console.log(parcels);
  // Load riders based on parcel's delivery area
  const fetchRidersByArea = async (area) => {
    console.log(area)
    const res = await axiosSecure.get(`/riders/available?upozila=${area}`);
    setAvailableRiders(res.data);
  };
console.log(availableRiders)
  const handleAssignClick = async (parcel) => {
    setSelectedParcel(parcel);
    await fetchRidersByArea(parcel.receiverCoveredArea);
  };

  // Mutation for assigning rider
  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      return await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, {
        riderEmail: rider.email,
        riderName: rider.riderName,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["parcels", "pending"]);
      setSelectedParcel(null);
      setSelectedRider(null);
    },
  });

  const handleConfirmAssign = () => {
    if (selectedParcel && selectedRider) {
      assignMutation.mutate({
        parcelId: selectedParcel._id,
        rider: selectedRider,
      });
    }
  };

  if (isLoading)
    return <div className="text-center p-6">Loading parcels...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Parcels to Riders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Sender Center</th>
              <th>Receiver Center</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.parcel_id}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.type}</td>
                <td>{parcel.senderCoveredArea}</td>
                <td>{parcel.receiverCoveredArea}</td>
                <td>${parcel.parcelCost}</td>
                <td>{format(new Date(parcel.creation_date), "PPpp")}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAssignClick(parcel)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">Assign Rider</h3>
            <p className="mb-4">Parcel: {selectedParcel.trackingId}</p>
            <select
              className="select w-full mb-4"
              onChange={(e) => {
                const rider = availableRiders.find(
                  (r) => r.email === e.target.value
                );
                setSelectedRider(rider);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select a rider ({availableRiders.length} found)
              </option>
              {availableRiders?.map((rider) => (
                <option key={rider._id} value={rider.email}>
                  {rider.name} - {rider.email}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedParcel(null);
                  setSelectedRider(null);
                }}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssign}
                className="btn btn-sm btn-success"
                disabled={!selectedRider || assignMutation.isPending}
              >
                {assignMutation.isPending ? "Assigning..." : "Confirm Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignParcels;
