const variants = {
  primary:
    "border-0 bg-[linear-gradient(135deg,#2b7cff,#0a45e6)] text-white shadow-[0_5px_12px_rgba(10,69,230,0.15)] hover:bg-[linear-gradient(135deg,#1c6cf3,#073ccc)] hover:shadow-[0_8px_18px_rgba(10,69,230,0.22)]",
  secondary:
    "border border-[#dce5f3] bg-white text-[#174a93] hover:border-[#aac4f3] hover:bg-[#f2f6ff]",
};

export default function Button({
  children,
  variant = "primary",
  full = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-[9px] px-[17px] py-[13px] text-[13px] font-bold transition duration-200 hover:-translate-y-px focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#94b8ff] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none sm:text-xs ${full ? "w-full" : ""} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
