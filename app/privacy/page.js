export const metadata = { title: "Privacy Policy" };

const SECTIONS = [
  {
    title: "What we collect",
    text: "When you register we store your name, email address and the profile photo link you provide. If you sign in with Google, we receive your name, email address and profile photo from Google. When you book or list a studio, we store the booking details, studio details and the images you upload.",
  },
  {
    title: "How we use it",
    text: "We use your information to create your account, let you list and book studios, show hosts who has requested their space, and generate booking invoices. We do not sell your personal information and we do not use it for advertising.",
  },
  {
    title: "Cookies and sessions",
    text: "StudioSpace uses a session cookie to keep you logged in and a secure HTTP-only cookie that proves your identity to our server when you create listings or bookings. These cookies are required for the site to work and are removed when you log out.",
  },
  {
    title: "Third-party services",
    text: "Your data is stored in a MongoDB database. Images you upload are hosted by imgbb. Google provides optional sign-in. These services process data only as needed to provide their part of StudioSpace.",
  },
  {
    title: "What other people can see",
    text: "Your studio listings, your name and your host profile photo are visible to other visitors. A host can see the name and email of a creator who requests a booking. Your password is never visible to anyone.",
  },
  {
    title: "Your choices",
    text: "You can edit or delete your studio listings at any time from My Studio Listings and cancel pending bookings from My Bookings. To request deletion of your account and data, contact us using the email below.",
  },
  {
    title: "Contact",
    text: "Questions about this policy can be sent to support@studiospace.dev.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-12 md:py-16">
      <h1 className="section-title">Privacy Policy</h1>
      <p className="section-subtitle">
        This policy explains what StudioSpace collects and how it is used.
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
