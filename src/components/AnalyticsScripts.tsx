import Script from "next/script";

/**
 * Loads GA4 and/or Plausible when env vars are set.
 * - NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXX
 * - NEXT_PUBLIC_PLAUSIBLE_DOMAIN=innovatexp.co
 */
export function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();

  return (
    <>
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: true });
            `}
          </Script>
        </>
      ) : null}
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.tagged-events.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
