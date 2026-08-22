import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Amline | Inquiry Monitoring",
  description: "داشبورد مانیتورینگ سرویس‌ها و سازمان‌های ارائه‌دهنده استعلام",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="min-h-full bg-slate-50 font-[family-name:var(--font-vazirmatn)] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
