import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AvatarProvider from "@/Provider/AvatarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Skranji:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AvatarProvider>{children}</AvatarProvider>
      </body>
    </html>
  );
}
