import { AlertCircle } from "lucide-react";
export default function ErrorState({
  message = "Something went wrong. Please try again.",
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg border border-[#ffcaca] bg-[#fff4f4] p-4 text-sm text-[#c0333a]"
      role="alert"
    >
      <AlertCircle size={22} />
      <p>{message}</p>
    </div>
  );
}
