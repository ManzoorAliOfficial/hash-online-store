import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

const questions = [
  {
    question: "Are your products quality checked?",
    answer:
      "Product listings show the details available for each item. Contact support before ordering if you need a specific quality or compatibility check.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "Cash on Delivery is available at checkout. Online card payments are not enabled yet.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "The current delivery policy estimates 2–4 business days. Your checkout delivery estimate applies to your address.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes. Cash on Delivery is available nationwide according to the current store policy.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "The store provides a 7-day checking and replacement window for manufacturer defects or transit damage. Contact support for help.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Open My Orders and select an order to view its latest status recorded by the store.",
  },
  {
    question: "How can I contact customer support?",
    answer: (
      <>
        Visit our <Link to="/contact" className="font-semibold text-[#2563eb] hover:underline">contact page</Link> for the current phone, email and WhatsApp details.
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <section aria-labelledby="home-faq-heading">
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#2563eb]">
          ✦ &nbsp;Helpful answers
        </p>
        <h2
          id="home-faq-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-[#0f2347] sm:text-3xl"
        >
          Frequently asked questions
        </h2>
      </div>
      <div className="divide-y divide-[#e5ebf4] rounded-2xl border border-[#e5ebf4] bg-white px-4 sm:px-5">
        {questions.map(({ question, answer }) => (
          <details key={question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#0f2347] marker:content-none">
              {question}
              <ChevronDown
                size={16}
                className="shrink-0 text-[#64748b] transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="max-w-3xl pt-3 text-xs leading-5 text-[#64748b]">
              {answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
