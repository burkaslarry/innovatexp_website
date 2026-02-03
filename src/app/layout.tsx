import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import StructuredData from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InnovateXP | AI CRM Solutions & Smart Sales Automation Hong Kong",
  description: "AI-powered CRM and customer management solutions for Hong Kong SMEs. Automate sales workflows, smart scheduling, and insights. EventXP check-in system. Expert AI consulting.",
  keywords: "AI CRM, AI customer management, smart sales automation, WhatsApp CRM Hong Kong, event check-in system, AI consulting Hong Kong, prompt engineering, EventXP, SmartSales CRM",
  authors: [{ name: "Larry Lo", url: "https://www.linkedin.com/in/larry-lo-804a50165/" }],
  creator: "InnovateXP Limited",
  publisher: "InnovateXP Limited",
  metadataBase: new URL('https://innovatexp.co'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'zh-HK': '/zh',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_HK',
    alternateLocale: ['zh_HK'],
    url: 'https://innovatexp.co',
    siteName: 'InnovateXP Limited',
    title: 'InnovateXP | AI CRM Solutions & Smart Sales Automation Hong Kong',
    description: 'AI-powered CRM and customer management solutions for Hong Kong SMEs. Automate sales workflows, smart scheduling, and insights. EventXP check-in system. Expert AI consulting.',
    images: [
      {
        url: '/innovatexp_color_no_bg.svg',
        width: 1200,
        height: 630,
        alt: 'InnovateXP Limited - AI CRM and Event Management Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InnovateXP | AI CRM Solutions & Smart Sales Automation Hong Kong',
    description: 'AI-powered CRM and customer management solutions for Hong Kong SMEs. Automate sales workflows, smart scheduling, and insights.',
    images: ['/innovatexp_color_no_bg.svg'],
    creator: '@innovatexp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href="https://innovatexp.co/en" />
        <link rel="alternate" hrefLang="zh-HK" href="https://innovatexp.co/zh" />
        <link rel="alternate" hrefLang="x-default" href="https://innovatexp.co/en" />
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
        {/* Hotjar Tracking Code for InnovateXP Limited */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6607429,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fffcf7] dark:bg-gray-900 transition-colors duration-200`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <StructuredData />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
