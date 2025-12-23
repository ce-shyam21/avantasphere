import type { Metadata } from "next";
import "./globals.css";
import "./styles/variables.css";
import "./styles/animations.css";
import "./styles/responsive.css";

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
      <body className="body">
        {children}
      </body>
    </html>
  );
}