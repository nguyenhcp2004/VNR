import type { Metadata } from "next";
import { Geist, Geist_Mono, Crimson_Text } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-crimson-text"
});

export const metadata: Metadata = {
  title: "Cách mạng Tháng Tám 1945",
  description: "Hành trình từ Hội nghị Trung ương 6 (1939) đến ngày Độc lập 2/9/1945 - MLN131 Nhóm 3",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonText.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
