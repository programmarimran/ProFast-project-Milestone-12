import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackerPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["trackParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/track-parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Track Your Packages</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Status</th>
              <th>Estimated Delivery</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel._id}</td>
                <td>
                  <span className="badge badge-info">{parcel.deliveryStatus}</span>
                </td>
                <td>{new Date(parcel.estimatedDelivery).toLocaleString() || "N/A"}</td>
                <td>{new Date(parcel.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackerPage;
