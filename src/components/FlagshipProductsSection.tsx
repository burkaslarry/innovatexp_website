import { CheckCircle2, Receipt, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getHomepageContent } from "@/content/homepage";
import { formatHkd, PRICING, type PricingLocale } from "@/content/pricing";
import type { AppLocale } from "@/lib/i18n-routing";

function toPricingLocale(locale: AppLocale): PricingLocale {
  if (locale === "zh-hk" || locale === "zh-tw" || locale === "ja" || locale === "de") return locale;
  return "en";
}

function ProductVideo({
  title,
  subtitle,
  sources,
  caption,
}: {
  title: string;
  subtitle: string;
  sources: readonly { src: string; type: string }[];
  caption: string;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--card-radius)] border border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] shadow-card">
      <div className="border-b border-[color:var(--border-light)] px-4 py-3">
        <p className="text-sm font-semibold text-[color:var(--heading-foreground)]">{title}</p>
        <p className="text-xs text-[color:var(--text-secondary)]">{subtitle}</p>
      </div>
      <video className="aspect-video w-full bg-black" controls playsInline preload="metadata" aria-label={caption}>
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      <p className="px-4 py-3 text-center text-xs text-[color:var(--text-secondary)]">{caption}</p>
    </div>
  );
}

export function FlagshipProductsSection({
  locale,
  bookingHref,
}: {
  locale: AppLocale;
  bookingHref: string;
}) {
  const c = getHomepageContent(locale);
  const fp = c.flagshipProducts;
  const pl = toPricingLocale(locale);
  const monthSuffix = pl.startsWith("zh") ? "/ 月" : "/ mo";
  const accountPrice = `${formatHkd(PRICING.tools.accountXp.flagshipMonthly, pl)}${monthSuffix}`;
  const fitnessPrice = `${formatHkd(PRICING.tools.fitnessXp.flagshipMonthly, pl)}${monthSuffix}`;

  const products = [
    {
      id: "accountxp",
      icon: Receipt,
      accent: "text-[color:var(--secondary-color)]",
      product: fp.account,
      price: accountPrice,
      videos: [
        {
          title: "AccountXP",
          subtitle: fp.account.videoSubtitles[0],
          sources: [{ src: "/videos/accountxp.mp4", type: "video/mp4" }],
          caption: fp.account.videoCaptions[0],
        },
      ],
    },
    {
      id: "fitnessxp",
      icon: Dumbbell,
      accent: "text-[color:var(--pain-accent)]",
      product: fp.fitness,
      price: fitnessPrice,
      videos: [
        {
          title: "FitnessXP",
          subtitle: fp.fitness.videoSubtitles[0],
          sources: [{ src: "/videos/fitnessxp_01.mp4", type: "video/mp4" }],
          caption: fp.fitness.videoCaptions[0],
        },
        {
          title: "FitnessXP",
          subtitle: fp.fitness.videoSubtitles[1],
          sources: [{ src: "/videos/fitnessxp_02.mp4", type: "video/mp4" }],
          caption: fp.fitness.videoCaptions[1],
        },
      ],
    },
  ] as const;

  return (
    <section id="flagship-products" className="mb-16 scroll-mt-[var(--header-offset)]">
      <SectionHeader
        title={fp.title}
        subtitle={fp.intro}
        eyebrow={
          <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
            {fp.eyebrow}
          </p>
        }
      />

      <div className="grid gap-10">
        {products.map(({ id, icon: Icon, accent, product, price, videos }) => (
          <article key={id} className="ixp-card overflow-hidden">
            <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.95fr)] lg:items-start">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Icon className={`h-7 w-7 ${accent}`} aria-hidden />
                  <p className="rounded-full bg-[color:var(--bg-secondary)] px-3 py-1 text-xs font-semibold tracking-[0.06em] text-[color:var(--text-secondary)]">
                    {product.audience}
                  </p>
                </div>
                <h3 className="mt-4 text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
                  {product.name}
                </h3>
                <p className="mt-2 text-2xl font-extrabold text-[color:var(--brand-primary)]">{price}</p>

                <div className="mt-6 grid gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
                      {fp.flowLabels.intro}
                    </p>
                    <p className="mt-2 text-base leading-8 text-[color:var(--text-primary)]">{product.intro}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
                      {fp.flowLabels.benefits}
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {product.benefits.map((item) => (
                        <li key={item} className="flex gap-3 text-base leading-8 text-[color:var(--text-secondary)]">
                          <CheckCircle2 className="mt-1.5 h-5 w-5 shrink-0 text-[color:var(--secondary-color)]" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
                      {fp.flowLabels.features}
                    </p>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                      {product.features.map((item) => (
                        <li
                          key={item}
                          className="rounded-[var(--radius-md)] border border-[color:var(--border-light)] bg-[color:var(--bg-elevated)] px-4 py-3 text-sm leading-relaxed text-[color:var(--text-primary)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <Button href={bookingHref} variant="primary">
                    {product.cta}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {videos.map((video) => (
                  <ProductVideo key={`${id}-${video.caption}`} {...video} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
