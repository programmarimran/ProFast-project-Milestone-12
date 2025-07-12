import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-summary");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading admin dashboard...</div>;
  }
  const parcelStatusData = Object.entries(data.parcelStatusCount).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );
  return (
    <div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold">Total Parcels</h2>
          <p className="text-3xl font-bold">{data.totalParcels}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold">Total Paid Amount</h2>
          <p className="text-3xl font-bold">${data.totalPaidAmount}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold">Active Riders</h2>
          <p className="text-3xl font-bold">{data.totalActiveRiders}</p>
        </div>

        {data.parcelStatusCount &&
          Object.entries(data.parcelStatusCount).map(([status, count]) => (
            <div key={status} className="bg-white shadow rounded-xl p-4">
              <h2 className="text-lg font-semibold capitalize">{status}</h2>
              <p className="text-3xl font-bold">{count}</p>
            </div>
          ))}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Parcel Status Overview</h2>

        <PieChart width={400} height={500}>
          <Pie
            data={parcelStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {parcelStatusData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend/>
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashboard;
