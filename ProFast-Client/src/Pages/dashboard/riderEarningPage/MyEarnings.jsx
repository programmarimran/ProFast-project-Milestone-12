// ✅ MyEarnings.jsx
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["rider-earnings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/earnings-summary");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading earning summary...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold">Total Earning</h2>
        <p className="text-2xl text-green-600 font-bold">৳ {data.totalEarning}</p>
      </div>

      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold">Total Cashed Out</h2>
        <p className="text-2xl text-blue-600 font-bold">৳ {data.totalCashedOut}</p>
      </div>

      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold">Pending Cashout</h2>
        <p className="text-2xl text-red-600 font-bold">৳ {data.pendingCashout}</p>
      </div>

      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold">Today’s Earning</h2>
        <p className="text-xl font-bold">৳ {data.todayEarning}</p>
      </div>

      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold">Last 7 Days</h2>
        <p className="text-xl font-bold">৳ {data.lastWeekEarning}</p>
      </div>

      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold">Last 30 Days</h2>
        <p className="text-xl font-bold">৳ {data.lastMonthEarning}</p>
      </div>

      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold">Last 1 Year</h2>
        <p className="text-xl font-bold">৳ {data.lastYearEarning}</p>
      </div>
    </div>
  );
};

export default MyEarnings;

/*
✅ Backend API Example:

app.get("/rider/earnings-summary", tokenFbVerify, async (req, res) => {
  const email = req.decoded.email;
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastWeek = new Date(now.setDate(now.getDate() - 7));
  const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
  const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));

  const parcels = await parcelCollection.find({
    "assignedRider.email": email,
    deliveryStatus: "delivered",
  }).toArray();

  const summary = {
    totalEarning: 0,
    totalCashedOut: 0,
    pendingCashout: 0,
    todayEarning: 0,
    lastWeekEarning: 0,
    lastMonthEarning: 0,
    lastYearEarning: 0,
  };

  parcels.forEach(p => {
    const updatedAt = new Date(p.updated_at);
    const amount = p.earningAmount || 0;
    if (p.earningInfo?.isCashedOut) {
      summary.totalCashedOut += amount;
    } else {
      summary.pendingCashout += amount;
    }
    summary.totalEarning += amount;

    if (updatedAt >= today) summary.todayEarning += amount;
    if (updatedAt >= lastWeek) summary.lastWeekEarning += amount;
    if (updatedAt >= lastMonth) summary.lastMonthEarning += amount;
    if (updatedAt >= lastYear) summary.lastYearEarning += amount;
  });

  res.json(summary);
});
*/
