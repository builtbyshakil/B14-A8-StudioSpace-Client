import Link from "next/link";
import { FiHeart, FiKey, FiUsers } from "react-icons/fi";

export const metadata = { title: "About Us" };

const BELIEFS = [
  {
    icon: FiKey,
    title: "Access beats ownership",
    text: "A creator should not need to buy a cyc wall or a mixing desk to make great work. Renting by the hour makes pro spaces reachable.",
  },
  {
    icon: FiUsers,
    title: "Hosts are partners",
    text: "Studio owners know their rooms best. We give them simple tools, fair visibility and control over who books and when.",
  },
  {
    icon: FiHeart,
    title: "Clear prices, no surprises",
    text: "Rent, deposit and total are shown before you book, so everyone agrees on the cost before the first light is switched on.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section-space">
        <div className="container-page max-w-4xl">
          <h1 className="section-title">About StudioSpace</h1>
          <p className="mt-5 text-lg text-base-content/80">
            StudioSpace is a peer-to-peer marketplace for creative spaces. We connect
            photographers, filmmakers, podcasters, musicians and artists with studio
            owners who have room to spare, and we make the booking as simple as
            picking a date and an hour.
          </p>
          <p className="mt-4 text-base-content/70">
            Our mission is to put a well-equipped space within reach of every
            creator, and to help every host earn from the hours their studio would
            otherwise sit empty.
          </p>
        </div>
      </section>

      <section className="section-space bg-base-100">
        <div className="container-page">
          <h2 className="section-title">What we believe</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {BELIEFS.map((belief) => (
              <div key={belief.title} className="h-full rounded-2xl border border-base-300 bg-base-200 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content">
                  <belief.icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{belief.title}</h3>
                <p className="mt-2 text-sm text-base-content/70">{belief.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page text-center">
          <h2 className="section-title">Ready to make something?</h2>
          <p className="section-subtitle mx-auto">
            Find a space for your next project or list your own for creators to book.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/studios" className="btn btn-primary">
              Explore studios
            </Link>
            <Link href="/add-studio" className="btn btn-outline">
              Add your studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
