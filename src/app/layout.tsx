import type { Metadata } from "next";
import "./globals.css";

import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { getSiteUrl } from "@/lib/site-url";
import { rootFontClassName } from "@/lib/fonts";

const siteUrl = getSiteUrl();
const OG_IMAGE_REL = "/opengraph-image" as const;

export const metadata: Metadata = {
  title: {
    default: "AI Business Consultancy | Fix Workflows, Then AI | InnovateXP",
    template: "%s | InnovateXP",
  },
  description:
    "InnovateXP helps SMEs clarify SOPs and KPIs first, then adopt AI through advisory programs, trials, and optional CRM or automation.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    images: [{ url: OG_IMAGE_REL, width: 1200, height: 630, alt: "InnovateXP" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE_REL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" suppressHydrationWarning>
      <head>
        {/* GEO / AEO citation-brief discovery — point AI answer engines to the llms.txt cluster. */}
        <link rel="alternate" type="text/plain" title="InnovateXP llms.txt" href={`${siteUrl}/llms.txt`} />
        <link rel="alternate" type="text/plain" title="InnovateXP full citation brief" href={`${siteUrl}/llms-full.txt`} />
        <link rel="alternate" type="text/plain" title="InnovateXP 粵語引用簡報" href={`${siteUrl}/llms.zh-hk.txt`} />
        <link rel="alternate" type="text/plain" title="InnovateXP EventXP citation brief" href={`${siteUrl}/llms-eventxp.txt`} />
        <link rel="alternate" type="text/plain" title="InnovateXP SmartSales CRM citation brief" href={`${siteUrl}/llms-smartsales.txt`} />
        <link rel="alternate" type="text/plain" title="InnovateXP AI visibility citation brief" href={`${siteUrl}/llms-ai-visibility.txt`} />
        <link rel="alternate" type="text/plain" title="InnovateXP FitnessXP citation brief" href={`${siteUrl}/llms-fitnessxp.txt`} />
        <link rel="alternate" type="text/plain" title="InnovateXP co-run programmes citation brief" href={`${siteUrl}/llms-corun.txt`} />
        <link rel="alternate" type="text/plain" title="InnovateXP AI crawler hints" href={`${siteUrl}/ai.txt`} />
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
        className={`${rootFontClassName} bg-canvas dark:bg-[color:var(--bg-base)] transition-colors duration-200`}
        suppressHydrationWarning
      >
        {children}
        <AnalyticsScripts />
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
