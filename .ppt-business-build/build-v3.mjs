import fs from 'node:fs/promises';
import path from 'node:path';
import { Presentation, PresentationFile } from '@oai/artifact-tool';
import { finalizePresentation } from '/Users/larrylo/.codex/plugins/cache/openai-primary-runtime/presentations/26.1009.11318/skills/presentations/container_tools/artifact_tool_utils.mjs';

const root='/Users/larrylo/SourceCode/innovatexp_website';
const build=path.join(root,'.ppt-business-build','v3');
await fs.mkdir(build,{recursive:true});
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
async function asset(slide,file,x,y,w,h,fit='contain'){
 const b=await fs.readFile(path.join(build,'assets',file));
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
 rows.forEach((r,i)=>{text(s,['業務背景','改善目標','我們的做法','帶來的效果'][i],x,y+i*88,140,36,25,C.blue,true);text(s,r,x+150,y+i*88,w-150,72,27,C.ink);});
}
function notes(s,copy,source){s.speakerNotes.text=copy+'\n\n資料來源：\n'+source;}
function story(s,rows,x=64,y=235,w=490){
 rows.forEach((r,i)=>{text(s,['業務背景','改善目標','我們的做法','帶來的效果'][i],x,y+i*96,w,29,23,C.blue,true);text(s,r,x,y+33+i*96,w,58,25,C.ink);});
}

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
text(s,'人手重複製作及整理內容，拖慢交付。先鎖定一條流程，訂立工時與品質目標。',64,233,1130,68,27,C.ink);
await asset(s,'ai-workflow.png',64,313,1150,230,'cover');
text(s,'業務聽診',64,551,350,41,29,C.blue,true).text.alignment='center';
text(s,'AI 工作流試行',434,551,400,41,29,C.blue,true).text.alignment='center';
text(s,'團隊採用及檢討',880,551,334,41,29,C.blue,true).text.alignment='center';
text(s,'預期效果：縮短交付時間，建立可重用的工作流程',64,610,1140,41,29,C.ink,true);
notes(s,'先問最花時間係邊一步，再揀合適 AI 工具。效果係服務目標，唔係對每間公司作成果承諾。流程圖係概念示意。','public/llms.zh-hk.txt；src/content/service-pages.ts；Conceptual workflow illustration generated for this presentation');

s=page('產品 02   FitnessXP 課堂及會籍管理','將課堂、出席與續堂資料集中，方便日常營運跟進',4);
story(s,['課堂與會員資料分散在 WhatsApp、Excel。','讓團隊掌握每班及每位學員狀況。','整合時間表、教練、出席及續堂流程。','目標：減少人手追問，清楚掌握營運。'],64,237,670);
await asset(s,'fitness-demo.png',885,218,195,425);
text(s,'FitnessXP 實際系統示範畫面',785,646,430,25,19,C.muted);
notes(s,'FitnessXP 適合 Fitness Center、Yoga、Pilates 同培訓機構。重點係先聽清楚排堂、出席、續堂邊度出現問題，再配置系統。畫面取自既有產品示範影片，顯示角色權限與操作範圍。效果按實際使用情況量度。','src/content/fitnessxp.ts；public/llms-fitnessxp.txt；https://www.innovatexp.co/zh-hk/fitnessxp；Demo frame: public/videos/fitnessxp_01.mp4 at 00:05');

s=page('服務 03   網站及網店設計','讓顧客更容易了解商品，找到購買及聯絡入口',5);
story(s,['顧客需要清楚的商品及購買資訊。','讓顧客容易找到資料並採取下一步。','整理網站結構，設計商品及聯絡入口。','目標：縮短搜尋步驟，支援購買。'],64,237,480);
await asset(s,'flower-products-final.jpg',604,251,610,343);
text(s,'網店設計參考：Flower Nice Day 商品列表',604,609,610,28,20,C.muted);
notes(s,'網站服務以顧客需要做嘅下一步作出發點，例如睇商品、搵位置、查詢或者購買。畫面係 Flower Nice Day 真實商品列表。','README.md；docs/claims.md C5；Screenshot https://www.flowerniceday.com/products captured 2026-10-11');

s=page('案例 01   Agilizing Limited','教材製作由 10 日縮短至 3 小時',6);
await img(s,'agilizing-logo-transparent.png',990,60,224,58);
await asset(s,'agilizing.jpg',64,239,670,377);
text(s,'客戶公開網站參考',64,627,670,26,19,C.muted);
text(s,'培訓教材包括投影片及 AI 數字人短片。\n目標是加快教材交付。\n整理製作流程，配合 AI 輔助。',785,242,430,139,26,C.ink);
text(s,'原有製作時間',785,402,430,30,23,C.muted);
text(s,'10 日',785,438,430,61,57,C.muted,true);
text(s,'改善後',785,510,430,29,23,C.blue);
text(s,'3 小時',785,548,430,73,65,C.blue,true);
text(s,'2026 年 1–2 月，客戶業主確認',785,629,440,27,19,C.muted);
notes(s,'呢個項目改善嘅係教材製作流程，包括投影片同 AI 數字人短片。客戶業主確認，由 10 日縮到 3 小時。呢個數字屬於該項目，唔推算其他客戶嘅回報。截圖係客戶公開網站參考，唔係教材交付物。','docs/claims.md C1；src/messages/landing.zh-hk.json cases.items[0]；public/llms.zh-hk.txt；Logo: public/agilizing-logo-transparent.png；Screenshot https://agilizing.com/zh/ captured 2026-10-11');

s=page('案例 02   ZOmate Limited','課堂、會籍與 WhatsApp 提醒的系統應用',7);
await img(s,'partners/zomate-fitness-logo.png',1104,47,99,92);
story(s,['ZOMATE FITNESS 提供健身及會籍服務。','連接課堂預約、會籍及服務通知。','系統涵蓋預約／會籍及 WhatsApp 提醒。','支援服務提醒；實際成效待客戶確認。'],64,237,485);
await asset(s,'zomate.jpg',604,258,610,343);
text(s,'客戶公開網站參考',604,615,610,28,20,C.muted);
notes(s,'zomate_system 公開服務文件列出健身、會籍、預約及 WhatsApp 提醒功能。具體交付範圍，以及節省工時、出席或續堂改善，仍需確認。網站截圖用來介紹客戶業務，唔代表網站係 InnovateXP 交付。','src/content/legal-zomate.ts；src/content/legal-privacy.ts；Client name supplied by user；Logo: public/partners/zomate-fitness-logo.png；Screenshot https://zoesportdiary.com/ captured 2026-10-11');

s=page('案例 03   Flower Nice Day 販賣美好','網店展示商品，地圖協助顧客找到鮮花販賣機',8);
await img(s,'partners/flowerniceday-logo.png',984,50,228,84);
story(s,['顧客需要查看商品及鮮花販賣機位置。','提供清楚的商品與實體購買資訊。','改版網店，呈現現有販賣機地圖。','顧客可以睇商品，再查找購買位置。'],64,237,510);
await asset(s,'flower-shop.jpg',611,258,356,200);
text(s,'網店首頁',611,472,356,29,21,C.muted);
await asset(s,'flower-map-final.jpg',989,220,224,361);
text(s,'販賣機位置地圖',989,593,225,28,20,C.muted);
text(s,'交付功能已確認，未有銷售／轉換率數據',611,635,610,26,19,C.muted);
notes(s,'Flower Nice Day 嘅重點係令客人睇到商品，並知道邊度有鮮花販賣機。InnovateXP 為網店改版及呈現現有公共位置地圖。成果以已交付功能描述，未有銷售或者轉換率改善數據。','docs/claims.md C5, confirmed by Larry Lo 2026-10-09；Logo: public/partners/flowerniceday-logo.png；Screenshots https://www.flowerniceday.com/ and https://www.flowerniceday.com/pages/flower-kiosk captured 2026-10-11');

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
const final=path.join(root,'output/business-introduction/InnovateXP-Business-Introduction-Visual-v2.pptx');
const result=await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,pythonExecutable:'/Users/larrylo/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],explicitTotalSlideCount:9,fontPolicy:{basis:'design',families:[font]},verifyArtifactToolImport:true,receiptPath:path.join(build,'validation-visual-v2.json')});
console.log(JSON.stringify(result));
