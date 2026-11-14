import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import Container from "../components/Layout/Container";
import { notify } from "../components/Common/Toast";

export default function Contact() {
  const { saveMessage } = useStore();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    saveMessage({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    e.currentTarget.reset();
    setSent(true);
    notify("Message saved in this browser demo. No email was sent.");
  };

  return (
    <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
      <PageHeading eyebrow="WE’RE HERE TO HELP" title="Get in touch">
        <p>
          Questions about an item or order? Send us a message and our team will
          be glad to assist you.
        </p>
      </PageHeading>

      <div className="grid grid-cols-[.85fr_1.15fr] gap-6 max-[800px]:grid-cols-1">
        <div className="grid gap-4 rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
          <div className="flex items-start gap-3.5">
            <div className="grid size-9 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
              <MapPin size={18} />
            </div>
            <div className="grid gap-0.5">
              <b className="text-xs font-bold text-[#17233b]">Main Office</b>
              <small className="text-xs text-[#71809a]">
                SadiqAbad, Punjab, Pakistan
              </small>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="grid size-9 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
              <Mail size={18} />
            </div>
            <div className="grid gap-0.5">
              <b className="text-xs font-bold text-[#17233b]">Email Support</b>
              <small className="text-xs text-[#71809a]">
                support@hashstore.pk
              </small>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="grid size-9 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
              <Phone size={18} />
            </div>
            <div className="grid gap-0.5">
              <b className="text-xs font-bold text-[#17233b]">Call Assistance</b>
              <small className="text-xs text-[#71809a]">
                Monday – Saturday · 9:00 AM – 6:00 PM
              </small>
            </div>
          </div>
          <div className="mt-2 grid min-h-[160px] place-items-center rounded-xl bg-[radial-gradient(circle_at_50%_40%,#d8e7ff,#eef3fb_62%)] p-4 text-center text-[#2563eb]">
            <MapPin size={28} />
            <span className="mt-2 text-xs font-bold uppercase tracking-wider text-[#102449]">
              Hash Online Store Pakistan
            </span>
          </div>
        </div>

        <form
          className="grid gap-4 rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-base font-bold text-[#17233b]">Send us a message</h2>
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            Your name *
            <input
              name="name"
              className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs outline-none transition focus:border-[#2563eb] focus:bg-white"
              required
              placeholder="e.g. Bilal Ahmed"
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            Email address *
            <input
              name="email"
              className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs outline-none transition focus:border-[#2563eb] focus:bg-white"
              required
              type="email"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            Subject *
            <input
              name="subject"
              className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs outline-none transition focus:border-[#2563eb] focus:bg-white"
              required
              placeholder="Inquiry regarding product or order"
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            How can we help? *
            <textarea
              name="message"
              className="rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 py-2 text-xs outline-none transition focus:border-[#2563eb] focus:bg-white"
              required
              rows="4"
              placeholder="Tell us what you need help with..."
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-[42px] w-fit items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-6 text-xs font-bold text-white transition hover:bg-[#174fcc] active:scale-[0.99]"
          >
            Send message <ArrowRight size={15} />
          </button>
          {sent && (
            <p className="rounded-lg bg-[#eaf1ff] p-3 text-xs font-semibold text-[#1d4ed8]" role="status">
              Message saved in this browser demo. It was not sent to the store.
            </p>
          )}
        </form>
      </div>
    </Container>
  );
}
