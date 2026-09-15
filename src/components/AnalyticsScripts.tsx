import Script from "next/script";

/** InnovateXP website GA4 Measurement ID (from Google tag). */
export const GA4_MEASUREMENT_ID = "G-35CKSF1L7P";

/**
 * Loads GA4 (and optional Plausible).
 * GA4 ID defaults to GA4_MEASUREMENT_ID; override with NEXT_PUBLIC_GA4_MEASUREMENT_ID if needed.
 * Plausible: set NEXT_PUBLIC_PLAUSIBLE_DOMAIN=innovatexp.co
 */
export function AnalyticsScripts() {
  const gaId = (process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || GA4_MEASUREMENT_ID).trim();
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
