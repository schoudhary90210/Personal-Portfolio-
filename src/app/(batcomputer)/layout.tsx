import type { Metadata } from "next";
import { Oswald, JetBrains_Mono } from "next/font/google";
import "./batcomputer.css";
import { site } from "@/content/site";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// A separate root layout keeps the Batman fonts, cursor and global CSS
// isolated from the main site; navigating between the two is a full reload.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `Batcomputer — ${site.name}`,
  description:
    "The Batman Arkham–inspired version of Siddhant Choudhary's portfolio: a Batcomputer terminal with a boot sequence, Arsenal and Case History.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
