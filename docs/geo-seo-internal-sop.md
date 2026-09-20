# GEO／SEO 可見度 — 內部 SOP（Larry 用）

> 給自己跟單、交付、以及把自己網站做完。不要公開。  
> 最後更新：2026-09-20

---

## 賣給客人 — 漏斗（診斷 → retainer）

唔一開口就賣月費。先 AI Visibility 診斷（HKD 2,800，簽 6 個月 retainer 可全額抵扣首月），再用三個數字證明值唔值得續。

| 層級 | 價 | 最低約期 |
| --- | --- | --- |
| AI Visibility 診斷 | HKD 2,800 | 一次性；可抵扣首月 |
| Lite | HKD 1,800／月 | 6 個月 |
| Growth | HKD 3,800／月 | 6 個月 |
| Project 全站 AEO | HKD 12,000 起 | 一次性（新站） |

每月報告必寫（續約靠呢三樣，唔寫改動次數）：

1. AI 答案引用次數（ChatGPT／AI Overview／Perplexity 抽樣 + GSC Generative AI／Bing Citation Share 如有）
2. 品牌關鍵字曝光（GSC 品牌查詢 impressions）
3. 網站詢盤數（表單／WhatsApp／預約，對齊 GA4 或人手記）

點解貴過 300 蚊：AEO 係持續戰；一次改 3 個位無法驗證成效。6 個月先有曲線。

---

## 你而家（innovatexp.co）— 下一手

Bing 已登入 `innovatexp.co/`，畫面寫「資料處理中，最多 48 小時；請先交 sitemap」。依序做：

1. 左側按 **Sitemaps** → 提交 `https://www.innovatexp.co/sitemap.xml`
2. **URL Submission** 一次過交（不要連撳同一條）：
   - `https://www.innovatexp.co/zh-hk`
   - `https://www.innovatexp.co/zh-hk/bookme`
   - `https://www.innovatexp.co/zh-hk/ai-consulting`
   - `https://www.innovatexp.co/zh-hk/ai-seo-update-package`
   - `https://www.innovatexp.co/llms.txt`
3. **IndexNow** 之後有空再開；唔係今日 blocker。
4. 48 小時後入 **AI Performance（Beta）** 睇 Citation Share 有沒有數字。

Google 側：

5. VisionXP 已拆 Product／$0 Offer 並已上過線。每次 schema／套餐頁改完，用 Rich Results Test 測 `https://www.innovatexp.co/zh-hk` — 期望不再出現 Merchant listings invalid。
6. 套餐頁上線後 Search Console → URL 檢查 → `/zh-hk/ai-seo-update-package` Request indexing **一次**。
7. 3–7 日後再查 `/zh-hk/bookme` 是否已由「Discovered – currently not indexed」變成 indexed。未變就等，不要連撳。

每週 15 分鐘（自己站）：

- GSC Performance（28 日）→ 品牌關鍵字曝光
- GSC Generative AI（GEO 印象）
- Bing AI Performance（有數據才記）
- 詢盤數（bookme／WhatsApp）

---

## 交付流程

### A. 聽診／診斷銷售（未簽 retainer 前）

賣 HKD 2,800 診斷，唔硬推月費。問：網域、有沒有 GSC／Bing 權限、最想被 AI 答的 3 句、有沒有購物車（有就另議 Merchant）。不急就直說。

### B. 診斷交付（客人會收到）

- 你被 AI 引用嘅現況報告
- 問題清單 + 3 個立即可執行 quick wins
- 12 個月 AEO 路線圖
- 建議 Lite 定 Growth（或只做 Project）

簽 6 個月 retainer：2,800 全額抵扣首月。

### C. 接 retainer 第 1 日：權限

客人加你做：

- Google Search Console：完整權限或受限用戶
- Bing Webmaster：完整權限
- 網站改文／schema 的方法（Git、WordPress、或你代改）

沒有 GSC 就先驗證網域，不要先改文案。

### D. 每月處理（Lite 1–2 項／Growth 4–6 項）

項目例子（每項寫入月報，唔用「3 次／10 次」計）：

1. 拆錯嘅 Product／Merchant schema  
2. 核心頁 title／meta／H1 對齊一句定位  
3. 交 sitemap + 申請索引  
4. 更新 llms.txt 可引用事實  
5. FAQ／answer-first 段落  
6. 競爭對手 AI 答案抽樣對照（Growth）

不要把「改一個 typo」同「重寫成個站」混在同一個月份。超出就停、另報價或升 Growth。

### E. 提交搜尋引擎

- Google：sitemap 重交 + 核心 URL Request indexing（每日額度有限，只交錢頁）
- Bing：Sitemaps + URL Submission
- 不要用已死的 bing.com/ping（410）

### F. 月報 PDF 必寫

- 三個指標：AI 引用、品牌曝光、詢盤（對上月）
- 本月處理項目清單
- 已索引／未索引頁
- Rich Results 截圖（通過或仍有的非關鍵問題）
- 下月建議
- 明確不保證排名／不保證 AI Overview

### G. Growth 月報會議

約 30 分鐘對月報。Lite 只交 PDF，除非客人另購會議。

---

## 自己站未完成清單（2026-09-20）

- [ ] Bing 提交 sitemap + URL
- [ ] 上線後 Rich Results 重測 `/zh-hk`
- [ ] GSC request `/zh-hk/ai-seo-update-package`；3–7 日後查 bookme
- [ ] 對外文案以套餐頁 + `docs/geo-seo-service-package.md` 為準

---

## 不要做

- 為加快而 `npm audit fix --force` 或跳過 build 就 deploy
- 對未索引頁一日 request 十次
- 對外承諾「一定上 AI Overview」
- 把 VisionXP demo 再標回 Product／價錢 0（Google 會當購物）
- 用「改動次數」賣 AEO
