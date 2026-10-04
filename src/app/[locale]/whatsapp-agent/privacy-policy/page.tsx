import { WhatsappAgentLegalPage, whatsappAgentMetadata } from "@/features/legal/WhatsappAgentLegalRoute";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => whatsappAgentMetadata(locale, "privacy"));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <WhatsappAgentLegalPage locale={locale} doc="privacy" />;
}
