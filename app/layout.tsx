import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Sidebar } from "@/components/layout/sidebar";
import { AudioPlayer } from "@/components/player/audio-player";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subliminal - High Energy Audio Experience",
  description: "Upload, curate, and listen to subliminal audio tracks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Providers>
          <Nav />
          <div className="flex pt-16">
            <Sidebar />
            <main className="flex-1 ml-64 pb-24">
              {children}
            </main>
          </div>
          <AudioPlayer />
        </Providers>
      </body>
    </html>
  );
}
