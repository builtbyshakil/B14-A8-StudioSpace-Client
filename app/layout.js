import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "StudioSpace | Rent Creative Studios by the Hour",
    template: "%s | StudioSpace",
  },
  description:
    "Find and book photo studios, sound stages, podcast rooms, music suites and art workshops by the hour on StudioSpace.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("studiospace-theme");if(t!=="studiolight"&&t!=="studiodark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"studiodark":"studiolight"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","studiolight")}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="studiolight" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-base-200 text-base-content">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: { background: "#161b24", color: "#e8ebf2" },
          }}
        />
      </body>
    </html>
  );
}
