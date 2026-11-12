import { FiCheckCircle, FiClock, FiSearch, FiVideo } from "react-icons/fi";

const STEPS = [
  {
    icon: FiSearch,
    title: "Discover Spaces",
    text: "Filter by studio type, location and price to find a space that fits your project.",
  },
  {
    icon: FiClock,
    title: "Select Shoot Hours",
    text: "Pick a date and the exact hours you need. Confirmed slots are shown so you can avoid clashes.",
  },
  {
    icon: FiCheckCircle,
    title: "Book Instantly",
    text: "Send your booking in one click. You see the rent and refundable deposit before you confirm.",
  },
  {
    icon: FiVideo,
    title: "Create & Produce",
    text: "Arrive, set up and shoot. The host has everything ready, so your hours go to the work.",
  },
];

export default function HowBookingWorks() {
  return (
    <section className="section-space">
      <div className="container-page">
        <h2 className="section-title">How booking works</h2>
        <p className="section-subtitle">
          From search to shoot day in four simple steps.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="card-surface h-full p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon size={24} />
                </span>
                <span className="font-display text-4xl font-extrabold text-base-content/15">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-base-content/70">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
