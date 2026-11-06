import Badge from "../Common/Badge";
export default function TrackingStatus({ status }) {
  const tone =
    status === "Delivered" ? "green" : status === "Cancelled" ? "red" : "blue";
  return <Badge tone={tone}>{status || "Pending"}</Badge>;
}
