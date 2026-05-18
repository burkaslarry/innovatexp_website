import type { AppLocale } from "@/lib/i18n-routing";

export type PillarFaq = { question: string; answer: string };

export type PillarPageBundle = {
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string[];
  sections: { title: string; paragraphs: string[] }[];
  faqs: PillarFaq[];
};

const AI_ERA_EN: PillarPageBundle = {
  metaTitle: "AI-Era Quality Engineering & Cognitive Debt | InnovateXP",
  metaDescription:
    "Ship faster without losing system understanding: executable specifications, disciplined review, and exploratory testing for teams using AI-assisted development in Hong Kong and the GBA.",
  headline: "AI-era quality engineering: speed without cognitive debt",
  intro: [
    "When AI accelerates coding, teams can still lose the plot: the system changes faster than shared understanding. InnovateXP treats that risk as operational, not philosophical — and builds delivery habits that keep software explainable, testable, and safe to change.",
    "This page describes how we structure quality work so AI becomes leverage, not a black box your team quietly stops understanding.",
  ],
  sections: [
    {
      title: "What we mean by \"cognitive debt\"",
      paragraphs: [
        "Cognitive debt is the gap between how fast output appears and how well the team can reason about behaviour, failure modes, and safe changes. Coverage metrics alone cannot close that gap — teams need readable intent, observable behaviour, and reviewable change sets.",
      ],
    },
    {
      title: "What InnovateXP actually delivers",
      paragraphs: [
        "Executable acceptance guidance: clear examples, consistent language, and decisions written so engineers and stakeholders can rehearse scenarios before code hardens assumptions.",
        "Reviewable AI output: prompts, data boundaries, and human checkpoints are documented so drafts do not silently become \"the spec\".",
        "Exploratory testing where it earns signal: targeted sessions that hunt inconsistency and integration risk instead of checklist theatre.",
        "Sprint-ready operational habits: retros that ask what the team genuinely learned — not only what shipped.",
      ],
    },
    {
      title: "BDD / Gherkin — when it helps",
      paragraphs: [
        "We use structured scenarios when they reduce ambiguity for your stack and team. When Gherkin is noise, we choose leaner specifications — the goal is shared intent, not ceremony.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is this only for startups using AI coding tools?",
      answer:
        "No. It is for any team where delivery speed is increasing but predictability, debugging, or onboarding is getting worse.",
    },
    {
      question: "Do you replace our QA team?",
      answer:
        "We strengthen clarity and risk focus. Many clients keep internal QA; we make requirements and feedback loops easier to execute.",
    },
    {
      question: "Can you work with cloud and on-premise stacks?",
      answer:
        "Yes. InnovateXP routinely supports Azure OpenAI, Alibaba Cloud, GCP, AWS, and self-hosted environments when governance requires it.",
    },
    {
      question: "How do we start?",
      answer:
        "Book a short consultation. We usually begin with one critical workflow, define acceptance examples, and align on a practical test and review cadence.",
    },
  ],
};

const AI_ERA_ZH: PillarPageBundle = {
  metaTitle: "AI 時代品質工程・認知負債 | InnovateXP",
  metaDescription:
    "AI 加速寫 code 唔等於團隊真係識個系統。InnovateXP 用可執行規格、可審視嘅變更同探索性測試，幫香港及大灣區團隊「快但要穩」。",
  headline: "AI 時代品質工程：要快，唔好背「認知負債」",
  intro: [
    "當 AI 令產出變快，團隊仍然可以失去共同理解：改得多、但無人讲得清行為、失敗模式同安全變更範圍。InnovateXP 將呢個風險當營運問題處理——用可睇得明嘅規格、可檢視嘅流程，令 AI 係槓桿而唔係黑盒。",
    "呢頁講述我哋點樣制度化品質工作，等「快」唔會變成「跟唔上」同「唔敢改」。",
  ],
  sections: [
    {
      title: "「認知負債」係咩？",
      paragraphs: [
        "產出速度同團隊對系統嘅推理能力之間嘅落差，就係認知負債。單睇 coverage 數字解決唔到——需要讀得明嘅意圖、可觀察嘅行為，同可 review 嘅變更。",
      ],
    },
    {
      title: "InnovateXP 會落地做咩",
      paragraphs: [
        "可執行接受準則：用清晰例子同一致語言，令工程同業務可以喺 code 固化假設前先「排練」情境。",
        "可審視嘅 AI 產出：提示詞、資料邊界、人工檢查點會留底，避免草稿不知不覺變成「唯一真相」。",
        "探索性測試用在刀刃上：針對整合風險同不一致，而唔係純 checkbox。",
        "Sprint 營運習慣：Retro 問「我哋真係學到咩」，唔只係「今週 ship 咗咩」。",
      ],
    },
    {
      title: "BDD / Gherkin — 幾時值得用",
      paragraphs: [
        "當場景格式可以減少歧義，我哋會用；如果變成儀式負擔，就改用更精簡規格——重點係共同意圖，唔係形式。",
      ],
    },
  ],
  faqs: [
    {
      question: "只適合用 AI coding 工具嘅初創？",
      answer:
        "唔係。只要交付加速但預測性、除錯或 onboarding 變差，呢套方法就有用。",
    },
    {
      question: "會取代我哋 QA 團隊嗎？",
      answer:
        "唔會。我哋強化清晰度同風險焦點；好多客戶保留內部 QA，我哋令需求同回饋循環更易執行。",
    },
    {
      question: "Cloud / On-Premise 都得？",
      answer:
        "得。InnovateXP 熟悉 Azure OpenAI、Alibaba Cloud、GCP、AWS，亦可在合規需要時支援自家主機／On-Premise。",
    },
    {
      question: "點開始？",
      answer:
        "先預約短諮詢。通常由一條關鍵 workflow 開始，定義接受例子，再對齊實際嘅測試同 review 節奏。",
    },
  ],
};

const AI_ERA_JA: PillarPageBundle = {
  metaTitle: "AI時代の品質工学と「認知的負債」 | InnovateXP",
  metaDescription:
    "AIで開発が速くなっても、チームの理解が追いつかないリスクがあります。実行可能な受け入れ基準と探索的テストで、香港・GBAのチームに再現性のある品質を。",
  headline: "AI時代の品質工学：スピードと理解を両立する",
  intro: [
    "AIがコード生成を加速すると、仕様・失敗モード・安全な変更範囲についての共通理解が遅れがちです。InnovateXPはこれを運用課題として扱い、ブラックボックス化を防ぐ仕組みを一緒に作ります。",
    "本ページでは、AIをレバレッジに変えるための、具体的な品質プラクティスをまとめています。",
  ],
  sections: [
    {
      title: "「認知的負債」とは",
      paragraphs: [
        "アウトプットの速度と、チームが挙動を説明・予測できる度合いのギャップです。カバレッジだけでは埋まらず、意図の可読性、観測可能性、レビュー可能な変更が重要になります。",
      ],
    },
    {
      title: "InnovateXPが提供するもの",
      paragraphs: [
        "実行可能な受け入れ基準とシナリオの明文化。",
        "プロンプト境界・データ境界・人のチェックポイントを含む、生成物のレビュー可能性。",
        "シグナルの出やすい領域に絞った探索的テスト。",
        "スプリント運営の改善：何を本当に学んだかを振り返る習慣。",
      ],
    },
    {
      title: "BDD / Gherkinについて",
      paragraphs: [
        "曖昧さを減らせる場合に採用します。チームにとってノイズなら、より軽い仕様形式を選びます。",
      ],
    },
  ],
  faqs: [
    {
      question: "AIコーディングツール利用企業だけ向けですか？",
      answer:
        "いいえ。速度は上がったが予測可能性やデバッグが悪化しているチーム全般が対象です。",
    },
    {
      question: "QAチームの代替になりますか？",
      answer:
        "いいえ。明確さとリスクの焦点を高め、既存QAと協働しやすい形にします。",
    },
    {
      question: "クラウドとオンプレの両方に対応しますか？",
      answer:
        "はい。Azure OpenAI、Alibaba Cloud、GCP、AWS、オンプレを含む要件に合わせて支援します。",
    },
    {
      question: "始め方は？",
      answer:
        "短い相談から。重要なワークフロー1つに絞り、受け入れ例とレビュー運用を揃えます。",
    },
  ],
};

const AI_ERA_DE: PillarPageBundle = {
  metaTitle: "Qualität im KI-Zeitalter & kognitive Schulden | InnovateXP",
  metaDescription:
    "Schneller liefern ohne Systemverständnis zu verlieren: ausführbare Spezifikationen, Reviews und exploratives Testen für Teams mit KI-gestützter Entwicklung in Hongkong und der GBA.",
  headline: "Qualität im KI-Zeitalter: Tempo ohne kognitive Schulden",
  intro: [
    "Wenn KI die Codeproduktion beschleunigt, kann das gemeinsame Verständnis für Verhalten und Risiken zurückbleiben. InnovateXP behandelt das als Betriebsthema: lesbare Absichten, beobachtbares Verhalten und reviewbare Änderungen.",
    "Diese Seite beschreibt unsere Praxis, damit KI Hebel wird – kein undurchsichtiger Automatismus.",
  ],
  sections: [
    {
      title: "Was wir mit „kognitiven Schulden“ meinen",
      paragraphs: [
        "Die Lücke zwischen Liefergeschwindigkeit und der Fähigkeit des Teams, Verhalten und sichere Änderungen zu erklären. Abdeckungszahlen allein schließen diese Lücke nicht.",
      ],
    },
    {
      title: "Was InnovateXP liefert",
      paragraphs: [
        "Ausführbare Akzeptanzkriterien und klar beschriebene Szenarien.",
        "Reviewbare KI-Ausgaben inklusive Grenzen, Datenkontext und Human-in-the-loop.",
        "Exploratives Testen dort, wo es Signal liefert.",
        "Sprint-Gewohnheiten mit Fokus auf echtes Lernen, nicht nur Output.",
      ],
    },
    {
      title: "BDD / Gherkin",
      paragraphs: [
        "Wenn es Mehrdeutigkeit reduziert, setzen wir es ein. Wenn es nur Overhead ist, wählen wir schlankere Spezifikationen.",
      ],
    },
  ],
  faqs: [
    {
      question: "Nur für Teams mit KI-Coding-Tools?",
      answer:
        "Nein. Für alle, bei denen Tempo steigt, aber Vorhersagbarkeit oder Onboarding leidet.",
    },
    {
      question: "Ersetzt ihr unser QA?",
      answer:
        "Nein. Wir schärfen Klarheit und Risikofokus und arbeiten mit internen QA-Teams zusammen.",
    },
    {
      question: "Cloud und On-Premise?",
      answer:
        "Ja, u. a. Azure OpenAI, Alibaba Cloud, GCP, AWS und self-hosted Umgebungen.",
    },
    {
      question: "Wie starten wir?",
      answer:
        "Kurzes Beratungsgespräch. Typischerweise ein kritischer Workflow, Akzeptanzbeispiele und ein realistisches Review-/Testcadence.",
    },
  ],
};

export const aiEraQualityByLocale: Record<AppLocale, PillarPageBundle> = {
  en: AI_ERA_EN,
  "zh-hk": AI_ERA_ZH,
  "zh-tw": {
    ...AI_ERA_ZH,
    metaTitle: "AI 時代品質工程・認知負債 | InnovateXP（繁中）",
  },
  ja: AI_ERA_JA,
  de: AI_ERA_DE,
};

export function getAiEraQualityBundle(locale: AppLocale): PillarPageBundle {
  return aiEraQualityByLocale[locale];
}

/* ——— Premium consulting pillar ——— */

const PREM_EN: PillarPageBundle = {
  metaTitle: "Premium AI & CRM Implementation Consulting | InnovateXP Hong Kong",
  metaDescription:
    "Founder-led, done-with-you engagements for Hong Kong SMEs: scoping premium AI workflow and CRM programmes, fixed review cadence, and clear next steps after the first call.",
  headline: "Premium, done-with-you AI and CRM programmes for serious operators",
  intro: [
    "InnovateXP works with founder-led teams that need outcomes, not slide packs. Premium engagements bundle discovery, architecture choices, implementation support, and adoption coaching around one or two workflows that materially move pipeline, follow-up quality, or operational load.",
    "This page clarifies who the offer is for, what “premium” means in practice, and how to qualify for a scoped programme.",
  ],
  sections: [
    {
      title: "Who this is for",
      paragraphs: [
        "Hong Kong / GBA SMEs and professional services teams selling through WhatsApp, events, and partner networks — where follow-up discipline and workflow clarity are revenue-critical.",
        "You want a practitioner who stays accountable for integration risk, not a pass-through agency model.",
      ],
    },
    {
      title: "What a premium engagement includes",
      paragraphs: [
        "A written scope with explicit out-of-scope boundaries, measurable pilot criteria, and a weekly or bi-weekly decision cadence.",
        "Hands-on support for SmartSales CRM, EventXP, or adjacent AI-augmented workflows (draft-first messaging, routing, lightweight automation).",
        "Deployment alignment to your risk posture: major cloud platforms or on-premise where required, with practical operator training.",
      ],
    },
    {
      title: "Commercial shape (transparent, not gimmicky)",
      paragraphs: [
        "Typical premium programmes are quoted as project + enablement phases; many teams anchor a first phase in the tens of thousands of HKD and expand only after validation — your quote depends on integrations, data readiness, and compliance constraints.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is this remote or on-site?",
      answer:
        "Most work is hybrid: remote execution with Hong Kong timezone coverage; on-site workshops are available when needed.",
    },
    {
      question: "Do you only work with InnovateXP products?",
      answer:
        "We are strongest where SmartSales CRM and EventXP fit your process, but we also advise on adjacent stacks when the workflow mapping is clear.",
    },
    {
      question: "How fast can we start?",
      answer:
        "After a fit call, many teams begin a discovery and scoping sprint within 1–2 weeks, subject to calendar and data access.",
    },
    {
      question: "What is the first step?",
      answer:
        "Book a consultation. Bring one live workflow you want faster, safer, or more measurable — we will tell you plainly if we are the right partner.",
    },
  ],
};

const PREM_ZH: PillarPageBundle = {
  metaTitle: "高票價 AI／CRM 落地顧問 | InnovateXP 香港",
  metaDescription:
    "創辦人主導、做得到嘅 Premium 方案：為香港中小企梳理 AI 工作流程同 CRM／活動跟進，固定節奏 review，首 call 後有清晰下一步。",
  headline: "高票價、做得到嘅 AI／CRM 落地顧問",
  intro: [
    "InnovateXP 服務嘅係要結果、唔要堆 slide 嘅團隊。Premium 項目會將發現、架構抉擇、實作支援同落地教練綁喺一兩條真正影響 pipeline、跟進質素或營運負載嘅 workflow 上面。",
    "呢頁說明邊類客戶最合適、「Premium」喺交付上代表咩，以及如何判斷是否值得開案。",
  ],
  sections: [
    {
      title: "適合邊類團隊",
      paragraphs: [
        "香港／大灣區中小企同專業服務團隊，靠 WhatsApp、活動、轉介網絡銷售——跟進紀律同工序清晰度直接影響收入。",
        "你要係能夠對整合風險負責嘅實作者，而唔係層層分包。",
      ],
    },
    {
      title: "Premium 包含咩",
      paragraphs: [
        "白紙黑字嘅範圍同「唔做咩」邊界、可量度試點標準，以及每週／雙週決策節奏。",
        "SmartSales CRM、EventXP 或周邊 AI 輔助流程（草稿優先訊息、分流、輕自動化）嘅手把手支援。",
        "按你嘅風險偏好對齊部署：主流雲平台或需要時 On-Premise，並附實操培訓。",
      ],
    },
    {
      title: "商業形態（清晰、唔玩花招）",
      paragraphs: [
        "多數項目以階段式報價（項目 + 落地教練）；常見係先以數萬港元級別嘅首階段驗證價值，再決定是否擴展——實際金額視整合、資料準備同合規要求而定。",
      ],
    },
  ],
  faqs: [
    {
      question: "遠程定上門？",
      answer:
        "多數混合：遠程交付＋香港時區支援；需要時可安排上門工作坊。",
    },
    {
      question: "一定要用自己產品嗎？",
      answer:
        "我哋喺 SmartSales CRM、EventXP 最熟，但若流程映射清楚，亦可就相鄰技術棧俾建議。",
    },
    {
      question: "幾快可以開波？",
      answer:
        "合適嘅話，好多團隊喺 1–2 星期內可以開始發現／範疇衝刺，視乎日程同資料取用。",
    },
    {
      question: "第一步係？",
      answer:
        "先預約諮詢。帶一條你想更快、更安全、更可量度嘅現場 workflow——我哋會直接話你知啱唔啱拍檔。",
    },
  ],
};

const PREM_JA: PillarPageBundle = {
  metaTitle: "プレミアムAI／CRM実装コンサル | InnovateXP 香港",
  metaDescription:
    "創業者主導の伴走型支援。香港SME向けにAIワークフローとCRM／イベントフォローを設計し、明確なレビュー体制で次の一手を決めます。",
  headline: "プレミアムで「やり切る」AI／CRMプログラム",
  intro: [
    "資料の山ではなく成果が欲しいチーム向けです。Premiumでは、発見、アーキテクチャ判断、実装支援、定着支援を、パイプラインやフォロー品質に効く1〜2ワークフローに集約します。",
  ],
  sections: [
    {
      title: "対象",
      paragraphs: [
        "WhatsApp、イベント、紹介網経由で販売する香港・GBAのSME／専門サービス。統合リスクに責任を持つ実装者が欲しい場合に合います。",
      ],
    },
    {
      title: "含まれるもの",
      paragraphs: [
        "スコープと非スコープの明文化、パイロット指標、定例の意思決定リズム。",
        "SmartSales CRM、EventXP、周辺のAI支援フローの伴走。",
        "クラウド／オンプレに合わせた展開と実務トレーニング。",
      ],
    },
    {
      title: "料金イメージ",
      paragraphs: [
        "フェーズ見積りが一般的です。規模は連携やデータ準備によります。詳細は相談後に提示します。",
      ],
    },
  ],
  faqs: [
    {
      question: "リモートですか？オンサイト対応は？",
      answer:
        "ハイブリッドが基本です。香港タイムゾーンでリモート中心に進め、必要に応じてオンサイトのワークショップを組みます。",
    },
    {
      question: "InnovateXP製品だけですか？",
      answer:
        "SmartSales CRM／EventXPが最も強みですが、ワークフローが明確なら隣接スタックにもアドバイスします。",
    },
    {
      question: "どれくらいで始められますか？",
      answer:
        "適合確認後、多くのチームが1〜2週間以内にディスカバリー／スコーピングに着手します（日程とデータアクセス次第）。",
    },
    {
      question: "最初の一歩は？",
      answer:
        "相談を予約し、改善したい実運用ワークフローを1つ持ってきてください。適合可否は率直にお伝えします。",
    },
  ],
};

const PREM_DE: PillarPageBundle = {
  metaTitle: "Premium AI- und CRM-Beratung | InnovateXP Hongkong",
  metaDescription:
    "Founder-geführte Umsetzung für HK/KZA-KMU: klare Scope-Grenzen, Review-Rhythmus und messbare Pilotkriterien für AI-Workflows und CRM/Event-Follow-up.",
  headline: "Premium „done-with-you“ für AI und CRM",
  intro: [
    "Für Teams, die Ergebnisse statt Folien brauchen. Premium bündelt Discovery, Architekturentscheidungen, Implementierung und Enablement auf einen oder zwei Workflows mit direktem Geschäftseinfluss.",
  ],
  sections: [
    {
      title: "Für wen das gedacht ist",
      paragraphs: [
        "KMUs und Professional-Service-Teams in Hongkong / GBA, die über WhatsApp, Events und Partnernetzwerke verkaufen — dort, wo Follow-up-Disziplin und klare Abläufe Umsatz beeinflussen.",
        "Sie möchten Implementierungsverantwortung statt durchgereichte Agenturketten.",
      ],
    },
    {
      title: "Was eine Premium-Engagement enthält",
      paragraphs: [
        "Schriftlicher Scope mit klaren Grenzen, messbaren Pilotkriterien und wöchentlichem oder zweiwöchentlichem Entscheidungsrhythmus.",
        "Hands-on-Unterstützung für SmartSales CRM, EventXP oder angrenzende KI-gestützte Workflows.",
        "Deployment passend zu Ihrem Risikoprofil: große Cloud-Plattformen oder On-Premise bei Bedarf, inklusive Schulung für Operateure.",
      ],
    },
    {
      title: "Kommerzielles Modell",
      paragraphs: [
        "Typischerweise Projekt- plus Enablement-Phasen; viele Teams starten mit einer fünfstelligen HKD-Phase und skalieren erst nach Validierung — abhängig von Integrationen, Datenreife und Compliance.",
      ],
    },
  ],
  faqs: [
    {
      question: "Remote oder vor Ort?",
      answer:
        "Meist hybrid: Remote-Arbeit mit Abdeckung der Hongkong-Zeitzone; Workshops vor Ort nach Bedarf.",
    },
    {
      question: "Nur InnovateXP-Produkte?",
      answer:
        "Am stärksten dort, wo SmartSales CRM und EventXP passen — bei klarer Prozessabbildung beraten wir auch angrenzende Stacks.",
    },
    {
      question: "Wie schnell geht es los?",
      answer:
        "Nach einem Fit-Call starten viele Teams innerhalb von 1–2 Wochen mit Discovery/Scoping — abhängig von Kalender und Datenzugang.",
    },
    {
      question: "Erster Schritt?",
      answer:
        "Beratung buchen. Bringen Sie einen live Workflow mit, den Sie schneller, sicherer oder messbarer machen wollen — wir sagen klar, ob wir passen.",
    },
  ],
};

export const premiumConsultingByLocale: Record<AppLocale, PillarPageBundle> = {
  en: PREM_EN,
  "zh-hk": PREM_ZH,
  "zh-tw": { ...PREM_ZH, metaTitle: "高票價 AI／CRM 落地顧問 | InnovateXP（繁中）" },
  ja: PREM_JA,
  de: PREM_DE,
};

export function getPremiumConsultingBundle(locale: AppLocale): PillarPageBundle {
  return premiumConsultingByLocale[locale];
}
