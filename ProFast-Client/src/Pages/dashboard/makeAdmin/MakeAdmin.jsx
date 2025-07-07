// MakeAdmin.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const { register, handleSubmit } = useForm();
  const [query, setQuery] = useState("");
  const qc = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async (q) => {
    const { data } = await axiosSecure.get(
      `/search?q=${encodeURIComponent(q)}`//aita ki vaiya encodeURIComponent
    );
    return data; // [{ _id, email, createdAt, role }]
  };

  /* 🔍 search only when `query` truthy */
  const { data: users = [], isFetching } = useQuery({
    queryKey: ["searchUser", query],
    queryFn: () => fetchUsers(query),
    enabled: query.length > 0,
    staleTime: 0,
  });

  /* 🔄 make / remove admin */
  const roleMutation = useMutation({
    mutationFn: ({ id, role }) => //aita ki vaiya mutationFn
      axiosSecure.patch(`/${id}/role`, { role }),
    onSuccess: () => qc.invalidateQueries(["searchUser"]),//aita ki vaiya invalidateQueries
  });

  const onSearch = ({ keyword }) => setQuery(keyword.trim());

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔑 Admin Role Manager</h1>

      {/* 🔍 Search box */}
      <form onSubmit={handleSubmit(onSearch)} className="flex gap-2 mb-6">
        <input
          {...register("keyword")}
          placeholder="Search by email..."
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary">Search</button>
      </form>

      {isFetching && <div>Searching...</div>}
      {/* 🚫 No query yet */}
      {!query && <p className="text-gray-400">Enter an email to search.</p>}

      {/* 📝 Results */}
      {query && !isFetching && (
        <div className="space-y-4">
          {users.length === 0 ? (
            <p className="text-error">No user found.</p>
          ) : (
            users?.map((u) => (
              <div
                key={u._id}
                className="card bg-base-200 shadow p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{u.email}</p>
                  <p className="text-sm text-gray-500">
                    Joined: {new Date(u.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    Role:{" "}
                    <span
                      className={
                        u.role === "admin" ? "text-success font-semibold" : ""
                      }
                    >
                      {u.role || "user"}
                    </span>
                  </p>
                </div>

                {/* Role action */}
                {u.role === "admin" ? (
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() =>
                      roleMutation.mutate({ id: u._id, role: "user" })//mutate ki 
                    }
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      roleMutation.mutate({ id: u._id, role: "admin" })
                    }
                  >
                    Make Admin
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
