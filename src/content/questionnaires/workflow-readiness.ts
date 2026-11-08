import type { AppLocale } from "@/lib/i18n-routing";

export const READINESS_QUESTIONS = ["workflow", "data", "owner", "acceptance"] as const;
export const READINESS_CHOICES = ["ready", "partial", "unsure"] as const;
export type ReadinessQuestion = (typeof READINESS_QUESTIONS)[number];
export type ReadinessChoice = (typeof READINESS_CHOICES)[number];
export type ReadinessAnswers = Partial<Record<ReadinessQuestion, ReadinessChoice>>;
export type ReadinessRecommendation = "clarify-workflow" | "prepare-data" | "scope-pilot";

export function missingReadinessAnswers(answers: ReadinessAnswers): ReadinessQuestion[] {
  return READINESS_QUESTIONS.filter((id) => !READINESS_CHOICES.includes(answers[id] as ReadinessChoice));
}

/** Triage rules, not a score: establish scope, ownership and acceptance before data or a pilot. */
export function recommendWorkflowReadiness(answers: ReadinessAnswers): ReadinessRecommendation | null {
  if (missingReadinessAnswers(answers).length) return null;
  if ([answers.workflow, answers.owner, answers.acceptance].some((answer) => answer !== "ready")) {
    return "clarify-workflow";
  }
  if (answers.data !== "ready") return "prepare-data";
  return "scope-pilot";
}

export type ReadinessState = {
  answers: ReadinessAnswers;
  missing: ReadinessQuestion[];
  recommendation: ReadinessRecommendation | null;
};
export const INITIAL_READINESS_STATE: ReadinessState = { answers: {}, missing: [], recommendation: null };
export type ReadinessAction =
  | { type: "answer"; question: ReadinessQuestion; choice: ReadinessChoice }
  | { type: "submit" }
  | { type: "reset" };

export function workflowReadinessReducer(state: ReadinessState, action: ReadinessAction): ReadinessState {
  switch (action.type) {
    case "answer":
      return {
        answers: { ...state.answers, [action.question]: action.choice },
        missing: state.missing.filter((id) => id !== action.question),
        recommendation: null,
      };
    case "submit":
      return {
        ...state,
        missing: missingReadinessAnswers(state.answers),
        recommendation: recommendWorkflowReadiness(state.answers),
      };
    case "reset":
      return { answers: {}, missing: [], recommendation: null };
  }
}

type ReadinessCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  privacy: string;
  boundary: string;
  instructions: string;
  unsure: string;
  submit: string;
  reset: string;
  incomplete: string;
  resultLabel: string;
  evidence: string;
  nextSteps: string;
  book: string;
  services: string;
  noScript: string;
  questions: Record<ReadinessQuestion, { label: string; hint: string; ready: string; partial: string }>;
  recommendations: Record<ReadinessRecommendation, { title: string; why: string; steps: string[] }>;
};

export const WORKFLOW_READINESS_COPY: Record<AppLocale, ReadinessCopy> = {
  en: {
    eyebrow: "Free · local-only self-check",
    title: "What should you prepare before changing a workflow?",
    intro: "Think of one real workflow: following up an enquiry, issuing a quote, matching bookings to payments, or managing classes and renewals. Check what you already know before choosing a tool.",
    privacy: "No name, contact details or files needed. This self-check keeps answers only in this page’s memory: nothing is submitted or saved to browser storage. Reset or reload to clear them. Do not share customer lists or sensitive data.",
    boundary: "This is NOT the paid HK$3,880 AI Readiness Snapshot, and NOT a validated assessment or certification. Suggestions use only your answers; they do not verify evidence or promise results. The separate consultation intake below or on the booking page has its own submission and consent process.",
    instructions: "Answer all four questions. “Not sure” is a valid answer. Changing an answer clears the previous suggestion; select “Show next step” again.",
    unsure: "Not sure",
    submit: "Show next step",
    reset: "Reset answers",
    incomplete: "Choose an answer for each question below, including “Not sure” if needed. Still to answer:",
    resultLabel: "Suggested next step · not an assessment",
    evidence: "Your answers — self-reported, not verified evidence",
    nextSteps: "What to prepare next",
    book: "Discuss this in a workflow diagnosis",
    services: "Explore AI consulting",
    noScript: "Enable JavaScript for the local suggestion, or use the consulting link. No answers are submitted by this self-check.",
    questions: {
      workflow: {
        label: "Can you describe one workflow and where it breaks down?",
        hint: "Think of its trigger, handoffs and finish — for example, an enquiry that waits two days for a reply.",
        ready: "Yes: the steps and one concrete problem are clear",
        partial: "Not yet: several problems are mixed together",
      },
      data: {
        label: "Could you prepare usable examples with permission?",
        hint: "Consider WhatsApp, spreadsheets or your existing system. Check access and remove personal or confidential details before any later review; upload nothing here.",
        ready: "Yes: examples are available and permitted for review",
        partial: "Not yet: examples are scattered, incomplete or access is unresolved",
      },
      owner: {
        label: "Is someone responsible for testing and reviewing this workflow?",
        hint: "They need time to explain handoffs, check exceptions and decide what the team can adopt.",
        ready: "Yes: an owner has agreed to take part",
        partial: "Not yet: responsibility or availability is unclear",
      },
      acceptance: {
        label: "Have you agreed how to judge a useful change?",
        hint: "For example, compare reply times or missed handoffs with today’s baseline, with a person checking errors and deciding when to stop.",
        ready: "Yes: a baseline, acceptance checks and reviewer are agreed",
        partial: "Not yet: we only have a broad goal such as “save time”",
      },
    },
    recommendations: {
      "clarify-workflow": {
        title: "Clarify the workflow first",
        why: "At least one answer leaves the workflow, owner or acceptance checks unresolved. Clarify those before choosing tools; any data gaps still need attention afterwards.",
        steps: ["Map one enquiry, quote, booking or class workflow from start to finish and mark the missed handoff.", "Agree who will own the trial, review exceptions and record today’s baseline and acceptance checks.", "Then check sample access and permissions. A clearer process may be enough without buying a system."],
      },
      "prepare-data": {
        title: "Prepare the data before a pilot",
        why: "You report a clear workflow, owner and acceptance checks, but usable examples or permission are not yet clear. That is a preparation task, not proof that automation will help.",
        steps: ["Locate representative examples in the existing sheets, messages or system, including a failed handoff.", "Confirm access, permitted use and missing fields with the data owner; prepare redacted examples for a later review, not this page.", "Use those examples to check the baseline and acceptance criteria before deciding whether a small pilot is worthwhile."],
      },
      "scope-pilot": {
        title: "Scope a small pilot — then verify the evidence",
        why: "All four answers indicate that the basics are in place. These are self-reported signals only, not verified readiness or a recommendation to buy software.",
        steps: ["Review one workflow and the permitted examples with its owner; confirm the baseline rather than assuming it.", "Bound a small trial: one handoff, agreed acceptance checks, human review and a way to stop or return to the current process.", "Compare the trial with the baseline before deciding to continue, revise the process or buy nothing."],
      },
    },
  },
  "zh-hk": {
    eyebrow: "免費 · 只喺本頁運作嘅自查",
    title: "改流程之前，你要先準備啲咩？",
    intro: "諗住一條真實流程：查詢跟進、出報價、預約對收款，或者課堂同續約。先睇清自己掌握咗啲咩，再揀工具。",
    privacy: "唔使填姓名、聯絡資料或上載檔案。自查答案只留喺本頁記憶體，唔會提交或存入瀏覽器儲存空間；重設或重新載入就會清除。請勿分享客戶名單或敏感資料。",
    boundary: "呢個唔係收費 HK$3,880 嘅 AI Readiness Snapshot，亦唔係經驗證嘅評估或認證。建議只按你嘅答案產生，冇核實證據，亦唔保證成效。下方或預約頁嘅諮詢問卷係獨立入口，有自己嘅提交及同意程序。",
    instructions: "四題都要答；可以揀「未確定」。改答案會清除舊建議，之後請再撳「睇下一步」。",
    unsure: "未確定",
    submit: "睇下一步",
    reset: "重設答案",
    incomplete: "請答埋以下題目；未清楚可以揀「未確定」。未答題目：",
    resultLabel: "建議下一步 · 並非評估",
    evidence: "你嘅答案 — 自行填報，未經核實",
    nextSteps: "下一步要準備咩",
    book: "預約業務聽診，一齊釐清",
    services: "了解 AI 顧問服務",
    noScript: "請啟用 JavaScript 睇本頁建議，或者開啟顧問服務連結。呢個自查唔會提交任何答案。",
    questions: {
      workflow: { label: "你講唔講得清一條流程同邊度卡住？", hint: "諗吓由咩觸發、點交接、點完成，例如客問完兩日都冇人回覆。", ready: "講得清：有步驟同一個具體問題", partial: "未得：幾個問題仲混埋一齊" },
      data: { label: "你可唔可以準備有權使用嘅實際例子？", hint: "諗吓 WhatsApp、試算表或現有系統。日後檢視前先確認權限，刪走個人或機密資料；呢度唔使上載。", ready: "可以：有例子，亦獲准用作檢視", partial: "未得：例子分散、唔完整，或權限未釐清" },
      owner: { label: "有冇人負責試行同檢視呢條流程？", hint: "佢要有時間解釋交接、檢查例外，同決定團隊用唔用得順。", ready: "有：負責人已答應參與", partial: "未有：責任或可投入時間未清楚" },
      acceptance: { label: "有冇講好點判斷改動有冇用？", hint: "例如同現時基準比較回覆時間或漏交接情況，並有人檢查錯誤同決定幾時停止。", ready: "有：已同意基準、驗收條件同檢查人", partial: "未有：只係想「慳時間」等大方向" },
    },
    recommendations: {
      "clarify-workflow": { title: "先釐清流程", why: "至少一個答案顯示流程、負責人或驗收條件未清楚。揀工具之前先講清楚；資料缺口之後亦要處理。", steps: ["畫出一條查詢、報價、預約或課堂流程，由開始到完成，標出漏交接嘅位置。", "確認邊個負責試行、檢查例外，並記低現況基準同驗收條件。", "再檢查例子同使用權限。可能執順流程已經夠，唔使買系統。"] },
      "prepare-data": { title: "試行之前，先準備資料", why: "你表示流程、負責人同驗收條件已清楚，但可用例子或權限仍未確定。呢個係準備工作，唔代表自動化一定有用。", steps: ["喺現有試算表、訊息或系統搵有代表性嘅例子，包括一次交接出錯。", "同資料負責人確認存取權、用途同缺漏欄位；為日後檢視準備已遮蔽敏感資料嘅例子，唔好放喺呢頁。", "用例子檢查基準同驗收條件，再決定值唔值得做小型試行。"] },
      "scope-pilot": { title: "界定小型試行，再核實證據", why: "四個答案都表示基本準備已到位，但只係自行填報，唔等於已驗證準備程度，亦唔係建議買系統。", steps: ["同負責人檢視一條流程同獲准使用嘅例子，核實現況基準，唔好靠估。", "限制試行範圍：一個交接點、已同意嘅驗收條件、人手覆核，同停止或返回原流程嘅方法。", "比較試行同現況，再決定繼續、改流程，或者唔買任何嘢。"] },
    },
  },
  "zh-tw": {
    eyebrow: "免費 · 僅在本頁運作的自我檢查",
    title: "改善流程前，需要先準備什麼？",
    intro: "請想一條真實流程：詢問追蹤、製作報價、預約與收款核對，或課程與續約管理。先確認掌握的資訊，再選工具。",
    privacy: "不需要姓名、聯絡資料或檔案。答案僅留在本頁記憶體，不會提交或存入瀏覽器儲存空間；重設或重新載入即可清除。請勿分享客戶名單或敏感資料。",
    boundary: "這不是收費 HK$3,880 的 AI Readiness Snapshot，也不是經驗證的評估或認證。建議只依您的答案產生，未核實證據，也不保證成效。下方或預約頁的諮詢問卷為獨立入口，有各自的提交及同意程序。",
    instructions: "請回答全部四題；可以選「尚不確定」。修改答案會清除舊建議，請再次選擇「查看下一步」。",
    unsure: "尚不確定",
    submit: "查看下一步",
    reset: "重設答案",
    incomplete: "請回答以下題目；不清楚時可選「尚不確定」。尚未回答：",
    resultLabel: "建議下一步 · 並非評估",
    evidence: "您的答案 — 自行填報，未經核實",
    nextSteps: "接下來要準備什麼",
    book: "預約業務諮詢，一起釐清",
    services: "了解 AI 顧問服務",
    noScript: "請啟用 JavaScript 查看本頁建議，或開啟顧問服務連結。本自我檢查不會提交任何答案。",
    questions: {
      workflow: { label: "您能說明一條流程，以及卡在哪裡嗎？", hint: "想想觸發條件、交接與完成步驟，例如客人詢問兩天後仍無人回覆。", ready: "可以：步驟與一個具體問題都清楚", partial: "還不能：多個問題仍混在一起" },
      data: { label: "您能準備有權使用的實際範例嗎？", hint: "考慮 WhatsApp、試算表或現有系統。日後檢視前先確認權限，移除個人或機密資料；此處不需上傳。", ready: "可以：已有範例，且獲准用於檢視", partial: "還不能：範例分散、不完整，或權限未明" },
      owner: { label: "有人負責試行與檢視這條流程嗎？", hint: "需要有時間說明交接、檢查例外，並決定團隊是否能採用。", ready: "有：負責人已同意參與", partial: "還沒有：責任或可投入時間尚未明確" },
      acceptance: { label: "已約定如何判斷改動是否有用嗎？", hint: "例如與現況基準比較回覆時間或交接遺漏，並由人員檢查錯誤、決定何時停止。", ready: "有：已約定基準、驗收條件與檢查人員", partial: "還沒有：只有「節省時間」等概略目標" },
    },
    recommendations: {
      "clarify-workflow": { title: "先釐清流程", why: "至少一個答案顯示流程、負責人或驗收條件尚未明確。選工具前先釐清；資料缺口之後也需要處理。", steps: ["畫出一條詢問、報價、預約或課程流程，從開始到完成，標記交接遺漏的位置。", "確認試行與例外檢查的負責人，記錄現況基準及驗收條件。", "接著檢查範例與使用權限。理順流程可能已經足夠，不必購買系統。"] },
      "prepare-data": { title: "試行前，先準備資料", why: "您表示流程、負責人與驗收條件已明確，但可用範例或權限尚不清楚。這是準備工作，不代表自動化必然有幫助。", steps: ["從現有試算表、訊息或系統找出具代表性的範例，包括一次交接失誤。", "與資料負責人確認存取權、用途及缺漏欄位；為日後檢視準備已去識別化的範例，不要放在本頁。", "以範例檢查基準與驗收條件，再決定是否值得進行小型試行。"] },
      "scope-pilot": { title: "界定小型試行，再核實證據", why: "四個答案都表示基本準備已到位，但僅為自行填報，不是已驗證的準備程度，也不是購買系統的建議。", steps: ["與負責人檢視一條流程和獲准使用的範例，核實現況基準，而非憑空假設。", "限定試行範圍：一個交接點、約定的驗收條件、人工覆核，以及停止或返回原流程的方法。", "比較試行與現況，再決定繼續、調整流程，或不購買任何工具。"] },
    },
  },
  ja: {
    eyebrow: "無料 · このページ内だけのセルフチェック",
    title: "業務を変える前に、何を準備しますか？",
    intro: "問い合わせ対応、見積作成、予約と入金の照合、授業や更新管理など、実際の業務を一つ思い浮かべてください。ツールを選ぶ前に、把握できていることを確認します。",
    privacy: "氏名、連絡先、ファイルは不要です。回答はこのページのメモリ内だけに保持され、送信もブラウザへの保存も行いません。リセットや再読み込みで消去されます。顧客リストや機密情報を共有しないでください。",
    boundary: "これは有料の HK$3,880 AI Readiness Snapshot ではなく、検証済みの評価や認証でもありません。提案は回答のみに基づき、証拠の確認や成果の保証は行いません。下部または予約ページの相談フォームは別のもので、独自の送信・同意手続きがあります。",
    instructions: "全4問に回答してください。「まだ不明」も選べます。回答を変えると以前の提案が消えるため、再度「次の一歩を見る」を選んでください。",
    unsure: "まだ不明",
    submit: "次の一歩を見る",
    reset: "回答をリセット",
    incomplete: "次の未回答の質問に回答してください。わからない場合は「まだ不明」を選べます：",
    resultLabel: "次の一歩の提案 · 評価ではありません",
    evidence: "あなたの回答 — 自己申告であり、検証済みの証拠ではありません",
    nextSteps: "次に準備すること",
    book: "業務相談で一緒に整理する",
    services: "AIコンサルティングを見る",
    noScript: "ページ内の提案を見るには JavaScript を有効にするか、相談サービスのリンクをご利用ください。このセルフチェックは回答を送信しません。",
    questions: {
      workflow: { label: "一つの業務の流れと、問題の箇所を説明できますか？", hint: "開始のきっかけ、引き継ぎ、完了を考えてください。例：問い合わせから2日間返信がない。", ready: "はい：手順と具体的な問題が一つ明確です", partial: "まだ：複数の問題が混在しています" },
      data: { label: "使用許可のある実例を準備できますか？", hint: "WhatsApp、表計算、既存システムを考えてください。後日確認する前に権限を確かめ、個人情報・機密情報を除いてください。ここにはアップロードしません。", ready: "はい：確認用の実例があり、使用も許可されています", partial: "まだ：実例が分散・不足しているか、権限が不明です" },
      owner: { label: "試行と確認を担当する人は決まっていますか？", hint: "引き継ぎを説明し、例外を確認し、チームが運用できるか判断する時間が必要です。", ready: "はい：担当者が参加に同意しています", partial: "まだ：責任や確保できる時間が不明です" },
      acceptance: { label: "改善をどう判定するか合意していますか？", hint: "例：返信時間や引き継ぎ漏れを現状と比較し、人が誤りを確認して中止を判断する。", ready: "はい：現状の基準、受入条件、確認担当者に合意しています", partial: "まだ：「時間を節約する」など大まかな目標だけです" },
    },
    recommendations: {
      "clarify-workflow": { title: "まず業務の流れを整理する", why: "業務の流れ、担当者、受入条件の少なくとも一つが未確定です。ツールの選定より先に整理しましょう。その後、データの不足にも対応が必要です。", steps: ["問い合わせ、見積、予約、授業のうち一つを開始から完了まで図にし、引き継ぎ漏れを示します。", "試行と例外確認の担当者を決め、現状の基準と受入条件を記録します。", "次に実例と使用権限を確認します。システムを買わず、手順の整理だけで十分な場合もあります。"] },
      "prepare-data": { title: "試行の前にデータを準備する", why: "業務、担当者、受入条件は明確との回答ですが、使える実例や権限は未確定です。これは準備作業であり、自動化が有効である証拠ではありません。", steps: ["既存の表、メッセージ、システムから、引き継ぎ失敗も含む代表的な実例を探します。", "データ管理者とアクセス権、利用目的、不足項目を確認します。機密部分を除いた実例は後日の確認用に準備し、このページには載せません。", "実例で現状の基準と受入条件を確認してから、小規模な試行に価値があるか判断します。"] },
      "scope-pilot": { title: "小規模な試行を定め、証拠を確認する", why: "4つの回答では基本的な準備が整っています。ただし自己申告のみで、準備状況の検証やソフトウェア購入の推奨ではありません。", steps: ["担当者と一つの業務と使用許可のある実例を確認し、現状の基準を推測ではなく確かめます。", "引き継ぎを一つに絞り、受入条件、人による確認、中止や元の手順に戻す方法を定めます。", "試行と現状を比較してから、継続、手順の修正、何も買わない選択を判断します。"] },
    },
  },
  de: {
    eyebrow: "Kostenlos · Selbstcheck nur auf dieser Seite",
    title: "Was sollten Sie vor einer Prozessänderung vorbereiten?",
    intro: "Denken Sie an einen konkreten Ablauf: Anfragen nachfassen, Angebote erstellen, Buchungen mit Zahlungen abgleichen oder Kurse und Verlängerungen verwalten. Prüfen Sie zuerst, was bereits klar ist — vor der Werkzeugwahl.",
    privacy: "Keine Namen, Kontaktdaten oder Dateien nötig. Antworten bleiben nur im Arbeitsspeicher dieser Seite: Sie werden weder gesendet noch im Browser gespeichert. Zurücksetzen oder Neuladen löscht sie. Teilen Sie keine Kundenlisten oder sensiblen Daten.",
    boundary: "Dies ist NICHT der kostenpflichtige AI Readiness Snapshot für HK$3,880 und KEINE validierte Bewertung oder Zertifizierung. Vorschläge beruhen nur auf Ihren Antworten; Belege werden nicht geprüft und Ergebnisse nicht garantiert. Das separate Beratungsformular unten oder auf der Buchungsseite hat einen eigenen Versand- und Einwilligungsprozess.",
    instructions: "Beantworten Sie alle vier Fragen. „Noch unklar“ ist eine gültige Antwort. Eine Änderung entfernt den bisherigen Vorschlag; wählen Sie danach erneut „Nächsten Schritt anzeigen“.",
    unsure: "Noch unklar",
    submit: "Nächsten Schritt anzeigen",
    reset: "Antworten zurücksetzen",
    incomplete: "Beantworten Sie die folgenden Fragen; bei Bedarf mit „Noch unklar“. Noch offen:",
    resultLabel: "Vorgeschlagener nächster Schritt · keine Bewertung",
    evidence: "Ihre Antworten — Selbstauskunft, keine geprüften Belege",
    nextSteps: "Was Sie als Nächstes vorbereiten können",
    book: "Im Prozessgespräch gemeinsam klären",
    services: "KI-Beratung ansehen",
    noScript: "Aktivieren Sie JavaScript für den lokalen Vorschlag oder öffnen Sie den Beratungslink. Dieser Selbstcheck sendet keine Antworten.",
    questions: {
      workflow: { label: "Können Sie einen Ablauf und seine Problemstelle beschreiben?", hint: "Denken Sie an Auslöser, Übergaben und Abschluss — etwa eine Anfrage, die zwei Tage unbeantwortet bleibt.", ready: "Ja: Die Schritte und ein konkretes Problem sind klar", partial: "Noch nicht: Mehrere Probleme sind vermischt" },
      data: { label: "Könnten Sie nutzbare Beispiele mit entsprechender Erlaubnis vorbereiten?", hint: "Denken Sie an WhatsApp, Tabellen oder Ihr bestehendes System. Klären Sie Zugriffsrechte und entfernen Sie persönliche oder vertrauliche Angaben vor einer späteren Prüfung; hier nichts hochladen.", ready: "Ja: Beispiele sind vorhanden und zur Prüfung freigegeben", partial: "Noch nicht: Beispiele sind verstreut, unvollständig oder der Zugriff ist ungeklärt" },
      owner: { label: "Ist jemand für den Test und die Prüfung des Ablaufs verantwortlich?", hint: "Diese Person braucht Zeit, Übergaben zu erklären, Ausnahmen zu prüfen und die Nutzbarkeit im Team zu beurteilen.", ready: "Ja: Eine verantwortliche Person hat ihre Mitarbeit zugesagt", partial: "Noch nicht: Verantwortung oder verfügbare Zeit sind unklar" },
      acceptance: { label: "Ist vereinbart, woran Sie eine nützliche Änderung erkennen?", hint: "Zum Beispiel Antwortzeiten oder verpasste Übergaben mit dem Ist-Zustand vergleichen; ein Mensch prüft Fehler und entscheidet über einen Abbruch.", ready: "Ja: Ausgangsbasis, Abnahmekriterien und prüfende Person sind vereinbart", partial: "Noch nicht: Es gibt nur ein grobes Ziel wie „Zeit sparen“" },
    },
    recommendations: {
      "clarify-workflow": { title: "Zuerst den Ablauf klären", why: "Mindestens eine Antwort lässt Ablauf, Verantwortung oder Abnahmekriterien offen. Klären Sie das vor der Werkzeugwahl; anschließend bleiben mögliche Datenlücken zu bearbeiten.", steps: ["Zeichnen Sie einen Anfrage-, Angebots-, Buchungs- oder Kursablauf von Anfang bis Ende auf und markieren Sie die verpasste Übergabe.", "Vereinbaren Sie, wer den Test und die Prüfung von Ausnahmen übernimmt, und halten Sie Ausgangsbasis und Abnahmekriterien fest.", "Prüfen Sie dann Beispiele und Nutzungsrechte. Ein klarerer Prozess kann genügen, ohne ein System zu kaufen."] },
      "prepare-data": { title: "Vor einem Pilotversuch die Daten vorbereiten", why: "Laut Ihren Antworten sind Ablauf, Verantwortung und Abnahmekriterien klar, nutzbare Beispiele oder Rechte aber noch nicht. Das ist eine Vorbereitungsaufgabe, kein Nachweis für den Nutzen einer Automatisierung.", steps: ["Suchen Sie repräsentative Beispiele in vorhandenen Tabellen, Nachrichten oder Systemen, auch eine fehlgeschlagene Übergabe.", "Klären Sie Zugriff, erlaubte Nutzung und fehlende Felder mit der datenverantwortlichen Person. Bereiten Sie bereinigte Beispiele für eine spätere Prüfung vor, nicht für diese Seite.", "Prüfen Sie damit Ausgangsbasis und Abnahmekriterien, bevor Sie über einen kleinen Pilotversuch entscheiden."] },
      "scope-pilot": { title: "Einen kleinen Pilotversuch abgrenzen — dann Belege prüfen", why: "Alle vier Antworten deuten auf vorhandene Grundlagen hin. Das sind nur Selbstauskünfte, keine validierte Einsatzbereitschaft und keine Kaufempfehlung.", steps: ["Prüfen Sie einen Ablauf und freigegebene Beispiele mit der verantwortlichen Person; bestätigen Sie die Ausgangsbasis, statt sie anzunehmen.", "Begrenzen Sie den Versuch auf eine Übergabe, vereinbarte Abnahmekriterien, menschliche Kontrolle und einen Weg zum Abbruch oder bisherigen Prozess.", "Vergleichen Sie den Versuch mit der Ausgangsbasis, bevor Sie fortfahren, den Ablauf ändern oder nichts kaufen."] },
    },
  },
};
