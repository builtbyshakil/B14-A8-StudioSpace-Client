export const metadata = { title: "Terms of Service" };

const SECTIONS = [
  {
    title: "Using StudioSpace",
    text: "StudioSpace is a marketplace that connects creators with studio hosts. By creating an account or making a booking you agree to these terms. You must provide accurate information and keep your login details private.",
  },
  {
    title: "Hosts",
    text: "Hosts are responsible for the accuracy of their listings, including photos, rates, deposits, capacity and amenities. Hosts must keep their space and equipment safe, and must honour bookings they have confirmed.",
  },
  {
    title: "Creators",
    text: "Creators must use a studio only for the hours booked, follow the host's house rules and leave the space as they found it. Creators are responsible for any damage they cause during their session.",
  },
  {
    title: "Bookings and payments",
    text: "A booking starts as Pending and becomes Confirmed when the host accepts it. Confirmed hours cannot overlap with another confirmed booking. The security deposit shown at booking is refundable once the session ends and the space is returned in good condition.",
  },
  {
    title: "Cancellations",
    text: "Creators can cancel a booking while it is still Pending. Cancelling a Confirmed booking should be arranged directly with the host.",
  },
  {
    title: "Acceptable use",
    text: "You may not post misleading listings, upload content you do not have the right to share, harass other users or attempt to break or misuse the platform.",
  },
  {
    title: "Changes and contact",
    text: "We may update these terms as StudioSpace grows, and the latest version will always be on this page. Questions can be sent to support@studiospace.dev.",
  },
];

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-12 md:py-16">
      <h1 className="section-title">Terms of Service</h1>
      <p className="section-subtitle">
        The rules for using StudioSpace as a creator or a host.
      </p>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="mt-3 text-base-content/80">{section.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
