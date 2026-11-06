import { UserRound } from "lucide-react";
export default function CustomerSummary({ customer = {} }) {
  const name = customer.name || customer.email || "Store customer";
  return (
    <div className="flex items-center gap-2">
      <span className="grid size-8 place-items-center rounded-full bg-[#eaf1ff] text-[#2563eb]">
        <UserRound size={16} />
      </span>
      <span className="grid gap-0.5">
        <b className="text-xs text-[#34445f]">{name}</b>
        <small className="text-[10px] text-[#8491a5]">
          {customer.email || "Guest checkout"}
        </small>
      </span>
    </div>
  );
}
