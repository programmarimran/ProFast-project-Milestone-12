// ✅ CompletedDeliveries.jsx
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: completedParcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", "completed"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/complited-deliveries-parcels?status=delivered"
      );
      return res.data.filter((p) => p.deliveryStatus === "delivered");
    },
  });

  const handleCashout = async (parcelId) => {
    try {
      const res = await axiosSecure.patch(`/parcel/${parcelId}/cashout`);
      if (res.data?.insertedId) {
        Swal.fire("✅ Success", "Cashout successful", "success");
        refetch();
      } else {
        Swal.fire("Something went wrong during cashout.");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Cashout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-6">Loading completed deliveries...</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Completed Deliveries</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Parcel ID</th>
              <th>Name</th>
              <th>Receiver</th>
              <th>Receiver Area</th>
              <th>Cost</th>
              <th>Earning</th>
              <th>Delivered At</th>
              <th>Cashout</th>
            </tr>
          </thead>
          <tbody>
            {completedParcels.map((parcel) => {
              const isCashedOut = parcel?.earningInfo?.isCashedOut;
              const earningAmount =
                parcel.earningAmount || parcel.earningInfo?.amount || 0;

              return (
                <tr key={parcel._id}>
                  <td>{parcel.parcel_id}</td>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverCoveredArea}</td>
                  <td>${parcel.parcelCost}</td>
                  <td className="text-green-600 font-semibold">
                    ${earningAmount}
                  </td>
                  <td>{format(new Date(parcel.updated_at), "PPpp")}</td>
                  <td>
                    <button
                      onClick={() => handleCashout(parcel._id)}
                      disabled={isCashedOut}
                      className={`btn btn-sm ${
                        isCashedOut ? "btn-disabled cursor-not-allowed" : "btn-success"
                      }`}
                    >
                      {isCashedOut ? "Cashed Out" : "Cash Out"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
