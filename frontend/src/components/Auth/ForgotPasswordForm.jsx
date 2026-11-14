import { Link } from "react-router";
import { ArrowLeft, Mail, ShieldAlert } from "lucide-react";

export default function ForgotPasswordForm() {
  return (
    <div className="grid gap-4">
      <section
        className="rounded-2xl border border-[#dce5f3] bg-[#f8fafd] p-5"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf1ff] text-[#2563eb]">
            <ShieldAlert size={19} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#17233b]">
              Password recovery is unavailable
            </h3>
            <p className="text-xs leading-relaxed text-[#52617a]">
              This frontend demo has no password reset service connected. No email or reset link will be sent.
            </p>
          </div>
        </div>
      </section>

      <a
        href="mailto:support@hashstore.pk"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dce5f3] bg-white px-4 text-xs font-bold text-[#2563eb] transition hover:bg-[#f4f7fc]"
      >
        <Mail size={15} /> Contact support
      </a>
      <Link
        to="/login"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl text-xs font-bold text-[#2563eb] transition hover:text-[#174fcc]"
      >
        <ArrowLeft size={15} /> Back to Sign In
      </Link>
    </div>
  );
}
