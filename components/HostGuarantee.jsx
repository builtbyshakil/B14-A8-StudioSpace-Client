import { FiHeadphones, FiShield, FiTool, FiUserCheck } from "react-icons/fi";

const GUARANTEES = [
  {
    icon: FiShield,
    title: "Liability protection",
    text: "Every booking is covered by clear house rules and a refundable security deposit.",
  },
  {
    icon: FiUserCheck,
    title: "Verified profiles",
    text: "Hosts and creators sign in with verified accounts, so you know who you are working with.",
  },
  {
    icon: FiTool,
    title: "Equipment safety",
    text: "Hosts list their gear and amenities up front, and keep lighting and audio equipment in working order.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 host support",
    text: "Stuck on shoot day? Our support team is available around the clock for hosts and creators.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="section-space bg-base-100">
      <div className="container-page">
        <h2 className="section-title">Host guarantee and creator support</h2>
        <p className="section-subtitle">
          StudioSpace protects both sides of every booking.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-2xl border border-base-300 bg-base-200 p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-content">
                <item.icon size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-base-content/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
