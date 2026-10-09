# 02 — Creative Direction

Three directions. None is selected. Pick one before any visual system, mockup, or build.

Shared rules for all three:

- Primary action: 預約 30 分鐘業務聽診. Secondary: WhatsApp. One primary action per screen.
- Hero or first scroll must show both lines: 「唔使買系統我會直講。」 and 「一個人放假就停嘅流程，唔叫流程，叫人質。」
- Proof on the page may only be C1 and C3. C2 (HK$50,000／月) and C4 (sector list as delivered work) stay off the page.
- Do not write 「已核實」. C1 may be attributed as Agilizing Limited, 2026年1–2月, owner-confirmed, 10 日到 3 小時.
- Portrait is the existing microphone photo, cropped later so no slide text remains.
- Motion, if any, lasts 150–600ms, has a job, and has a `prefers-reduced-motion` static fallback with the same words.
- At 375px the booking control is visible without scrolling. That is a later mockup gate; each direction below has to be able to meet it.

## A — 聽診

Idea: 一條每日流程（查詢 → 報價 → 跟進 → 收錢）隨捲動標出漏位。

Mood: 暖紙、深色字、一個脈搏色。似聽診，唔似醫院儀表板，亦唔似軟件 demo。

Type: 漢字襯線做診斷句，正文用易讀黑體，行高至少 1.6。

Motion: 捲到某個步驟，該步嘅漏位先脈搏一次，標出「邊個放假就停」。靜態後備係同一條線，漏位用實色標，唔靠動畫先睇到。

Path to the booking: 訪客認到自己嗰格漏位之後，嗰格下面就係「預約 30 分鐘聽診」。頁首仍然有同一個預約，唔使等動畫完。

Risk: 脈搏如果變成分頁 loader 或假產品畫面，手機第一屏會失預約。橫向流程喺 375px 會擠。必須直排，而且 CTA 唔好等脈搏完先出現。

## B — 直講

Idea: 頁面幾乎係 Larry 講嘅兩句，加上一張裁好嘅講者相。

Mood: 靜、近、像對住一個人講。少裝飾。

Type: 兩句強句用超大漢字。正文短。C1 只用一行：10 日縮到 3 小時。C3 只用「14 年大企業經驗」。

Motion: 幾乎冇。焦點框同按鈕狀態就夠。捲動唔搬位。

Path to the booking: 預約鈕同第一句同一屏。WhatsApp 係文字連結，唔係第二粒同等按鈕。

Risk: 創意分會低。如果字級同相片裁切做唔好，會似一篇未排嘅文章，而唔係一個服務頁。內容清楚，但獎項工藝要靠字距、裁切同留白，唔靠效果。

## C — 工作臺

Idea: 老闆一日嘅四張卡（查詢、報價、跟進、收錢）攤喺檯上。停住嘅卡就係漏。

Mood: 實體紙卡、一種暖色、少陰影。手寫感只限標籤，正文保持正楷可讀。

Type: 卡標題短。內文仍然係正文比例，唔好縮到要放大先睇到。

Motion: 捲動時停住嘅卡輕微前移 200–400ms，標出「呢張無人接」。減少動態時四張卡同時可見，停住嘅一張用實色邊。

Path to the booking: 第一屏已經有預約。停住嘅卡再重複一次同一句 CTA，唔好開新目的地。

Risk: 卡面如果畫成 WhatsApp 或 CRM 截圖，會變成假介面。不可放未獲授權嘅客戶標誌。四張卡喺 375px 會推走 CTA，所以第一屏只可露一句加預約，卡由第一下捲動先開始。

## Not chosen

No direction is ranked. Stage 3 does not start until you reply with A, B, or C (or a mix you name).
