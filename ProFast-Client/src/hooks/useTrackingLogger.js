import useAxiosSecure from "./useAxiosSecure";

const useTrackingLogger = () => {
  const axiosSecure = useAxiosSecure();

  const logTracking = async ({ parcelId, status, statusBy, statusDetails }) => {
    try {
      await axiosSecure.post("/tracking-logs", {
        parcelId,
        status,
        statusBy,
        statusDetails,
      });
      console.log("✅ Tracking log saved");
    } catch (err) {
      console.error("❌ Tracking log failed:", err);
    }
  };

  return { logTracking };
};

export default useTrackingLogger;
