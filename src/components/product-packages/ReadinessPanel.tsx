import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import type { ReadinessCopy } from "@/content/homepage";

/*
 * Snapshot is a downsell, not a fifth revenue line.
 * Education is quoted beside it so buyers do not treat four weekly
 * sessions as included in the HK$3,000 Snapshot.
 */
export function ReadinessPanel({ copy }: { copy: ReadinessCopy }) {
  return (
    <section className="ixp-card p-5 md:p-7">
      <SnapshotBlock copy={copy} />
      <EducationTrackBlock copy={copy} />
    </section>
  );
}

function SnapshotBlock({ copy }: { copy: ReadinessCopy }) {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
        {copy.eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-[color:var(--heading-foreground)]">{copy.title}</h2>
      <p className="mt-1 text-2xl font-extrabold text-[color:var(--brand-primary)]">{copy.price}</p>
      <p className="mt-3 leading-7 text-[color:var(--text-secondary)]">{copy.intro}</p>
      <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--text-secondary)]">
        {copy.points.map((point) => (
          <li key={point}>· {point}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm font-semibold leading-7 text-[color:var(--heading-foreground)]">
        {copy.excludes}
      </p>
      <p className="mt-3 rounded-xl bg-[color:var(--bg-secondary)] p-4 text-sm font-bold leading-7 text-[color:var(--brand-primary)]">
        {copy.upgrade}
      </p>
      <div className="mt-4">
        <AddToInquiryButton itemId="aiReadinessAssessment" size="small" />
      </div>
    </>
  );
}

function EducationTrackBlock({ copy }: { copy: ReadinessCopy }) {
  return (
    <div className="mt-5 border-t border-[color:var(--border-light)] pt-5">
      <h3 className="font-bold text-[color:var(--heading-foreground)]">{copy.educationTitle}</h3>
      <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{copy.educationIntro}</p>
      <ul className="mt-3 mb-4 space-y-2 text-sm leading-7 text-[color:var(--text-secondary)]">
        {copy.educationPoints.map((point) => (
          <li key={point}>· {point}</li>
        ))}
      </ul>
      <AddToInquiryButton itemId="educationTrack" size="small" />
    </div>
  );
}
