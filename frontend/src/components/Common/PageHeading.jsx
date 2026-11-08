export default function PageHeading({
  eyebrow = "HASH ONLINE STORE",
  title,
  children,
  compact = false,
}) {
  return (
    <div className={compact ? "mb-6" : "mb-10 max-[600px]:mb-7"}>
      {eyebrow && (
        <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">
          {eyebrow}
        </span>
      )}
      <h1
        className={
          compact
            ? "mt-2 text-[30px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-[24px]"
            : "mt-3 text-[48px] font-extrabold leading-tight tracking-[-.055em] text-[#071a3d] max-[900px]:text-[38px] max-[600px]:text-[28px]"
        }
      >
        {title}
      </h1>
      {children && (
        <div
          className={
            compact
              ? "mt-2 max-w-[480px] text-xs leading-6 text-[#71809a]"
              : "mt-3 max-w-[680px] text-base leading-7 text-[#71809a] max-[600px]:text-xs max-[600px]:leading-6"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
}
