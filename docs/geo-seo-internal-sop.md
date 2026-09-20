# GEO／SEO 可見度 — 內部 SOP（Larry 用）

> 給自己跟單、交付、以及把自己網站做完。不要公開。  
> 最後更新：2026-09-20

---

## 你而家（innovatexp.co）— 下一手

Bing 已登入 `innovatexp.co/`，畫面寫「資料處理中，最多 48 小時；請先交 sitemap」。依序做：

1. 左側按 **Sitemaps** → 提交  
   `https://www.innovatexp.co/sitemap.xml`
2. **URL Submission** 一次過交（不要連撳同一條）：
   - `https://www.innovatexp.co/zh-hk`
   - `https://www.innovatexp.co/zh-hk/bookme`（Google 仍未收錄）
   - `https://www.innovatexp.co/zh-hk/ai-consulting`
   - `https://www.innovatexp.co/llms.txt`
3. **IndexNow** 之後有空再開；唔係今日 blocker。
4. 48 小時後入 **AI Performance（Beta）** 睇 Citation Share 有沒有數字。

Google 側（已做過，只需跟進）：

5. Schema 改動仍在本機：VisionXP 已拆 Product／$0 Offer。要上線先 **commit + deploy**，然後用 Rich Results Test 測  
   `https://www.innovatexp.co/zh-hk`  
   期望：不再出現 Merchant listings invalid。
6. 上線後 Search Console → URL 檢查 → `/zh-hk` 再 Request indexing **一次**。
7. 3–7 日後再查 `/zh-hk/bookme` 是否已由「Discovered – currently not indexed」變成 indexed。未變就等，不要連撳。

每週 15 分鐘（自己站）：

- GSC Performance（28 日）
- GSC Generative AI（GEO 印象；而家約 120／3 個月，主力 `/zh-hk`）
- Bing AI Performance（有數據才記）

---

## 賣給客人時 — 交付流程

### A. 聽診（30 分鐘，未收費範圍）

問清楚：網域、有沒有 GSC／Bing 權限、最想被搜／被 AI 答的 3 句說話、有沒有購物車（有就另議 Merchant）。  
不急就直說，不要硬推套餐。

### B. 接單後第 1 日：權限

客人加你做：

- Google Search Console：完整權限或受限用戶
- Bing Webmaster：完整權限
- 網站改文／schema 的方法（Git、WordPress、或你代改）

沒有 GSC 就先驗證網域，不要先改文案。

### C. 第 1–2 日：診斷清單（照抄打勾）

- [ ] `robots.txt`、`sitemap.xml` 200
- [ ] GSC sitemap 最後讀取日期（超過 30 日要重交）
- [ ] 索引數 vs sitemap URL 數（差很遠 = 收錄問題）
- [ ] 核心頁 URL 檢查：首頁、預約／聯絡、主服務頁
- [ ] Rich Results Test 首頁：有沒有 Product／Merchant 誤標
- [ ] 有沒有 `llms.txt`（沒有就 Growth 才寫；Starter 可只修 schema + 標題）
- [ ] 品牌搜「公司名 + 創辦人」Google 第 1 頁有沒有官網

記下「發現但未索引」的頁（例如預約頁）— 這是交付報告要寫的，不是隱瞞。

### D. 改動（Starter 最多 3 次／Growth 10 次）

每次改動計 1 次，例如：

1. 拆錯嘅 Product／Merchant schema  
2. 首頁 title／meta／H1 對齊一句定位  
3. 交 sitemap + 申請索引  

不要把「改一個 typo」同「重寫成個站」混在同一套餐。超出就停、另報價。

### E. 提交搜尋引擎

- Google：sitemap 重交 + 核心 URL Request indexing（每日額度有限，只交錢頁）
- Bing：Sitemaps + URL Submission
- 不要用已死的 bing.com/ping（410）

### F. 交付郵件／PDF 必寫

- 已索引／未索引頁
- 今次改了哪 3／10 項
- Rich Results 截圖（通過或仍有的非關鍵問題）
- 客人自己每週睇邊兩個報告
- 明確不保證排名

### G. Follow-up

- Starter：交付後 7 日內 1 次（只查收錄，不再大改）
- Growth：第 2 週、第 4 週各 1 次

---

## 自己站未完成清單（2026-09-20）

- [ ] Bing 提交 sitemap + 4 條 URL
- [ ] Schema 改動 commit + deploy
- [ ] 上線後 Rich Results 重測 `/zh-hk`
- [ ] GSC 再 request `/zh-hk`；3–7 日後查 bookme
- [ ] 網頁套餐文案如需更新，用 `docs/geo-seo-service-package.md`

---

## 不要做

- 為加快而 `npm audit fix --force` 或跳過 build 就 deploy
- 對未索引頁一日 request 十次
- 對外承諾「一定上 AI Overview」
- 把 VisionXP demo 再標回 Product／價錢 0（Google 會當購物）
