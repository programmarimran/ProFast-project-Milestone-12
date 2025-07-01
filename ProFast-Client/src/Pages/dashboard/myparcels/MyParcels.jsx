import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user.email],
    queryFn: async () => {
      const parcels = await axiosSecure.get(`/myparcels?email=${user.email}`);
      return parcels;
    },
  });

  const parcelData = parcels?.data;
  console.log(parcelData);
  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // 🧨 DELETE operation here (example using axios/fetch)
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  }; //table-zebra css class aita dara row alada alada hoi
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* ---------- HEAD ---------- */}
        <thead className="bg-base-200 dark:bg-base-300">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Created</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* ---------- BODY ---------- */}
        <tbody>
          {parcelData?.map((p, i) => (
            <tr key={p._id}>
              <td>{i + 1}</td>
              <td>{p.parcelName}</td>
              <td>{p.type}</td>
              <td>{formatDate(p.creation_date)}</td>
              <td>৳ {p.parcelCost}</td>

              {/* Payment badge */}
              <td>
                <span
                  className={`badge text-white
                    ${
                      p.paymentStatus === "Unpaid"
                        ? "badge-error dark:bg-red-700"
                        : "badge-success dark:bg-green-700"
                    }`}
                >
                  {p.paymentStatus}
                </span>
              </td>

              {/* Actions */}
              <td className="flex gap-2">
                <button
                  //   onClick={() => console.log("view", p)}
                  className="btn btn-sm btn-info text-white dark:bg-sky-600"
                >
                  <FaEye />
                </button>

                {p.paymentStatus !== "paid" ? (
                  <Link to={`/dashboard/payment/${p._id}`}>
                    <button className="btn btn-sm btn-warning text-white dark:bg-yellow-600">
                      Pay
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="btn btn-sm bg-gray-400 text-white opacity-60 cursor-not-allowed"
                    style={{ pointerEvents: "auto" }} // Optional fallback
                  >
                    Paid
                  </button>
                )}

                <button
                  onClick={() => handleDelete(p._id)}
                  className="btn btn-sm btn-error text-white dark:bg-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
