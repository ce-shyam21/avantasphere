import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// import "./styles/variables.css";
import "../styles/variables.css";
import "../styles/animations.css";
import "../styles/responsive.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AventaSphere - Exporting Excellence",
  description: "Leading export-import company for electronics, textiles, and machinery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`body ${inter.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}