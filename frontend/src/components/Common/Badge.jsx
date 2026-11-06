const tones = {
  blue: "bg-[#eff4ff] text-[#2563eb]",
  green: "bg-[#e9f8ed] text-[#16803b]",
  orange: "bg-[#fff5e5] text-[#c17b00]",
  red: "bg-[#fff0ef] text-[#cc4841]",
};

export default function Badge({ children, label, status, tone }) {
  let resolvedTone = tone;
  if (!resolvedTone && status) {
    if (status === "Delivered" || status === "Active" || status === "Published")
      resolvedTone = "green";
    else if (
      status === "Cancelled" ||
      status === "Returned" ||
      status === "Out of stock" ||
      status === "Hidden"
    )
      resolvedTone = "red";
    else if (
      status === "Processing" ||
      status === "Low stock" ||
      status === "Pending"
    )
      resolvedTone = "orange";
    else resolvedTone = "blue";
  }
  const text = children ?? label ?? status;
  return (
    <span
      className={`inline-flex items-center rounded-[5px] px-2 py-[4px] text-[10px] font-bold tracking-wide ${tones[resolvedTone] || tones.blue}`}
    >
      {text}
    </span>
  );
}
