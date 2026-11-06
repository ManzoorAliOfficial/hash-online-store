export default function StatCard({
  icon: Icon,
  label,
  value,
  delta = "",
  down = false,
}) {
  return (
    <article className="rounded-xl border border-[#e4eaf3] bg-white p-4 shadow-[0_8px_24px_rgba(16,36,73,.04)]">
      <div className="flex items-center justify-between text-xs text-[#71809a]">
        <span>{label}</span>
        {Icon && (
          <Icon className="text-[#2563eb]" size={18} aria-hidden="true" />
        )}
      </div>
      <strong className="mt-3 block text-xl text-[#17233b]">{value}</strong>
      {delta && (
        <small
          className={`mt-2 block text-[10px] ${down ? "text-[#d14343]" : "text-[#16803b]"}`}
        >
          {delta}
        </small>
      )}
    </article>
  );
}
