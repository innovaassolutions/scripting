import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Creator's Script",
  description: "Script writing template for video creators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
