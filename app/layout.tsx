import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TiltFit - Respawn Stronger",
  description:
    "Respawn stronger with TiltFit. Generate your Fitness Rank, turn every League loss into workouts, and level up IRL."
  ,
  icons: {
    icon: "/Tiltfit logo.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
