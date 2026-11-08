import fs from 'node:fs/promises';
import path from 'node:path';
import { Presentation, PresentationFile } from '@oai/artifact-tool';
import { finalizePresentation } from '/Users/larrylo/.codex/plugins/cache/openai-primary-runtime/presentations/26.1009.11318/skills/presentations/container_tools/artifact_tool_utils.mjs';

const root='/Users/larrylo/SourceCode/innovatexp_website';
const build=path.join(root,'.ppt-business-build');
const skill='/Users/larrylo/.codex/plugins/cache/openai-primary-runtime/presentations/26.1009.11318/skills/presentations';
const deck=Presentation.create({slideSize:{width:1280,height:720}});
const C={ink:'#172B45',blue:'#1058AA',muted:'#5B6878',paper:'#F6F8FC',light:'#D3E3F7',white:'#FFFFFF'};
const font='Arial Unicode MS';
function text(slide,copy,x,y,w,h,size=28,color=C.ink,bold=false){
 const s=slide.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 s.text=copy;s.text.style={typeface:font,fontSize:size,color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return s;
}
async function img(slide,file,x,y,w,h,fit='contain'){
 const b=await fs.readFile(path.join(root,'public',file));
 slide.images.add({blob:b,contentType:file.endsWith('.jpg')?'image/jpeg':'image/png',alt:file,fit,position:{left:x,top:y,width:w,height:h}});
}
function page(title,summary,n){
 const s=deck.slides.add();s.background.fill=C.paper;
 text(s,title,64,49,1110,76,45,C.ink,true);
 text(s,summary,64,140,1130,74,30,C.blue,true);
 text(s,'InnovateXP',64,672,350,22,17,C.muted);
 text(s,String(n).padStart(2,'0'),1162,672,55,22,17,C.muted);
 return s;
}
function star(s,rows,x=64,y=248,w=790){
 rows.forEach((r,i)=>{text(s,['S  情境','T  目標','A  做法','R  效果'][i],x,y+i*88,140,30,25,C.blue,true);text(s,r,x+150,y+i*88,w-150,72,27,C.ink);});
}
function notes(s,copy,source){s.speakerNotes.text=copy+'\n\n資料來源：\n'+source;}

let s=deck.slides.add();s.background.fill=C.ink;
await img(s,'innovatexp_logo_white.png',64,60,305,100);
text(s,'AI 商業顧問\n與業務系統落地',64,253,1110,183,64,C.white,true);
text(s,'聽診先，再將合適的 AI 用在業務流程',68,473,1080,58,31,C.light);
text(s,'Larry Lo   InnovateXP Limited',68,624,1080,35,25,C.white);
notes(s,'我係 Larry Lo，InnovateXP 創辦人。我哋幫中小企先睇清楚業務樽頸，再用合適工具落地。今日介紹三項服務，同三個客戶項目。', 'public/llms.zh-hk.txt；Logo: public/innovatexp_logo_white.png');

s=page('Self Introduction', '我係 Larry Lo，幫中小企將業務問題變成可落地的改善',2);
text(s,'Larry Lo',64,257,660,66,48,C.ink,true);
text(s,'InnovateXP Limited 創辦人\nAI 商業顧問',64,337,700,99,32,C.ink);
text(s,'14 年 IT 交付經驗\nHKSTP Incubation Alumni',64,465,700,89,29,C.muted);
text(s,'先了解流程，再決定工具，陪團隊落地',64,595,720,47,27,C.blue,true);
await img(s,'hero-larry.jpg',901,250,301,363,'cover');
notes(s,'我有 14 年 IT 交付經驗，亦係香港科技園培育計劃校友。InnovateXP 主要幫 3–30 人中小企，先鎖定一條值得改善嘅流程，再考慮 AI、自動化或者系統。','src/lib/author.ts；public/llms.zh-hk.txt；Portrait: public/hero-larry.jpg');

s=page('服務 01   AI 顧問與流程自動化','先改善一條最花時間的流程，再用 AI 加快交付',3);
star(s,['重複整理資料或製作內容，交付靠人手。','鎖定一條流程，訂立工時及品質指標。','業務聽診後設計 AI 工作流，試行並檢討。','目標：縮短交付時間，建立可重用流程。'],64,248,1128);
notes(s,'服務情境以 STAR 說明。先問最花時間係邊一步，再揀合適 AI 工具。R 係服務目標，唔係對每間公司作成果承諾。Agilizing 案例會展示一個已確認嘅製作時間改善。','public/llms.zh-hk.txt；src/content/service-pages.ts');

s=page('產品 02   FitnessXP 課堂及會籍管理','將課堂、出席與續堂資料集中，方便日常營運跟進',4);
star(s,['課堂安排與會員資料分散在 WhatsApp、Excel。','讓團隊清楚掌握每班及每位學員狀況。','整合時間表、教練安排、出席及續堂流程。','目標：減少人手追問，量度出席及續堂情況。'],64,248,1128);
notes(s,'FitnessXP 適合 Fitness Center、Yoga、Pilates 同培訓機構。重點係先聽清楚排堂、出席、續堂邊度出現問題，再配置系統。效果按實際使用情況量度。','src/content/fitnessxp.ts；public/llms-fitnessxp.txt');

s=page('服務 03   網站及網店設計','讓顧客更容易了解商品，找到購買及聯絡入口',5);
star(s,['商品及購買資訊需要清楚呈現。','讓顧客容易找到所需資料並採取下一步。','整理內容及網站結構，設計商品與聯絡入口。','目標：縮短資訊搜尋步驟，支援線上及實體購買。'],64,248,1128);
notes(s,'網站服務以顧客需要做嘅下一步作出發點，例如睇商品、搵位置、查詢或者購買。Flower Nice Day 案例係網店改版，同展示現有鮮花販賣機位置地圖。','README.md；docs/claims.md C5；public/decks/ixp-customised-website-pitch-deck.pdf (service offering only)');

s=page('案例 01   Agilizing Limited','教材製作由 10 日縮短至 3 小時',6);
star(s,['培訓教材包括投影片及 AI 數字人短片。','縮短同一教材製作流程的交付時間。','整理教材製作流程，配合 AI 輔助製作。','2026 年 1–2 月，製作時間由 10 日縮至 3 小時。'],64,258,880);
await img(s,'agilizing-logo-transparent.png',1000,270,205,133);
text(s,'10 日',976,449,230,66,51,C.muted,true);
text(s,'3 小時',976,529,240,77,58,C.blue,true);
text(s,'此項目成果由客戶業主確認',64,637,940,25,19,C.muted);
notes(s,'呢個項目改善嘅係教材製作流程，包括投影片同 AI 數字人短片。客戶業主確認，由 10 日縮到 3 小時。呢個數字屬於該項目，唔推算其他客戶嘅回報。','docs/claims.md C1；src/messages/landing.zh-hk.json cases.items[0]；public/llms.zh-hk.txt；Logo: public/agilizing-logo-transparent.png');

s=page('案例 02   ZOmate Limited','課堂、會籍與 WhatsApp 提醒的系統應用',7);
star(s,['ZOMATE FITNESS 提供健身及會籍服務。','將課堂預約、會籍與服務通知連接。','系統涵蓋預約／會籍功能及 WhatsApp 提醒。','支援預約及服務提醒；實際成效待客戶確認。'],64,258,900);
await img(s,'partners/zomate-fitness-logo.png',1010,283,188,188);
text(s,'項目交付範圍及成效待確認',64,637,960,27,19,C.muted);
notes(s,'zomate_system 公開服務文件列出健身、會籍、預約及 WhatsApp 提醒功能。具體由 InnovateXP 交付的範圍，以及節省工時、出席或續堂改善，需由客戶確認後才作成果陳述。','src/content/legal-zomate.ts；src/content/legal-privacy.ts；Client name supplied by user；Logo: public/partners/zomate-fitness-logo.png');

s=page('案例 03   Flower Nice Day 販賣美好','網店展示商品，地圖協助顧客找到鮮花販賣機',8);
star(s,['顧客需要查看鮮花商品及販賣機位置。','在網店清楚提供商品與實體購買位置資訊。','改版網店，呈現現有的鮮花販賣機地圖。','顧客可查看商品，並查找鮮花販賣機位置。'],64,258,900);
await img(s,'partners/flowerniceday-logo.png',1000,286,205,164);
text(s,'已確認交付內容，未有銷售或轉換率數據',64,637,980,27,19,C.muted);
notes(s,'Flower Nice Day 嘅重點係令客人睇到商品，並知道邊度有鮮花販賣機。InnovateXP 為網店改版及呈現現有公共位置地圖。成果以已交付功能描述，未有銷售或者轉換率改善數據。','docs/claims.md C5, confirmed by Larry Lo 2026-10-09；https://www.flowerniceday.com/pages/flower-kiosk；Logo: public/partners/flowerniceday-logo.png');

s=deck.slides.add();s.background.fill=C.ink;
text(s,'Contact Us',64,91,1100,101,74,C.white,true);
text(s,'由你最想改善的一條流程開始',64,247,1140,69,43,C.light,true);
text(s,'預約 30 分鐘業務聽診',64,364,1100,52,34,C.white);
const link=text(s,'www.innovatexp.co/zh-hk/bookme',64,439,1140,52,32,C.white);
link.text.get('www.innovatexp.co/zh-hk/bookme').link={uri:'https://www.innovatexp.co/zh-hk/bookme',isExternal:true};
const email=text(s,'info@innovatexp.co',64,515,1100,46,30,C.white);
email.text.get('info@innovatexp.co').link={uri:'mailto:info@innovatexp.co',isExternal:true};
text(s,'Larry Lo   InnovateXP Limited',64,625,1140,34,24,C.light);
notes(s,'如果你有一條流程最想改善，歡迎聯絡我哋。帶住一個實際問題，例如教材做得慢、課堂跟進散，或者顧客搵唔到商品資訊，我哋先做 30 分鐘業務聽診。','public/llms.zh-hk.txt；src/lib/author.ts');

await fs.writeFile(path.join(build,'deck-montage.webp'),new Uint8Array(await (await deck.export({format:'webp',montage:true})).arrayBuffer()));
for (const [i,slide] of deck.slides.items.entries()){
 await fs.writeFile(path.join(build,`slide-${i+1}.png`),new Uint8Array(await (await deck.export({slide,format:'png',scale:1})).arrayBuffer()));
}
const candidate=path.join(build,'candidate.pptx');
await (await PresentationFile.exportPptx(deck)).save(candidate);
const final=path.join(root,'output/business-introduction/InnovateXP-Business-Introduction.pptx');
const result=await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,pythonExecutable:'/Users/larrylo/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],explicitTotalSlideCount:9,fontPolicy:{basis:'design',families:[font]},verifyArtifactToolImport:true,receiptPath:path.join(build,'validation.json')});
console.log(JSON.stringify(result));
