import Link from "next/link";
import HowBookingWorks from "@/components/HowBookingWorks";
import HostGuarantee from "@/components/HostGuarantee";

export const metadata = { title: "How It Works" };

const FAQS = [
  {
    question: "When do I pay the security deposit?",
    answer:
      "The deposit is shown in your booking summary and is added to the total due. It is refundable once your session ends and the space is left as you found it.",
  },
  {
    question: "Can two people book the same hours?",
    answer:
      "No. Once a host confirms a booking, those hours are locked. Any new request that overlaps a confirmed booking is rejected with a clear message.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes. You can cancel any booking that is still pending from the My Bookings page. Confirmed bookings are handled with the host.",
  },
  {
    question: "How do I list my own studio?",
    answer:
      "Register, open Add New Studio from your profile menu, fill in the details and upload a cover photo. Your studio appears in Explore Studios right away.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="section-space">
        <div className="container-page">
          <h1 className="section-title">How StudioSpace works</h1>
          <p className="section-subtitle">
            Whether you want to rent a space or earn from one, the process is short and transparent.
          </p>
        </div>
      </section>

      <HowBookingWorks />

      <section className="section-space bg-base-100">
        <div className="container-page">
          <h2 className="section-title">Hosting in three steps</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["List your space", "Add photos, hourly rate, deposit, capacity and the amenities you provide."],
              ["Review requests", "See every booking request on your dashboard and confirm the ones that suit you."],
              ["Welcome creators", "Get your space ready, host the session and mark the booking as completed."],
            ].map(([title, text]) => (
              <div key={title} className="h-full rounded-2xl border border-base-300 bg-base-200 p-6">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-base-content/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HostGuarantee />

      <section className="section-space">
        <div className="container-page max-w-3xl">
          <h2 className="section-title">Common questions</h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.question} className="collapse collapse-arrow card-surface">
                <input type="radio" name="faq" aria-label={faq.question} />
                <div className="collapse-title font-bold">{faq.question}</div>
                <div className="collapse-content text-base-content/70">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/studios" className="btn btn-primary mt-10">
            Explore studios
          </Link>
        </div>
      </section>
    </>
  );
}
