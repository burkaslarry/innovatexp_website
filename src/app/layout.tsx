import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const OG_IMAGE_REL = "/opengraph-image" as const;

export const metadata: Metadata = {
  title: "InnovateXP｜香港中小企 WhatsApp AI CRM・活動簽到・AI 顧問",
  description:
    "為香港中小企提供 SmartSales CRM、EventXP 活動簽到系統與 AI 顧問服務。將 WhatsApp 查詢與活動 200 人名單變成可跟進 sales pipeline。雲端／On-Premise 可諮詢。Founder-led、14 年實戰經驗，免費 15 分鐘諮詢。",
  metadataBase: new URL(siteUrl),
  openGraph: {
    images: [{ url: OG_IMAGE_REL, width: 1200, height: 630, alt: "InnovateXP" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE_REL],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fffcf7] dark:bg-gray-900 transition-colors duration-200`}
        suppressHydrationWarning
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load',function(){
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6607429,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
