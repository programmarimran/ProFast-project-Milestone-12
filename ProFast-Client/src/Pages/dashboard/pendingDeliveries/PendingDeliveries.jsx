// 📦 PendingDeliveries.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch parcels with deliveryStatus 'assigned' or 'in_transit'
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "pending-deliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-deliveries-parcels?status=active");
      return res.data.filter(
        (p) => p.deliveryStatus === "assigned" || p.deliveryStatus === "in_transit"
      );
    },
  });

  // Update deliveryStatus mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, newStatus,parcelCost }) => {
      return await axiosSecure.patch(`/parcels/${id}/update-status-and-earning`, {
        status: newStatus,parcelCost
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["parcels", "pending-deliveries"]);
    },
  });

  const handleStatusUpdate = (parcel) => {
    const current = parcel.deliveryStatus;
    const nextStatus = current === "assigned" ? "in_transit" : "delivered";
    statusMutation.mutate({ id: parcel._id, newStatus: nextStatus,parcelCost:parcel.parcelCost});
  };

  if (isLoading) return <div className="text-center p-6">Loading deliveries...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Receiver Area</th>
              <th>Cost</th>
              <th>Status</th>
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
                <td>{parcel.receiverCoveredArea}</td>
                <td>${parcel.parcelCost}</td>
                <td>
                  <span className="badge badge-info text-white">
                    {parcel.deliveryStatus}
                  </span>
                </td>
                <td>{format(new Date(parcel.creation_date), "PPpp")}</td>
                <td>
                  <button
                    onClick={() => handleStatusUpdate(parcel)}
                    className="btn btn-sm btn-warning"
                  >
                    {parcel.deliveryStatus === "assigned"
                      ? "Start Delivery"
                      : "Mark Delivered"}
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

export default PendingDeliveries;
