import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const OG_IMAGE_REL = "/opengraph-image" as const;

export const metadata: Metadata = {
  title: "AI商業升級教練｜中小企AI陪跑、SOP及流程優化｜InnovateXP",
  description:
    "InnovateXP 由 Larry Lo 擔任 AI 商業升級教練，陪香港中小企先梳理 SOP、流程與 KPI，再按需要落地 AI 陪跑、automation、CRM 或 SaaS。",
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
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
                if (!window.matchMedia || !window.matchMedia('(min-width: 1024px)').matches) return;
                const loadHotjar = function(){
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6607429,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                };
                if ('requestIdleCallback' in window) window.requestIdleCallback(loadHotjar, { timeout: 4000 });
                else window.setTimeout(loadHotjar, 3000);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
