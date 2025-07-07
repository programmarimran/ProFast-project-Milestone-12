import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

/**
 * 🔎 current user → role fetch → { role, isAdmin, isLoading }
 *
 * - রোল না মিললে default "user"
 * - TanStack Query ক্যাশ করবে, staleTime দিয়ে ৫‑মিনিট পর্যন্ত আবার ফেচ করবে না
 */
const useUserRole = () => {
  const { user, loading: authLoading } = useAuth(); // Auth থেকে user পাই
  const axiosSecure=useAxiosSecure()

  const {
    data: roleData,
    isLoading: roleFetching,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email], // email বদলালেই নতুন কুয়েরি
    enabled: !!user?.email, // email না আসা পর্যন্ত ফেচ না
    staleTime: 5 * 60 * 1000, // ৫‑মিনিট ক্যাশ
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/role/${user.email}`);
      // backend =>  { role: "admin" }  বা { role: "user" }
      return res.data.role || "user";
    },
  });

  // সামারাইজ
  const role = roleData || "user";
  const isRoleLoading = authLoading || roleFetching;

  return { role, isRoleLoading, error };
};

export default useUserRole;
