// import { Geist, Geist_Mono } from "next/font/google";
import "../../public/assets/css/vendor/bootstrap.min.css";
import "../../public/assets/css/plugins/fontawesome-all.min.css";
import "../../public/assets/css/plugins/feature.css";
import "../../public/assets/css/plugins/animation.css";
import "../../public/assets/css/plugins/slick.css";
import "../../public/assets/css/plugins/slick-theme.css";
import "../../public/assets/css/plugins/bootstrap-select.min.css";
import "../../public/assets/css/plugins/prism.css";
import "../../public/assets/css/style.css";
import "./globals.css";
import Head from "next/head";
import Providers from "../context/Providers";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "DigiRDP - Secure & Fast RDP and Cloud VPS Solutions",
  description:
    "DigiRDP offers secure, fast, and reliable RDP and dedicated Cloud VPS solutions. Enjoy 24/7 expert support and unmatched performance with SSD-powered servers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="theme-style-mode" content="0" />
      </Head>
      <Providers>
        <body style={{ fontFamily: "'Sora', sans-serif" }}>
          {children}
          <script src="/assets/js/vendor/bootstrap.min.js"></script>
        </body>
      </Providers>
    </html>
  );
}
